const mongoose = require("mongoose");
require("dotenv").config();

// Models
const Historywingo30sec = require("../Modals/Historywingo30sec.js");
const Historywingo1min = require("../Modals/Historywingo1min.js");
const Historywingo3min = require("../Modals/Historywingo3min.js");

// Connect to MongoDB
const mongooseCon = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Clear game data
const clearGameData = async () => {
  try {
    console.log("🗑️  Starting data deletion...\n");

    // Delete 30sec data
    const result30sec = await Historywingo30sec.deleteMany({});
    console.log(`✅ Deleted ${result30sec.deletedCount} documents from Historywingo30sec`);

    // Delete 1min data
    const result1min = await Historywingo1min.deleteMany({});
    console.log(`✅ Deleted ${result1min.deletedCount} documents from Historywingo1min`);

    // Delete 3min data
    const result3min = await Historywingo3min.deleteMany({});
    console.log(`✅ Deleted ${result3min.deletedCount} documents from Historywingo3min`);

    console.log("\n📊 Summary:");
    console.log(`   Total deleted: ${result30sec.deletedCount + result1min.deletedCount + result3min.deletedCount} documents`);
    console.log("\n✨ Data deletion completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error deleting data:", error);
    process.exit(1);
  }
};

// Run the script
(async () => {
  await mongooseCon();
  await clearGameData();
})();
