require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET || "mukeemis$muk";

const adminAuth = (req, res, next) => {
  const token = req.header("admin-token");
  
  if (!token) {
    return res.status(401).json({ error: "Admin access required. Provide admin-token header." });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, jwt_secret);
    
    // Check if it's an admin token
    if (!decoded.admin) {
      return res.status(403).json({ error: "Invalid admin token - not an admin session" });
    }
    
    // Attach admin info to request
    req.admin = decoded.admin;
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Admin token expired. Please login again." });
    }
    return res.status(403).json({ error: "Invalid admin token. Please login again." });
  }
};

module.exports = adminAuth;
