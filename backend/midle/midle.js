const jwt = require('jsonwebtoken');
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET || "mukeemis$muk";

const fetchmidle = (req,res,next)=>{
    
    console.log("🔵 Middleware - All headers:", req.headers);
let token = req.header('auto-token') || req.header('Authorization')?.replace('Bearer ', '');
    console.log("🔵 Token received:", token ? token.substring(0, 20) + "..." : "NO TOKEN");
    
    try {
        const  data = jwt.verify(token, jwt_secret);
        
        req.user = data.user;
        console.log("✅ Token verified, User ID:", req.user.id);
        next()
    } catch (error) {
        console.error("❌ JWT verification failed:", error.message);
        res.status(400).json({error: "please authinticate valid user"})
        
    }

    
   
}

module.exports = fetchmidle;
