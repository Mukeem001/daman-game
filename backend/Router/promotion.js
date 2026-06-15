const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const User = require("../Modals/User.js");
const fetchmidle = require("../midle/midle.js");
const Userbethistory = require("../Modals/Userbethistory.js");
const CommissionHistory = require("../Modals/CommissionHistory.js");

// =========================================================
// PROMOTION ROUTES - Mounted at /api/promotion
// =========================================================

// Helper: safely convert id to both string and ObjectId for matching
const toObjId = (id) => {
  try { return new mongoose.Types.ObjectId(id.toString()); } catch { return null; }
};

// Helper: get tier1-5 subordinates for a user (chain via invitationCode → referredBy)
const getSubordinateTiers = async (invitationCode) => {
  if (!invitationCode) return { tier1: [], tier2: [], tier3: [], tier4: [], tier5: [] };

  const tier1 = await User.find({ referredBy: invitationCode })
    .select("_id name usernumber invitationCode userbalance createdAt referredBy");
  const tier1Codes = tier1.map(u => u.invitationCode).filter(Boolean);

  const tier2 = tier1Codes.length
    ? await User.find({ referredBy: { $in: tier1Codes } })
        .select("_id name usernumber invitationCode userbalance createdAt referredBy")
    : [];
  const tier2Codes = tier2.map(u => u.invitationCode).filter(Boolean);

  const tier3 = tier2Codes.length
    ? await User.find({ referredBy: { $in: tier2Codes } })
        .select("_id name usernumber invitationCode userbalance createdAt referredBy")
    : [];
  const tier3Codes = tier3.map(u => u.invitationCode).filter(Boolean);

  const tier4 = tier3Codes.length
    ? await User.find({ referredBy: { $in: tier3Codes } })
        .select("_id name usernumber invitationCode userbalance createdAt referredBy")
    : [];
  const tier4Codes = tier4.map(u => u.invitationCode).filter(Boolean);

  const tier5 = tier4Codes.length
    ? await User.find({ referredBy: { $in: tier4Codes } })
        .select("_id name usernumber invitationCode userbalance createdAt referredBy")
    : [];

  return { tier1, tier2, tier3, tier4, tier5 };
};

// Helper: calculate bet volume for a list of user ids (handles both string & ObjectId stored userId)
const getBetVolume = async (userIds, fromTs = null, toTs = null) => {
  if (!userIds || userIds.length === 0) return 0;
  // userId in Userbethistory is stored as string (from req.user.id via JWT)
  const idStrings = userIds.map(id => id.toString());
  const matchStage = { userId: { $in: idStrings } };
  if (fromTs) matchStage.ordertime = { $gte: fromTs, ...(toTs ? { $lt: toTs } : {}) };
  const result = await Userbethistory.aggregate([
    { $match: matchStage },
    { $group: { _id: null, total: { $sum: "$pamount" } } }
  ]);
  return result[0]?.total || 0;
};

