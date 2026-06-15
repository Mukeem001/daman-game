const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../Modals/User.js");
const Userbethistory = require("../Modals/Userbethistory.js");
const Historywingo1min = require("../Modals/Historywingo1min.js");
const Betcontrol = require("../Modals/Betcontrol.js");
const Order = require("../Modals/Order.js");
const Withdrawal = require("../Modals/Withdrawal.js");
const Beneficiary = require("../Modals/Beneficiary.js");
const Wingo30secbetcontrol = require("../Modals/Wingo30secbetcontrol.js");
const Wingo3minbetcontrol = require("../Modals/Wingo3minbetcontrol.js");
const Wingo5minbetcontrol = require("../Modals/Wingo5minbetcontrol.js");
const Historywingo30sec = require("../Modals/Historywingo30sec.js");
const Historywingo3min = require("../Modals/Historywingo3min.js");
const Historywingo5min = require("../Modals/Historywingo5min.js");

const jwt_secret = process.env.JWT_SECRET || "mukeemis$muk";

// Admin auth middleware - Verify JWT token
const adminAuth = (req, res, next) => {
  const adminTokenHeader = req.headers["admin-token"];
  const authHeader = req.headers["authorization"];
  const token = adminTokenHeader || authHeader?.split(" ")[1];
  
  console.log("🔍 [adminAuth] Path:", req.path);
  console.log("🔍 [adminAuth] admin-token header:", adminTokenHeader ? "present" : "missing");
  console.log("🔍 [adminAuth] authorization header:", authHeader ? "present" : "missing");
  console.log("🔍 [adminAuth] resolved token:", token ? token.substring(0, 20) + "..." : "NONE");
  
  if (!token) {
    console.log("❌ Admin auth FAILED - no token provided");
    return res.status(403).json({ error: "Unauthorized admin", debug: "No admin-token or Authorization header found" });
  }

  try {
    const decoded = jwt.verify(token, jwt_secret);
    console.log("🔍 [adminAuth] decoded:", JSON.stringify(decoded));
    if (!decoded.admin) {
      console.log("❌ Admin auth FAILED - not an admin token");
      return res.status(403).json({ error: "Unauthorized - not an admin token" });
    }
    console.log("✅ Admin auth PASSED for:", decoded.admin.email);
    next();
  } catch (error) {
    console.log("❌ Admin auth FAILED - invalid or expired token:", error.message);
    return res.status(403).json({ error: "Invalid or expired token", details: error.message });
  }
};

// ============================================================
// ADMIN ROUTES - Requires admin-token header
// All routes mounted at: /api/admin
// ============================================================

// ============ USER MANAGEMENT ============

// GET /api/admin/users - Get all users
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, count: users.length, users });
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// PUT /api/admin/users/:id - Update user (edit)
router.put("/users/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    await User.findByIdAndUpdate(id, { $set: updates });
    const updatedUser = await User.findById(id).select("-password");
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// PUT /api/admin/users/:id/block - Block/unblock user
router.put("/users/:id/block", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { isBlocked } = req.body;
    await User.findByIdAndUpdate(id, { $set: { isBlocked: !!isBlocked } });
    const updatedUser = await User.findById(id).select("-password isBlocked");
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Error blocking user" });
  }
});

// DELETE /api/admin/users/:id - Delete user
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔴 DELETE USER ATTEMPT - FULL URL:", req.url);
    console.log("🔴 DELETE USER ID:", id, "Length:", id?.length || 0, "Type:", typeof id);
    
    if (!id) {
      console.log("❌ NO ID PROVIDED");
      return res.status(400).json({ error: "No user ID provided" });
    }
    
    // Try delete even if length not 24 (phone number case)
    console.log("🔍 FIND USER BY ID:", id);
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      console.log("⚠️ USER NOT FOUND BY _id - ID:", id);
      return res.status(404).json({ success: false, error: "User not found by ID" });
    }
    console.log("✅ USER DELETED SUCCESSFULLY BY ID - User:", deletedUser.usernumber);
    res.json({ success: true, message: "User deleted", id });
  } catch (err) {
    console.error("💥 DELETE USER ERROR for ID", req.params.id, ":", err.message, err.stack);
    res.status(500).json({ error: "Error deleting user", details: err.message });
  }
});

// PUT /api/admin/users/:id/balance - Update user balance (backward compat)
router.put("/users/:id/balance", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { userbalance } = req.body;
    await User.findByIdAndUpdate(id, { $set: { userbalance } });
    const updatedUser = await User.findById(id).select("-password");
    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Error updating user balance" });
  }
});

// ============ BET HISTORY - ADMIN VIEW ============

