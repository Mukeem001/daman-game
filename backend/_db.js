const mongoose = require('mongoose');
require('dotenv').config();

// Use Atlas cluster directly (local MongoDB not available)
const mongooseURI = "mongodb+srv://mohdmukeem01:Max01maxico@cluster0.alsuz.mongodb.net/dhancash?retryWrites=true&w=majority";

const mongooseCon = async () => {
    try {
        await mongoose.connect(mongooseURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
            maxPoolSize: 10
        });
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("⚠️ MongoDB connection failed:", err.message);
        console.log("Server running without database - using demo data");
    }
}

module.exports = mongooseCon;
