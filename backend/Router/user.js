const express = require("express");
const Router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../Modals/User.js");
const fetchmidle = require("../midle/midle.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET || "mukeemis$muk";

// Middleware to verify token (JWT Bearer)
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.userId = decoded.user.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Helper: generate unique 10-digit numeric invitation code
const generateInvitationCode = async () => {
  let code, exists;
  do {
    code = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
    exists = await User.findOne({ invitationCode: code });
  } while (exists);
  return code;
};

// =========================================================
// USER AUTH ROUTES - Mounted at /api/user
// =========================================================

// POST /api/user/newuser - Register new user
Router.post("/newuser", async (req, res) => {
  try {
    const { usernumber, password, userbalance, name, referralCode } = req.body;
    if (!usernumber || !password) {
      return res.status(400).json({ success: false, error: "Phone number and password are required" });
    }
    let user = await User.findOne({ usernumber });
    if (user) {
      return res.status(400).json({ success: false, error: "This phone number is already registered." });
    }

    // Validate referral code if provided
    let referredBy = null;
    if (referralCode) {
      const referrer = await User.findOne({ invitationCode: referralCode });
      if (referrer) {
        referredBy = referralCode;
      }
    }

    const salt = await bcrypt.genSaltSync(10);
    const secpass = await bcrypt.hashSync(password, salt);
    const invitationCode = await generateInvitationCode();

    user = await User.create({
      name: name || usernumber,
      usernumber,
      password: secpass,
      userbalance: userbalance || 0,
      invitationCode,
      referredBy,
    });

    const autotoken = jwt.sign({ user: { id: user.id } }, jwt_secret);
    res.json({ success: true, autotoken, user: { id: user.id, name: user.name, usernumber: user.usernumber, invitationCode: user.invitationCode } });
  } catch (err) {
    console.error("Registration error:", err.message);
    return res.status(500).json({ success: false, error: "Registration failed. Please try again." });
  }
});

// POST /api/user/userlogin - Login user
Router.post("/userlogin", async (req, res) => {
  const { usernumber, password } = req.body;
  try {
    if (!usernumber || !password) {
      return res.status(400).json({ success: false, error: "Phone number and password are required" });
    }
    let user = await User.findOne({ usernumber });
    if (!user) {
      return res.status(400).json({ success: false, error: "User not found. Please sign up first." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ success: false, error: "Invalid credentials. Please check your password." });
    }
    const autotoken = jwt.sign({ user: { id: user.id } }, jwt_secret);
    res.json({ success: true, autotoken, user: { id: user.id, name: user.name, usernumber: user.usernumber } });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ success: false, error: "Login failed. Please try again." });
  }
});

// GET /api/user/Getuser - Get own profile (auth required)
Router.get("/Getuser", fetchmidle, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    // ✅ Auto-generate invitation code if user doesn't have one (existing users fix)
    if (!user.invitationCode) {
      const invitationCode = await generateInvitationCode();
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: { invitationCode } },
        { new: true }
      ).select("-password");
    }
    res.json(user);
  } catch (err) {
    return res.status(500).json({ error: "Please login with valid credentials!" });
  }
});

// PUT /api/user/userupdate - Update own balance (auth required)
Router.put("/userupdate", fetchmidle, async (req, res) => {
  try {
    const { userbalance } = req.body;
    await User.findByIdAndUpdate(req.user.id, { $set: { userbalance } });
    const updatedUser = await User.findById(req.user.id).select("-password");
    res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/user/balance - Get user balance (JWT token auth)
Router.get("/balance", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ 
      success: true, 
      balance: user.userbalance || 0,
      userId: user._id
    });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ error: error.message || "Error fetching balance" });
  }
});

module.exports = Router;