// GET /api/admin/bets - Get all bets with stats
router.get("/bets", adminAuth, async (req, res) => {
  try {
    const allBets = await Userbethistory.find({}).sort({ ordertime: -1 });

    let totalWins = 0, totalLosses = 0, totalAmount = 0, totalWinAmount = 0, totalLossAmount = 0;
    allBets.forEach(bet => {
      totalAmount += bet.pamount || 0;
      if (bet.winloss > 0) { totalWinAmount += bet.winloss; totalWins++; }
      else if (bet.winloss < 0) { totalLossAmount += Math.abs(bet.winloss); totalLosses++; }
    });

    res.json({
      success: true,
      stats: {
        totalBets: allBets.length,
        pendingBets: allBets.filter(b => b.status === "pending").length,
        completedBets: allBets.filter(b => b.status === "win" || b.status === "loss").length,
        totalBetAmount: totalAmount,
        totalWinAmount,
        totalLossAmount,
        totalWins,
        totalLosses,
        winRate: allBets.length > 0 ? ((totalWins / allBets.length) * 100).toFixed(2) : 0,
      },
      bets: allBets,
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching all bets" });
  }
});

// DELETE /api/admin/bets - Delete all bets
router.delete("/bets", adminAuth, async (req, res) => {
  try {
    const result = await Userbethistory.deleteMany({});
    console.log("✅ All bets deleted:", result.deletedCount);
    res.json({ success: true, message: "All bets deleted", deletedCount: result.deletedCount });
  } catch (err) {
    console.error("💥 Delete all bets error:", err.message);
    res.status(500).json({ error: "Error deleting bets", details: err.message });
  }
});

// DELETE /api/admin/bets/:id - Delete single bet
router.delete("/bets/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Userbethistory.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Bet not found" });
    }
    console.log("✅ Bet deleted:", deleted._id);
    res.json({ success: true, message: "Bet deleted", id });
  } catch (err) {
    console.error("💥 Delete bet error:", err.message);
    res.status(500).json({ error: "Error deleting bet", details: err.message });
  }
});

// GET /api/admin/bets/period/:periodno - Get all bets for a specific period
router.get("/bets/period/:periodno", adminAuth, async (req, res) => {
  try {
    const { periodno } = req.params;
    const bets = await Userbethistory.find({ priodno: periodno }).sort({ ordertime: -1 });
    res.json({ success: true, count: bets.length, bets });
  } catch (err) {
    res.status(500).json({ error: "Error fetching bets for period" });
  }
});

// POST /api/admin/bets/selected - Get bets for a period (by body)
router.post("/bets/selected", adminAuth, async (req, res) => {
  try {
    const { priodno } = req.body;
    const bets = await Userbethistory.find({ priodno });
    res.json({ success: true, count: bets.length, bets });
  } catch (err) {
    res.status(500).json({ error: "Error fetching selected bets" });
  }
});

// ============ GAME HISTORY MANAGEMENT ============

// POST /api/admin/history - Add game history result (replaces public addwingoitems)
router.post("/history", adminAuth, async (req, res) => {
  try {
    const item = new Historywingo1min({
      periodno: req.body.periodno,
      betnumbers: req.body.betnumbers,
      bigsmall: req.body.bigsmall,
      color: req.body.color,
    });
    const data = await item.save();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: "Error adding game history" });
  }
});

// ============ BET CONTROL MANAGEMENT ============

// POST /api/admin/betcontrol - Add bet control entry
router.post("/betcontrol", adminAuth, async (req, res) => {
  try {
    const item = new Betcontrol({
      priodno: req.body.priodno,
      big: req.body.big || 0,
      small: req.body.small || 0,
      red: req.body.red || 0,
      green: req.body.green || 0,
      violet: req.body.violet || 0,
      Num1: req.body.Num1 || 0, Num2: req.body.Num2 || 0, Num3: req.body.Num3 || 0,
      Num4: req.body.Num4 || 0, Num5: req.body.Num5 || 0, Num6: req.body.Num6 || 0,
      Num7: req.body.Num7 || 0, Num8: req.body.Num8 || 0, Num9: req.body.Num9 || 0,
      Num0: req.body.Num0 || 0,
    });
    const data = await item.save();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: "Error adding bet control" });
  }
});

// PUT /api/admin/betcontrol - Update bet control
router.put("/betcontrol", adminAuth, async (req, res) => {
  try {
    const updated = await Betcontrol.findOneAndUpdate(
      { priodno: req.body.priodno },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Betcontrol entry not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ error: "Error updating bet control" });
  }
});

// ============ DIAGNOSTICS ============

