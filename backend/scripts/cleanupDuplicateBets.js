/**
 * Script to clean up duplicate bet entries from Userbethistory collection
 * Usage: node backend/scripts/cleanupDuplicateBets.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Userbethistory = require("../Modals/Userbethistory.js");

// Database connection string
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

const cleanupDuplicates = async () => {
  try {
    console.log("🔍 Starting duplicate cleanup...");

    // Find all groups of bets with same (userId, priodno, gameType, select)
    const duplicateGroups = await Userbethistory.aggregate([
      {
        $group: {
          _id: {
            userId: "$userId",
            priodno: "$priodno",
            gameType: "$gameType",
            select: "$select",
          },
          count: { $sum: 1 },
          ids: { $push: "$_id" },
          createdAts: { $push: "$createdAt" },
        },
      },
      {
        $match: { count: { $gt: 1 } }, // Only groups with more than 1
      },
      {
        $sort: { count: -1 },
      },
    ]);

    console.log(`📊 Found ${duplicateGroups.length} duplicate groups`);

    let totalRemoved = 0;

    for (const group of duplicateGroups) {
      console.log(
        `\n⚠️  Duplicate group: User=${group._id.userId}, Period=${group._id.priodno}, Game=${group._id.gameType}, Select=${group._id.select}`
      );
      console.log(`   Count: ${group.count}, IDs: ${group.ids.map((id) => id.toString()).join(", ")}`);

      // Keep the oldest one (first created), remove the rest
      const sortedIds = group.ids
        .map((id, idx) => ({ id, createdAt: group.createdAts[idx] }))
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      const keepId = sortedIds[0].id;
      const removeIds = sortedIds.slice(1).map((x) => x.id);

      console.log(`   Keeping: ${keepId.toString()}`);
      console.log(`   Removing: ${removeIds.map((id) => id.toString()).join(", ")}`);

      // Delete duplicates, keep the original
      const result = await Userbethistory.deleteMany({ _id: { $in: removeIds } });
      console.log(`   ✅ Deleted ${result.deletedCount} duplicate entries`);

      totalRemoved += result.deletedCount;
    }

    console.log(`\n✅ Cleanup complete! Removed ${totalRemoved} duplicate entries`);
  } catch (error) {
    console.error("❌ Cleanup error:", error.message);
  }
};

const main = async () => {
  await mongooseConnection();
  await cleanupDuplicates();
  await mongoose.connection.close();
  console.log("✅ Done");
};

main();
