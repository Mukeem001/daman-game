/**
 * Script to rebuild all indexes on Userbethistory collection
 * Usage: node backend/scripts/rebuildIndexes.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Userbethistory = require("../Modals/Userbethistory.js");

const MONGO_URI = "mongodb+srv://mohdmukeem01:Max01maxico@cluster0.alsuz.mongodb.net/dhancash?retryWrites=true&w=majority";

const mongooseConnection = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
    });
    console.log("✅ MongoDB connected");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const rebuildIndexes = async () => {
  try {
    console.log("🔨 Dropping existing indexes...");
    await Userbethistory.collection.dropIndexes();
    console.log("✅ Indexes dropped");

    console.log("🔨 Building new indexes...");
    await Userbethistory.syncIndexes();
    console.log("✅ New indexes created");

    // Get all indexes
    const indexes = await Userbethistory.collection.getIndexes();
    console.log("\n📊 Current indexes:");
    if (indexes) {
      Object.entries(indexes).forEach(([name, spec]) => {
        console.log(`  ${name}: ${JSON.stringify(spec)}`);
      });
    }

    console.log("\n✅ Index rebuild complete!");
  } catch (error) {
    console.error("❌ Index rebuild error:", error.message);
  }
};

const main = async () => {
  await mongooseConnection();
  await rebuildIndexes();
  await mongoose.connection.close();
  console.log("✅ Done");
};

main();