// GET /api/admin/dashboard/stats - Dashboard statistics
router.get("/dashboard/stats", adminAuth, async (req, res) => {
  try {
    // Total users
    const totalUsers = await User.countDocuments({});

    // Today stats (today = current date 00:00 to 23:59)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Bids today
    const bidsToday = await Userbethistory.countDocuments({
      ordertime: { $gte: Math.floor(today.getTime() / 1000), $lt: Math.floor(tomorrow.getTime() / 1000) }
    });

    // Total profit (sum of all positive winloss)
    const totalProfitResult = await Userbethistory.aggregate([
      { $group: { _id: null, profit: { $sum: { $cond: [ { $gt: ['$winloss', 0] }, '$winloss', 0 ] } } } }
    ]);
    const totalProfit = totalProfitResult[0]?.profit || 0;

    // Deposits today
    const depositsToday = await Order.countDocuments({
      status: 'approved',
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // Withdrawals today
    const withdrawalsToday = await Withdrawal.countDocuments({
      status: 'approved',
      createdAt: { $gte: today, $lt: tomorrow }
    });

    // Active markets (latest betcontrol records)
    const latestBetControls = await Betcontrol.find({}).sort({ _id: -1 }).limit(4);
    const activeMarkets = latestBetControls.length;

    res.json({
      success: true,
      totalUsers,
      totalBidsToday: bidsToday,
      totalProfit: totalProfit[0]?.profit || 0,
      activeMarkets,
      depositsToday,
      withdrawalsToday: withdrawalsToday,
      recentBids: []
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ error: 'Error fetching dashboard stats' });
  }
});

// GET /api/admin/diagnose/bets - Breakdown of pending bets vs results
router.get("/diagnose/bets", adminAuth, async (req, res) => {
  try {
    const pendingBets = await Userbethistory.find({ status: "pending" });
    const gameResults = await Historywingo1min.find({ betnumbers: { $ne: "" } });

    const breakdown = {};
    pendingBets.forEach(bet => {
      if (!breakdown[bet.priodno]) breakdown[bet.priodno] = { bets: 0, hasResult: false, resultNumber: null };
      breakdown[bet.priodno].bets++;
    });
    gameResults.forEach(gr => {
      if (breakdown[gr.periodno]) { breakdown[gr.periodno].hasResult = true; breakdown[gr.periodno].resultNumber = gr.betnumbers; }
    });

    res.json({ success: true, totalPending: pendingBets.length, breakdown });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ MIGRATIONS ============

// POST /api/admin/migrate/fix-priodno - Convert priodno to string
router.post("/migrate/fix-priodno", adminAuth, async (req, res) => {
  try {
    const allBets = await Userbethistory.find({});
    let migratedCount = 0;
    for (const bet of allBets) {
      const prionnoString = bet.priodno.toString();
      if (bet.priodno !== prionnoString) {
        await Userbethistory.findByIdAndUpdate(bet._id, { priodno: prionnoString });
        migratedCount++;
      }
    }
    res.json({ success: true, total: allBets.length, migrated: migratedCount });
  } catch (err) {
    res.status(500).json({ error: "Migration failed", details: err.message });
  }
});

// POST /api/admin/migrate/fix-status - Convert "Completed" to "win"/"loss"
router.post("/migrate/fix-status", adminAuth, async (req, res) => {
  try {
    const completedBets = await Userbethistory.find({ status: "Completed" });
    let converted = 0;
    for (const bet of completedBets) {
      const newStatus = bet.winloss > 0 ? "win" : "loss";
      await Userbethistory.findByIdAndUpdate(bet._id, { status: newStatus });
      converted++;
    }
    res.json({ success: true, total: completedBets.length, converted });
  } catch (err) {
    res.status(500).json({ error: "Migration failed", details: err.message });
  }
});

// ============ DEPOSIT HISTORY - ADMIN VIEW ============

// GET /api/admin/deposits - Get all deposit orders
router.get("/deposits", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 }).populate("userId", "name usernumber userbalance");
    
    let totalDeposits = 0, pendingDeposits = 0, approvedDeposits = 0, rejectedDeposits = 0;
    let totalAmount = 0;
    
    orders.forEach(order => {
      totalAmount += order.amount || 0;
      if (order.status === "pending") pendingDeposits++;
      else if (order.status === "approved") approvedDeposits++;
      else if (order.status === "rejected") rejectedDeposits++;
    });

    res.json({
      success: true,
      stats: {
        totalDeposits: orders.length,
        pendingDeposits,
        approvedDeposits,
        rejectedDeposits,
        totalAmount
      },
      deposits: orders
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching deposits" });
  }
});

// GET /api/admin/deposits/:status - Get deposits by status
router.get("/deposits/:status", adminAuth, async (req, res) => {
  try {
    const { status } = req.params;
    const orders = await Order.find({ status }).sort({ createdAt: -1 }).populate("userId", "name usernumber userbalance");
    res.json({ success: true, count: orders.length, deposits: orders });
  } catch (err) {
    res.status(500).json({ error: "Error fetching deposits" });
  }
});

// DELETE /api/admin/deposits/:id - Delete single deposit
router.delete("/deposits/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Deposit not found" });
    }
    console.log("✅ Deposit deleted:", deleted.orderNumber);
    res.json({ success: true, message: "Deposit deleted", id });
  } catch (err) {
    console.error("💥 Delete deposit error:", err.message);
    res.status(500).json({ error: "Error deleting deposit", details: err.message });
  }
});

// DELETE /api/admin/deposits - Delete all deposits
router.delete("/deposits", adminAuth, async (req, res) => {
  try {
    const result = await Order.deleteMany({});
    console.log("✅ All deposits deleted:", result.deletedCount);
    res.json({ success: true, message: "All deposits deleted", deletedCount: result.deletedCount });
  } catch (err) {
    console.error("💥 Delete all deposits error:", err.message);
    res.status(500).json({ error: "Error deleting deposits", details: err.message });
  }
});

// ============ WITHDRAWAL HISTORY - ADMIN VIEW ============

