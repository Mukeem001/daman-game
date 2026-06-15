const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET || "mukeemis$muk";

// Hardcoded admin credentials (for now)
const ADMIN_CREDENTIALS = {
  email: "admin@mukeem.com",
  password: "mukeem@00" // In production, this should be hashed
};

// Hash the admin password during startup
let hashedAdminPassword = null;

const initializeAdminPassword = () => {
  try {
    const salt = bcrypt.genSaltSync(10);
    hashedAdminPassword = bcrypt.hashSync(ADMIN_CREDENTIALS.password, salt);
    console.log("✅ Admin password initialized");
  } catch (error) {
    console.error("❌ Error hashing admin password:", error);
  }
};

// Initialize on startup
initializeAdminPassword();

// ============================================================
// AUTH ROUTES
// ============================================================

// POST /api/auth/login - Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: "Email and password are required" 
      });
    }

    // Check email
    if (email !== ADMIN_CREDENTIALS.email) {
      return res.status(401).json({ 
        success: false, 
        error: "Invalid email or password" 
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, hashedAdminPassword);
    if (!passwordMatch) {
      return res.status(401).json({ 
        success: false, 
        error: "Invalid email or password" 
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        admin: { 
          id: "admin_mukeem",
          email: ADMIN_CREDENTIALS.email,
          role: "admin"
        } 
      }, 
      jwt_secret,
      { expiresIn: "7d" }
    );

    console.log("✅ Admin login successful:", email);

    res.json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: "admin_mukeem",
        email: ADMIN_CREDENTIALS.email,
        role: "admin"
      }
    });

  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Login failed. Please try again." 
    });
  }
});

// POST /api/auth/verify-token - Verify admin token
router.post("/verify-token", (req, res) => {
  try {
    const token = req.headers["admin-token"] || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: "No token provided" 
      });
    }

    const decoded = jwt.verify(token, jwt_secret);
    
    if (!decoded.admin) {
      return res.status(401).json({ 
        success: false, 
        error: "Invalid token - not an admin token" 
      });
    }

    res.json({
      success: true,
      admin: decoded.admin
    });

  } catch (error) {
    console.error("❌ Token verification error:", error);
    res.status(401).json({ 
      success: false, 
      error: "Invalid or expired token" 
    });
  }
});

// GET /api/auth/me - Get current admin info (standard endpoint)
router.get("/me", (req, res) => {
  try {
    const token = req.headers["admin-token"] || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: "No token provided" 
      });
    }

    const decoded = jwt.verify(token, jwt_secret);
    
    if (!decoded.admin) {
      return res.status(401).json({ 
        success: false, 
        error: "Not authorized" 
      });
    }

    res.json({
      success: true,
      admin: {
        id: decoded.admin.id,
        email: decoded.admin.email,
        role: decoded.admin.role
      }
    });

  } catch (error) {
    res.status(401).json({ 
      success: false, 
      error: "Unauthorized" 
    });
  }
});

// GET /api/auth/admin-info - Get current admin info
router.get("/admin-info", (req, res) => {
  try {
    const token = req.headers["admin-token"] || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: "No token provided" 
      });
    }

    const decoded = jwt.verify(token, jwt_secret);
    
    if (!decoded.admin) {
      return res.status(401).json({ 
        success: false, 
        error: "Not authorized" 
      });
    }

    res.json({
      success: true,
      admin: {
        id: decoded.admin.id,
        email: decoded.admin.email,
        role: decoded.admin.role
      }
    });

  } catch (error) {
    res.status(401).json({ 
      success: false, 
      error: "Unauthorized" 
    });
  }
});

module.exports = router;