// ─────────────────────────────────────────────────────────────
// GET /api/promotion/mypromo - Full promotion stats
// ─────────────────────────────────────────────────────────────
Router.get("/mypromo", fetchmidle, async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");

    // Auto-generate invitation code for old users who don't have one
    if (!user.invitationCode) {
      let code, exists;
      do {
        code = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
        exists = await User.findOne({ invitationCode: code });
      } while (exists);
      user = await User.findByIdAndUpdate(req.user.id, { $set: { invitationCode: code } }, { new: true }).select("-password");
    }

    const { tier1, tier2, tier3, tier4, tier5 } = await getSubordinateTiers(user.invitationCode);
    const allUsers = [...tier1, ...tier2, ...tier3, ...tier4, ...tier5];
    const allIds = allUsers.map(u => u._id.toString());

    // Time ranges
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayTs = Math.floor(todayStart.getTime() / 1000);

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    // ── Volume calculations ──
    // Team today volume (all tier 1-5 subordinates)
    const todayTeamVolume = await getBetVolume(allIds, todayTs);

    // Team lifetime volume
    const lifetimeTeamVolume = await getBetVolume(allIds);

    // Own user's today volume
    const ownTodayVolume = await getBetVolume([req.user.id], todayTs);

    // Own user's lifetime volume
    const ownLifetimeVolume = await getBetVolume([req.user.id]);

    // Per tier today volume
    const tier1Volume = await getBetVolume(tier1.map(u => u._id.toString()), todayTs);
    const tier2Volume = await getBetVolume(tier2.map(u => u._id.toString()), todayTs);

    // ── Commission ──
    const weekCommission = await CommissionHistory.aggregate([
      { $match: { userId: user._id, date: { $gte: weekStart } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    // ── New subordinates today (tier1 who registered today) ──
    const newTodaySubordinates = tier1.filter(u => {
      if (!u.createdAt) return false;
      return new Date(u.createdAt) >= todayStart;
    });

    // ── Deposit stats ──
    const directMadeDeposit = tier1.filter(u => u.userbalance > 0).length;

    res.json({
      success: true,
      invitationCode: user.invitationCode,
      totalCommission: user.totalCommission || 0,
      pendingCommission: user.pendingCommission || 0,
      weekCommission: weekCommission[0]?.total || 0,
      // Tier counts
      tiers: {
        tier1: tier1.length,
        tier2: tier2.length,
        tier3: tier3.length,
        tier4: tier4.length,
        tier5: tier5.length,
      },
      totalSubordinates: allIds.length,
      // Volume
      todayVolume: todayTeamVolume,
      lifetimeVolume: lifetimeTeamVolume,
      ownTodayVolume,
      ownLifetimeVolume,
      tier1TodayVolume: tier1Volume,
      tier2TodayVolume: tier2Volume,
      // Direct stats
      directRegister: tier1.length,
      directDeposit: directMadeDeposit,
      // New today
      newTodaySubordinates: newTodaySubordinates.length,
      newTodayList: newTodaySubordinates.map(u => ({ name: u.name, usernumber: u.usernumber, joinedAt: u.createdAt })),
    });
  } catch (err) {
    console.error("Promotion stats error:", err.message);
    res.status(500).json({ success: false, error: "Failed to load promotion data" });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/promotion/subordinates - Tier-wise subordinate list with volume
// ─────────────────────────────────────────────────────────────
Router.get("/subordinates", fetchmidle, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("invitationCode");
    if (!user.invitationCode) {
      return res.json({ success: true, tier1: [], tier2: [], tier3: [], tier4: [], tier5: [] });
    }
    const { tier1, tier2, tier3, tier4, tier5 } = await getSubordinateTiers(user.invitationCode);

    // Add today volume to each tier user
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const todayTs = Math.floor(todayStart.getTime() / 1000);

    const addVolume = async (users) => {
      return Promise.all(users.map(async u => {
        const vol = await getBetVolume([u._id.toString()], todayTs);
        const lifeVol = await getBetVolume([u._id.toString()]);
        return { ...u.toObject(), todayVolume: vol, lifetimeVolume: lifeVol };
      }));
    };

    const [t1, t2, t3, t4, t5] = await Promise.all([
      addVolume(tier1),
      addVolume(tier2),
      addVolume(tier3),
      addVolume(tier4),
      addVolume(tier5),
    ]);

    res.json({ success: true, tier1: t1, tier2: t2, tier3: t3, tier4: t4, tier5: t5 });
  } catch (err) {
    console.error("Subordinates error:", err.message);
    res.status(500).json({ success: false, error: "Failed to load subordinates" });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/promotion/commission-history - My commission history
// ─────────────────────────────────────────────────────────────
Router.get("/commission-history", fetchmidle, async (req, res) => {
  try {
    const history = await CommissionHistory.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(50)
      .populate("fromUserId", "name usernumber");
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to load commission history" });
  }
});

module.exports = Router;