// GET /api/admin/withdrawals - Get all withdrawal requests
router.get("/withdrawals", adminAuth, async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({}).sort({ createdAt: -1 });
    
    // Manually populate user and beneficiary details
    const enriched = await Promise.all(
      withdrawals.map(async (w) => {
        const withdrawal = w.toObject();
        
        // Get user details by string ID
        if (withdrawal.userId) {
          const user = await User.findById(withdrawal.userId).select("name usernumber userbalance");
          withdrawal.userId = user || withdrawal.userId;
        }
        
        // Get beneficiary details
        if (withdrawal.beneficiaryId) {
          const beneficiary = await Beneficiary.findById(withdrawal.beneficiaryId);
          withdrawal.beneficiaryId = beneficiary || withdrawal.beneficiaryId;
        }
        
        return withdrawal;
      })
    );
    
    let totalWithdrawals = 0, pendingWithdrawals = 0, approvedWithdrawals = 0, rejectedWithdrawals = 0;
    let totalAmount = 0;
    
    enriched.forEach(w => {
      totalAmount += w.amount || 0;
      if (w.status === "pending") pendingWithdrawals++;
      else if (w.status === "approved") approvedWithdrawals++;
      else if (w.status === "rejected") rejectedWithdrawals++;
    });

    res.json({
      success: true,
      stats: {
        totalWithdrawals: enriched.length,
        pendingWithdrawals,
        approvedWithdrawals,
        rejectedWithdrawals,
        totalAmount
      },
      withdrawals: enriched
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching withdrawals", details: err.message });
  }
});

// GET /api/admin/withdrawals/:status - Get withdrawals by status
router.get("/withdrawals/:status", adminAuth, async (req, res) => {
  try {
    const { status } = req.params;
    const withdrawals = await Withdrawal.find({ status }).sort({ createdAt: -1 });
    
    // Manually populate user and beneficiary details
    const enriched = await Promise.all(
      withdrawals.map(async (w) => {
        const withdrawal = w.toObject();
        
        // Get user details by string ID
        if (withdrawal.userId) {
          const user = await User.findById(withdrawal.userId).select("name usernumber userbalance");
          withdrawal.userId = user || withdrawal.userId;
        }
        
        // Get beneficiary details
        if (withdrawal.beneficiaryId) {
          const beneficiary = await Beneficiary.findById(withdrawal.beneficiaryId);
          withdrawal.beneficiaryId = beneficiary || withdrawal.beneficiaryId;
        }
        
        return withdrawal;
      })
    );
    
    res.json({ success: true, count: enriched.length, withdrawals: enriched });
  } catch (err) {
    res.status(500).json({ error: "Error fetching withdrawals", details: err.message });
  }
});

// DELETE /api/admin/withdrawals/:id - Delete single withdrawal
router.delete("/withdrawals/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Withdrawal.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Withdrawal not found" });
    }
    console.log("✅ Withdrawal deleted:", deleted._id);
    res.json({ success: true, message: "Withdrawal deleted", id });
  } catch (err) {
    console.error("💥 Delete withdrawal error:", err.message);
    res.status(500).json({ error: "Error deleting withdrawal", details: err.message });
  }
});

// DELETE /api/admin/withdrawals - Delete all withdrawals
router.delete("/withdrawals", adminAuth, async (req, res) => {
  try {
    const result = await Withdrawal.deleteMany({});
    console.log("✅ All withdrawals deleted:", result.deletedCount);
    res.json({ success: true, message: "All withdrawals deleted", deletedCount: result.deletedCount });
  } catch (err) {
    console.error("💥 Delete all withdrawals error:", err.message);
    res.status(500).json({ error: "Error deleting withdrawals", details: err.message });
  }
});

// POST /api/admin/withdrawals/approve - Approve withdrawal
router.post("/withdrawals/approve", adminAuth, async (req, res) => {
  try {
    const { withdrawalId, transactionId, notes } = req.body;
    
    const withdrawal = await Withdrawal.findByIdAndUpdate(
      withdrawalId,
      { 
        status: "approved",
        transactionId,
        notes,
        approvedAt: new Date()
      },
      { new: true }
    );

    if (!withdrawal) {
      return res.status(404).json({ error: "Withdrawal not found" });
    }

    // Populate user and beneficiary details
    const enriched = withdrawal.toObject();
    if (enriched.userId) {
      const user = await User.findById(enriched.userId).select("name usernumber userbalance");
      enriched.userId = user || enriched.userId;
    }
    if (enriched.beneficiaryId) {
      const beneficiary = await Beneficiary.findById(enriched.beneficiaryId);
      enriched.beneficiaryId = beneficiary || enriched.beneficiaryId;
    }

    res.json({
      success: true,
      message: "Withdrawal approved",
      withdrawal: enriched
    });
  } catch (err) {
    res.status(500).json({ error: "Error approving withdrawal", details: err.message });
  }
});

// POST /api/admin/withdrawals/reject - Reject withdrawal
router.post("/withdrawals/reject", adminAuth, async (req, res) => {
  try {
    const { withdrawalId, reason } = req.body;
    
    // Find withdrawal
    const withdrawal = await Withdrawal.findById(withdrawalId);
    if (!withdrawal) {
      return res.status(404).json({ error: "Withdrawal not found" });
    }

    // Refund amount to user
    const user = await User.findById(withdrawal.userId);
    if (user) {
      user.userbalance += withdrawal.amount;
      await user.save();
    }

    // Mark as rejected
    withdrawal.status = "rejected";
    withdrawal.reason = reason;
    withdrawal.rejectedAt = new Date();
    await withdrawal.save();

    // Populate user and beneficiary details
    const enriched = withdrawal.toObject();
    if (enriched.userId) {
      const userDetails = await User.findById(enriched.userId).select("name usernumber userbalance");
      enriched.userId = userDetails || enriched.userId;
    }
    if (enriched.beneficiaryId) {
      const beneficiary = await Beneficiary.findById(enriched.beneficiaryId);
      enriched.beneficiaryId = beneficiary || enriched.beneficiaryId;
    }

    res.json({
      success: true,
      message: "Withdrawal rejected and refunded",
      withdrawal: enriched,
      userBalance: user.userbalance
    });
  } catch (err) {
    res.status(500).json({ error: "Error rejecting withdrawal", details: err.message });
  }
});

// ============ BET CONTROL DATA - ADMIN VIEW ============

// GET /api/admin/betcontrol/latest - Get latest bet amounts for all game types
router.get("/betcontrol/latest", adminAuth, async (req, res) => {
  try {
    // Get latest for 30sec
    const latest30sec = await Wingo30secbetcontrol.findOne({}).sort({ _id: -1 });
    
    // Get latest for 1min (using Betcontrol model)
    const latest1min = await Betcontrol.findOne({}).sort({ _id: -1 });
    
    // Get latest for 3min
    const latest3min = await Wingo3minbetcontrol.findOne({}).sort({ _id: -1 });
    
    // Get latest for 5min
    const latest5min = await Wingo5minbetcontrol.findOne({}).sort({ _id: -1 });

    // Format response
    const formatBetData = (data, gameType) => {
      if (!data) return null;
      
      return {
        gameType,
        periodno: data.priodno,
        bigSmall: {
          big: data.big || 0,
          small: data.small || 0,
          total: (data.big || 0) + (data.small || 0)
        },
        colors: {
          red: data.red || 0,
          green: data.green || 0,
          violet: data.violet || 0,
          total: (data.red || 0) + (data.green || 0) + (data.violet || 0)
        },
        numbers: {
          "0": data.Num0 || 0,
          "1": data.Num1 || 0,
          "2": data.Num2 || 0,
          "3": data.Num3 || 0,
          "4": data.Num4 || 0,
          "5": data.Num5 || 0,
          "6": data.Num6 || 0,
          "7": data.Num7 || 0,
          "8": data.Num8 || 0,
          "9": data.Num9 || 0,
          total: (data.Num0 || 0) + (data.Num1 || 0) + (data.Num2 || 0) + (data.Num3 || 0) + (data.Num4 || 0) + 
                 (data.Num5 || 0) + (data.Num6 || 0) + (data.Num7 || 0) + (data.Num8 || 0) + (data.Num9 || 0)
        },
        grandTotal: (data.big || 0) + (data.small || 0) + (data.red || 0) + (data.green || 0) + (data.violet || 0) +
                    (data.Num0 || 0) + (data.Num1 || 0) + (data.Num2 || 0) + (data.Num3 || 0) + (data.Num4 || 0) + 
                    (data.Num5 || 0) + (data.Num6 || 0) + (data.Num7 || 0) + (data.Num8 || 0) + (data.Num9 || 0)
      };
    };

    res.json({
      success: true,
      data: {
        "30sec": formatBetData(latest30sec, "30 Seconds"),
        "1min": formatBetData(latest1min, "1 Minute"),
        "3min": formatBetData(latest3min, "3 Minutes"),
        "5min": formatBetData(latest5min, "5 Minutes")
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching bet control data", details: err.message });
  }
});

// GET /api/admin/betcontrol/30sec/latest - Get latest 30sec bet amounts
router.get("/betcontrol/30sec/latest", adminAuth, async (req, res) => {
  try {
    const data = await Wingo30secbetcontrol.findOne({}).sort({ _id: -1 });
    
    if (!data) {
      return res.json({ success: true, data: null, message: "No data found" });
    }

    res.json({
      success: true,
      gameType: "30 Seconds",
      periodno: data.priodno,
      bigSmall: { big: data.big || 0, small: data.small || 0, total: (data.big || 0) + (data.small || 0) },
      colors: { red: data.red || 0, green: data.green || 0, violet: data.violet || 0, total: (data.red || 0) + (data.green || 0) + (data.violet || 0) },
      numbers: {
        "0": data.Num0 || 0, "1": data.Num1 || 0, "2": data.Num2 || 0, "3": data.Num3 || 0, "4": data.Num4 || 0,
        "5": data.Num5 || 0, "6": data.Num6 || 0, "7": data.Num7 || 0, "8": data.Num8 || 0, "9": data.Num9 || 0,
        total: (data.Num0 || 0) + (data.Num1 || 0) + (data.Num2 || 0) + (data.Num3 || 0) + (data.Num4 || 0) + 
               (data.Num5 || 0) + (data.Num6 || 0) + (data.Num7 || 0) + (data.Num8 || 0) + (data.Num9 || 0)
      },
      grandTotal: (data.big || 0) + (data.small || 0) + (data.red || 0) + (data.green || 0) + (data.violet || 0) +
                  (data.Num0 || 0) + (data.Num1 || 0) + (data.Num2 || 0) + (data.Num3 || 0) + (data.Num4 || 0) + 
                  (data.Num5 || 0) + (data.Num6 || 0) + (data.Num7 || 0) + (data.Num8 || 0) + (data.Num9 || 0)
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 30sec bet control data", details: err.message });
  }
});

// GET /api/admin/betcontrol/1min/latest - Get latest 1min bet amounts
router.get("/betcontrol/1min/latest", async (req, res) => {
  try {
    const data = await Betcontrol.findOne({}).sort({ _id: -1 });
    
    if (!data) {
      return res.json({ success: true, data: null, message: "No data found" });
    }

    res.json({
      success: true,
      gameType: "1 Minute",
      periodno: data.priodno,
      bigSmall: { big: data.big || 0, small: data.small || 0, total: (data.big || 0) + (data.small || 0) },
      colors: { red: data.red || 0, green: data.green || 0, violet: data.violet || 0, total: (data.red || 0) + (data.green || 0) + (data.violet || 0) },
      numbers: {
        "0": data.Num0 || 0, "1": data.Num1 || 0, "2": data.Num2 || 0, "3": data.Num3 || 0, "4": data.Num4 || 0,
        "5": data.Num5 || 0, "6": data.Num6 || 0, "7": data.Num7 || 0, "8": data.Num8 || 0, "9": data.Num9 || 0,
        total: (data.Num0 || 0) + (data.Num1 || 0) + (data.Num2 || 0) + (data.Num3 || 0) + (data.Num4 || 0) + 
               (data.Num5 || 0) + (data.Num6 || 0) + (data.Num7 || 0) + (data.Num8 || 0) + (data.Num9 || 0)
      },
      grandTotal: (data.big || 0) + (data.small || 0) + (data.red || 0) + (data.green || 0) + (data.violet || 0) +
                  (data.Num0 || 0) + (data.Num1 || 0) + (data.Num2 || 0) + (data.Num3 || 0) + (data.Num4 || 0) + 
                  (data.Num5 || 0) + (data.Num6 || 0) + (data.Num7 || 0) + (data.Num8 || 0) + (data.Num9 || 0)
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 1min bet control data", details: err.message });
  }
});

// GET /api/admin/betcontrol/3min/latest - Get latest 3min bet amounts
router.get("/betcontrol/3min/latest", adminAuth, async (req, res) => {
  try {
    const data = await Wingo3minbetcontrol.findOne({}).sort({ _id: -1 });
    
    if (!data) {
      return res.json({ success: true, data: null, message: "No data found" });
    }

    res.json({
      success: true,
      gameType: "3 Minutes",
      periodno: data.priodno,
      bigSmall: { big: data.big || 0, small: data.small || 0, total: (data.big || 0) + (data.small || 0) },
      colors: { red: data.red || 0, green: data.green || 0, violet: data.violet || 0, total: (data.red || 0) + (data.green || 0) + (data.violet || 0) },
      numbers: {
        "0": data.Num0 || 0, "1": data.Num1 || 0, "2": data.Num2 || 0, "3": data.Num3 || 0, "4": data.Num4 || 0,
        "5": data.Num5 || 0, "6": data.Num6 || 0, "7": data.Num7 || 0, "8": data.Num8 || 0, "9": data.Num9 || 0,
        total: (data.Num0 || 0) + (data.Num1 || 0) + (data.Num2 || 0) + (data.Num3 || 0) + (data.Num4 || 0) + 
               (data.Num5 || 0) + (data.Num6 || 0) + (data.Num7 || 0) + (data.Num8 || 0) + (data.Num9 || 0)
      },
      grandTotal: (data.big || 0) + (data.small || 0) + (data.red || 0) + (data.green || 0) + (data.violet || 0) +
                  (data.Num0 || 0) + (data.Num1 || 0) + (data.Num2 || 0) + (data.Num3 || 0) + (data.Num4 || 0) + 
                  (data.Num5 || 0) + (data.Num6 || 0) + (data.Num7 || 0) + (data.Num8 || 0) + (data.Num9 || 0)
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 3min bet control data", details: err.message });
  }
});

// GET /api/admin/betcontrol/5min/latest - Get latest 5min bet amounts
router.get("/betcontrol/5min/latest", adminAuth, async (req, res) => {
  try {
    const data = await Wingo5minbetcontrol.findOne({}).sort({ _id: -1 });
    
    if (!data) {
      return res.json({ success: true, data: null, message: "No data found" });
    }

    res.json({
      success: true,
      gameType: "5 Minutes",
      periodno: data.priodno,
      bigSmall: { big: data.big || 0, small: data.small || 0, total: (data.big || 0) + (data.small || 0) },
      colors: { red: data.red || 0, green: data.green || 0, violet: data.violet || 0, total: (data.red || 0) + (data.green || 0) + (data.violet || 0) },
      numbers: {
        "0": data.Num0 || 0, "1": data.Num1 || 0, "2": data.Num2 || 0, "3": data.Num3 || 0, "4": data.Num4 || 0,
        "5": data.Num5 || 0, "6": data.Num6 || 0, "7": data.Num7 || 0, "8": data.Num8 || 0, "9": data.Num9 || 0,
        total: (data.Num0 || 0) + (data.Num1 || 0) + (data.Num2 || 0) + (data.Num3 || 0) + (data.Num4 || 0) + 
               (data.Num5 || 0) + (data.Num6 || 0) + (data.Num7 || 0) + (data.Num8 || 0) + (data.Num9 || 0)
      },
      grandTotal: (data.big || 0) + (data.small || 0) + (data.red || 0) + (data.green || 0) + (data.violet || 0) +
                  (data.Num0 || 0) + (data.Num1 || 0) + (data.Num2 || 0) + (data.Num3 || 0) + (data.Num4 || 0) + 
                  (data.Num5 || 0) + (data.Num6 || 0) + (data.Num7 || 0) + (data.Num8 || 0) + (data.Num9 || 0)
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 5min bet control data", details: err.message });
  }
});

// ========== GET ALL BETCONTROL DATA (NOT JUST LATEST) ==========

// GET /api/admin/betcontrol/all - Get all bet control data (all game types with pagination)
router.get("/betcontrol/all", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    const [data30sec, data1min, data3min, data5min, total30sec, total1min, total3min, total5min] = await Promise.all([
      Wingo30secbetcontrol.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Betcontrol.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Wingo3minbetcontrol.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Wingo5minbetcontrol.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Wingo30secbetcontrol.countDocuments(),
      Betcontrol.countDocuments(),
      Wingo3minbetcontrol.countDocuments(),
      Wingo5minbetcontrol.countDocuments()
    ]);

    res.json({
      success: true,
      pagination: { page: parseInt(page), limit: parseInt(limit) },
      totalRecords: { "30sec": total30sec, "1min": total1min, "3min": total3min, "5min": total5min },
      data: {
        "30sec": { total: total30sec, records: data30sec },
        "1min": { total: total1min, records: data1min },
        "3min": { total: total3min, records: data3min },
        "5min": { total: total5min, records: data5min }
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching all bet control data", details: err.message });
  }
});

// GET /api/admin/betcontrol/30sec/all - Get all 30sec records
router.get("/betcontrol/30sec/all", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      Wingo30secbetcontrol.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Wingo30secbetcontrol.countDocuments()
    ]);

    res.json({
      success: true,
      gameType: "30 Seconds",
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
      records
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 30sec betcontrol", details: err.message });
  }
});

// GET /api/admin/betcontrol/1min/all - Get all 1min records
router.get("/betcontrol/1min/all", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      Betcontrol.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Betcontrol.countDocuments()
    ]);

    res.json({
      success: true,
      gameType: "1 Minute",
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
      records
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 1min betcontrol", details: err.message });
  }
});

// GET /api/admin/betcontrol/3min/all - Get all 3min records
router.get("/betcontrol/3min/all", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      Wingo3minbetcontrol.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Wingo3minbetcontrol.countDocuments()
    ]);

    res.json({
      success: true,
      gameType: "3 Minutes",
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
      records
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 3min betcontrol", details: err.message });
  }
});

// GET /api/admin/betcontrol/5min/all - Get all 5min records
router.get("/betcontrol/5min/all", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      Wingo5minbetcontrol.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Wingo5minbetcontrol.countDocuments()
    ]);

    res.json({
      success: true,
      gameType: "5 Minutes",
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
      records
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 5min betcontrol", details: err.message });
  }
});

// ========== GAME RESULT HISTORY ENDPOINTS ==========

// GET /api/admin/history/latest - Get latest game results for all game types
router.get("/history/latest", adminAuth, async (req, res) => {
  try {
    const [latest30sec, latest1min, latest3min, latest5min] = await Promise.all([
      Historywingo30sec.findOne({}).sort({ _id: -1 }),
      Historywingo1min.findOne({}).sort({ _id: -1 }),
      Historywingo3min.findOne({}).sort({ _id: -1 }),
      Historywingo5min.findOne({}).sort({ _id: -1 })
    ]);

    res.json({
      success: true,
      data: {
        "30sec": latest30sec || { message: "No results found" },
        "1min": latest1min || { message: "No results found" },
        "3min": latest3min || { message: "No results found" },
        "5min": latest5min || { message: "No results found" }
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching latest results", details: err.message });
  }
});

// GET /api/admin/history/all - Get all game results (all game types with pagination)
router.get("/history/all", adminAuth, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    const [data30sec, data1min, data3min, data5min, total30sec, total1min, total3min, total5min] = await Promise.all([
      Historywingo30sec.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Historywingo1min.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Historywingo3min.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Historywingo5min.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Historywingo30sec.countDocuments(),
      Historywingo1min.countDocuments(),
      Historywingo3min.countDocuments(),
      Historywingo5min.countDocuments()
    ]);

    res.json({
      success: true,
      pagination: { page: parseInt(page), limit: parseInt(limit) },
      totalRecords: { "30sec": total30sec, "1min": total1min, "3min": total3min, "5min": total5min },
      data: {
        "30sec": { total: total30sec, records: data30sec },
        "1min": { total: total1min, records: data1min },
        "3min": { total: total3min, records: data3min },
        "5min": { total: total5min, records: data5min }
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching game results", details: err.message });
  }
});

// GET /api/admin/history/30sec/all - Get all 30 second game results
router.get("/history/30sec/all", adminAuth, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      Historywingo30sec.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Historywingo30sec.countDocuments()
    ]);

    res.json({
      success: true,
      gameType: "30 Seconds",
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
      records
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 30sec results", details: err.message });
  }
});

// GET /api/admin/history/1min/all - Get all 1 minute game results
router.get("/history/1min/all", adminAuth, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      Historywingo1min.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Historywingo1min.countDocuments()
    ]);

    res.json({
      success: true,
      gameType: "1 Minute",
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
      records
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 1min results", details: err.message });
  }
});

// GET /api/admin/history/3min/all - Get all 3 minute game results
router.get("/history/3min/all", adminAuth, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      Historywingo3min.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Historywingo3min.countDocuments()
    ]);

    res.json({
      success: true,
      gameType: "3 Minutes",
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
      records
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 3min results", details: err.message });
  }
});

// GET /api/admin/history/5min/all - Get all 5 minute game results
router.get("/history/5min/all", adminAuth, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 100;
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      Historywingo5min.find({}).sort({ _id: -1 }).skip(skip).limit(limit),
      Historywingo5min.countDocuments()
    ]);

    res.json({
      success: true,
      gameType: "5 Minutes",
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
      records
    });
  } catch (err) {
    res.status(500).json({ error: "Error fetching 5min results", details: err.message });
  }
});

// ========== GAME RESULT HISTORY UPDATE ENDPOINTS ==========

// PUT /api/admin/history/:gameType/:id - Update game history record
router.put("/history/:gameType/:id", adminAuth, async (req, res) => {
  try {
    const { gameType, id } = req.params;
    const { betnumbers, bigsmall, color } = req.body;

    // Map gameType to correct model
    let Model;
    switch (gameType) {
      case "30sec":
        Model = require("../Modals/Historywingo30sec.js");
        break;
      case "1min":
        Model = require("../Modals/Historywingo1min.js");
        break;
      case "3min":
        Model = require("../Modals/Historywingo3min.js");
        break;
      case "5min":
        Model = require("../Modals/Historywingo5min.js");
        break;
      default:
        return res.status(400).json({ error: "Invalid game type" });
    }

    const updated = await Model.findByIdAndUpdate(
      id,
      { $set: { betnumbers, bigsmall, color } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.json({ success: true, message: `${gameType} result updated`, data: updated });
  } catch (err) {
    console.error("Error updating history:", err);
    res.status(500).json({ error: "Error updating history", details: err.message });
  }
});

// ========== GAME RESULT HISTORY DELETE ENDPOINTS ==========

// DELETE /api/admin/history/30sec/all - Delete all 30sec results
router.delete("/history/30sec/all", adminAuth, async (req, res) => {
  try {
    const result = await Historywingo30sec.deleteMany({});
    res.json({
      success: true,
      message: "All 30sec history deleted",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting 30sec history", details: err.message });
  }
});

// DELETE /api/admin/history/30sec/:id - Delete 30sec result by ID
router.delete("/history/30sec/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await Historywingo30sec.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "30sec record not found" });
    }
    res.json({
      success: true,
      message: "30sec record deleted",
      deletedId: req.params.id
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting 30sec record", details: err.message });
  }
});

// DELETE /api/admin/history/1min/all - Delete all 1min results
router.delete("/history/1min/all", adminAuth, async (req, res) => {
  try {
    const result = await Historywingo1min.deleteMany({});
    res.json({
      success: true,
      message: "All 1min history deleted",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting 1min history", details: err.message });
  }
});

// DELETE /api/admin/history/1min/:id - Delete 1min result by ID
router.delete("/history/1min/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await Historywingo1min.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "1min record not found" });
    }
    res.json({
      success: true,
      message: "1min record deleted",
      deletedId: req.params.id
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting 1min record", details: err.message });
  }
});

// DELETE /api/admin/history/3min/all - Delete all 3min results
router.delete("/history/3min/all", adminAuth, async (req, res) => {
  try {
    const result = await Historywingo3min.deleteMany({});
    res.json({
      success: true,
      message: "All 3min history deleted",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting 3min history", details: err.message });
  }
});

// DELETE /api/admin/history/3min/:id - Delete 3min result by ID
router.delete("/history/3min/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await Historywingo3min.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "3min record not found" });
    }
    res.json({
      success: true,
      message: "3min record deleted",
      deletedId: req.params.id
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting 3min record", details: err.message });
  }
});

// DELETE /api/admin/history/5min/all - Delete all 5min results
router.delete("/history/5min/all", adminAuth, async (req, res) => {
  try {
    const result = await Historywingo5min.deleteMany({});
    res.json({
      success: true,
      message: "All 5min history deleted",
      deletedCount: result.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting 5min history", details: err.message });
  }
});

// DELETE /api/admin/history/5min/:id - Delete 5min result by ID
router.delete("/history/5min/:id", adminAuth, async (req, res) => {
  try {
    const deleted = await Historywingo5min.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "5min record not found" });
    }
    res.json({
      success: true,
      message: "5min record deleted",
      deletedId: req.params.id
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting 5min record", details: err.message });
  }
});

// DELETE /api/admin/history/all - Delete all history (all game types)
router.delete("/history/all", adminAuth, async (req, res) => {
  try {
    const [res30sec, res1min, res3min, res5min] = await Promise.all([
      Historywingo30sec.deleteMany({}),
      Historywingo1min.deleteMany({}),
      Historywingo3min.deleteMany({}),
      Historywingo5min.deleteMany({})
    ]);
    res.json({
      success: true,
      message: "All game history deleted",
      deletedCounts: {
        "30sec": res30sec.deletedCount,
        "1min": res1min.deletedCount,
        "3min": res3min.deletedCount,
        "5min": res5min.deletedCount
      },
      totalDeleted: res30sec.deletedCount + res1min.deletedCount + res3min.deletedCount + res5min.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting all history", details: err.message });
  }
});

module.exports = router;
