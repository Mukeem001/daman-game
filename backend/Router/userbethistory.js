const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fetchmidle = require("../midle/midle.js");
const Userbethistory = require("../Modals/Userbethistory.js");
const Historywingo1min = require("../Modals/Historywingo1min.js");
const Historywingo30sec = require("../Modals/Historywingo30sec.js");
const Historywingo3min = require("../Modals/Historywingo3min.js");
const Historywingo5min = require("../Modals/Historywingo5min.js");
const User = require("../Modals/User.js");
const CommissionHistory = require("../Modals/CommissionHistory.js");
const Betcontrol = require("../Modals/Betcontrol.js");
const Wingo30secbetcontrol = require("../Modals/Wingo30secbetcontrol.js");
const Wingo3minbetcontrol = require("../Modals/Wingo3minbetcontrol.js");
const Wingo5minbetcontrol = require("../Modals/Wingo5minbetcontrol.js");

// Commission rates per tier
const TIER_RATES = { 1: 0.006, 2: 0.004, 3: 0.003, 4: 0.002, 5: 0.001 };

const ALLOWED_GAME_TYPES = ["30sec", "1min", "3min", "5min"];
const HISTORY_MODEL_BY_GAME = {
  "30sec": Historywingo30sec,
  "1min": Historywingo1min,
  "3min": Historywingo3min,
  "5min": Historywingo5min,
};

const getHistoryModelByGameType = (gameType) => {
  return HISTORY_MODEL_BY_GAME[gameType] || Historywingo1min;
};

// Real-time commission: pay up to 5 referral levels immediately when a bet is resolved
const payCommissionForBet = async (bettorUserId, betAmount) => {
  try {
    if (!betAmount || betAmount <= 0) return;
    const bettor = await User.findById(bettorUserId).select("referredBy");
    if (!bettor || !bettor.referredBy) return;

    let currentCode = bettor.referredBy;
    for (let tier = 1; tier <= 5; tier++) {
      if (!currentCode) break;
      const referrer = await User.findOne({ invitationCode: currentCode }).select("_id referredBy");
      if (!referrer) break;

      const commission = parseFloat((betAmount * TIER_RATES[tier]).toFixed(2));
      if (commission > 0) {
        await User.findByIdAndUpdate(referrer._id, {
          $inc: { userbalance: commission, totalCommission: commission }
        });
        await CommissionHistory.create({
          userId: referrer._id,
          fromUserId: bettorUserId,
          amount: commission,
          tier,
          betVolume: betAmount,
          date: new Date(),
          description: `Tier ${tier} real-time commission from ₹${betAmount} bet`,
        });
      }
      currentCode = referrer.referredBy;
    }
  } catch (err) {
    console.error("Real-time commission error:", err.message);
  }
};

// =========================================================
// USER BET HISTORY ROUTES - Mounted at /api/userbethistory
// =========================================================

// Helper: calculate win or loss
const calculateWin = (select, resultnumber, resultcolor, resultbigsmall) => {
  select = select.toString().toLowerCase();
  if (!isNaN(select) && select >= 0 && select <= 9) return parseInt(select) === resultnumber;
  if (select === "big") return resultbigsmall === "Big";
  if (select === "small") return resultbigsmall === "Small";
  if (select === "red") return resultcolor === "Red" || resultcolor === "defaultColor";
  if (select === "green") return resultcolor === "Green" || resultcolor === "greenColor";
  if (select === "violet") return resultcolor === "Violet" || resultcolor === "mixedColor0" || resultcolor === "mixedColor5";
  return false;
};

// Helper: Update betcontrol when a bet is placed
const updateBetcontrol = async (select, betAmount, priodno, gameType) => {
  try {
    if (!select || !betAmount || !priodno) return;

    // Map select value to betcontrol field name
    let fieldMap = {};
    const selectLower = select.toString().toLowerCase();

    if (selectLower === "big") fieldMap = { gameType, field: "big" };
    else if (selectLower === "small") fieldMap = { gameType, field: "small" };
    else if (selectLower === "red") fieldMap = { gameType, field: "red" };
    else if (selectLower === "green") fieldMap = { gameType, field: "green" };
    else if (selectLower === "violet") fieldMap = { gameType, field: "violet" };
    else if (!isNaN(selectLower) && selectLower >= 0 && selectLower <= 9) {
      fieldMap = { gameType, field: `Num${selectLower}` };
    }

    if (!fieldMap.field) return; // Unknown select type

    // Get the correct betcontrol model based on game type
    const getBetcontrolModel = (type) => {
      switch (type) {
        case "30sec": return Wingo30secbetcontrol;
        case "1min": return Betcontrol;
        case "3min": return Wingo3minbetcontrol;
        case "5min": return Wingo5minbetcontrol;
        default: return Betcontrol;
      }
    };

    const BetcontrolModel = getBetcontrolModel(gameType || "1min");

    // Find or create betcontrol entry for this period
    const updateObj = { $inc: {} };
    updateObj.$inc[fieldMap.field] = betAmount;

    const updated = await BetcontrolModel.findOneAndUpdate(
      { priodno: priodno.toString() },
      updateObj,
      { upsert: true, new: true }
    );

    console.log(`✅ Betcontrol updated: ${gameType} period ${priodno} - ${fieldMap.field} += ${betAmount}`);
  } catch (err) {
    console.error("Error updating betcontrol:", err.message);
    // Don't throw error - this should not block bet placement
  }
};

// =========================================================
// UTILITY ROUTES
// =========================================================

// GET /api/userbethistory/getuserbethis - Get own bet history (auth required)
router.get("/getuserbethis", fetchmidle, async (req, res) => {
  try {
    const notes = await Userbethistory.find({ userId: req.user.id }).sort({ ordertime: -1 });
    res.json(notes);
  } catch (error) {
    res.status(400).json({ error: "Error fetching your bet history" });
  }
});

// POST /api/userbethistory/adduserbethis - Place a bet (auth required)
router.post("/adduserbethis", fetchmidle, async (req, res) => {
  try {
    const prionnoString = req.body.priodno.toString().trim();
    const gameType = ALLOWED_GAME_TYPES.includes(req.body.gameType) ? req.body.gameType : "1min";
    const selectValue = req.body.select.toString().toLowerCase().trim();
    const userId = req.user.id.toString();

    console.log(`📌 Bet Request: userId=${userId}, priodno=${prionnoString}, gameType=${gameType}, select=${selectValue}`);

    // ✅ ATOMIC: Try to create bet - MongoDB will enforce unique index
    // If duplicate exists, we'll get E11000 error
    const notes = new Userbethistory({
      userId,
      priodno: prionnoString,
      pamount: req.body.pamount,
      amountaftertax: req.body.amountaftertax,
      resultnumber: req.body.resultnumber,
      resultcolor: req.body.resultcolor,
      resultbigsmall: req.body.resultbigsmall,
      select: selectValue,
      gameType,
      status: req.body.status || "pending",
      winloss: req.body.winloss,
      ordertime: req.body.ordertime,
      tax: req.body.tax,
    });

    let data;
    try {
      data = await notes.save();
      console.log(`✅ New bet created: ${data._id}`);
    } catch (saveError) {
      // If duplicate key error, return existing bet
      if (saveError.code === 11000) {
        console.warn(`⚠️  E11000 Duplicate Key: User=${userId}, Period=${prionnoString}, GameType=${gameType}, Select=${selectValue}`);
        
        const existingBet = await Userbethistory.findOne({
          userId,
          priodno: prionnoString,
          gameType,
          select: selectValue,
        });
        
        if (existingBet) {
          console.log(`📌 Returning existing bet: ${existingBet._id}`);
          return res.status(400).json({
            error: "Duplicate bet",
            details: "You already placed a bet on this selection for this period",
            existingBet: existingBet._id,
            status: existingBet.status,
          });
        }
        throw saveError;
      }
      throw saveError;
    }

    // 🎯 Update betcontrol with this bet amount (fire-and-forget, don't block response)
    updateBetcontrol(selectValue, req.body.amountaftertax || req.body.pamount, prionnoString, gameType).catch((err) =>
      console.error("Betcontrol update error:", err.message)
    );

    // Auto-check if result already exists for this period
    const gameHistoryModel = getHistoryModelByGameType(gameType);
    const gameResult = await gameHistoryModel.findOne({ periodno: prionnoString });
    
    if (gameResult && gameResult.betnumbers) {
      const resultNumber = parseInt(gameResult.betnumbers);
      if (!isNaN(resultNumber)) {
        const isWin = calculateWin(selectValue, resultNumber, gameResult.color, gameResult.bigsmall);
        const winloss = isWin ? req.body.amountaftertax * 2 : -req.body.amountaftertax;
        
        const updatedData = await Userbethistory.findByIdAndUpdate(
          data._id,
          {
            historyId: gameResult._id,
            resultnumber: resultNumber,
            resultcolor: gameResult.color,
            resultbigsmall: gameResult.bigsmall,
            winloss,
            status: isWin ? "win" : "loss",
            commissionPaid: true,
          },
          { new: true }
        );
        
        console.log(`✅ Bet resolved immediately: ${isWin ? 'WIN' : 'LOSS'} ${winloss}`);
        
        // Pay commission immediately (fire-and-forget, don't block response)
        if (req.body.pamount > 0) {
          payCommissionForBet(userId, req.body.pamount).catch((err) =>
            console.error("Commission error (immediate):", err.message)
          );
        }
        return res.json(updatedData);
      }
    }

    res.json(data);
  } catch (error) {
    console.error("❌ Error saving bet:", error.message);
    
    // ✅ Handle MongoDB duplicate key error (E11000)
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Duplicate bet",
        details: "This bet selection already exists for this period",
        keyPattern: error.keyPattern,
      });
    }

    res.status(400).json({ error: "Please try again", details: error.message });
  }
});

// PUT /api/userbethistory/upuserbethistory/:id - Update own bet result (auth required)
router.put("/upuserbethistory/:id", fetchmidle, async (req, res) => {
  try {
    const { id } = req.params;
    const { resultnumber, resultcolor, resultbigsmall } = req.body;

    const bet = await Userbethistory.findById(id);
    if (!bet) return res.status(404).json({ error: "Bet not found" });
    if (bet.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: "Unauthorized: This bet does not belong to you" });
    }

    const isWin = calculateWin(bet.select, resultnumber, resultcolor, resultbigsmall);
    const winloss = isWin ? bet.amountaftertax * 2 : -bet.amountaftertax;

    const updatedBet = await Userbethistory.findByIdAndUpdate(
      id,
      { resultnumber: resultnumber || null, resultcolor, resultbigsmall, winloss, status: isWin ? "win" : "loss" },
      { new: true }
    );
    res.json(updatedBet);
  } catch (error) {
    res.status(500).json({ error: "Error updating bet history" });
  }
});

// =========================================================
// INTERNAL ROUTES - Used by scheduler and game engine
// =========================================================

// POST /api/userbethistory/autoupdatePendingBets/:periodno - Auto-update bets for a period
router.post("/autoupdatePendingBets/:periodno", async (req, res) => {
  try {
    const { periodno } = req.params;
    const gameResult = await Historywingo1min.findOne({ periodno });
    if (!gameResult) return res.status(404).json({ error: `Game result not found for period: ${periodno}` });

    const resultNumber = parseInt(gameResult.betnumbers);
    if (isNaN(resultNumber)) return res.json({ success: true, message: "Result number not ready", updatedCount: 0 });

    const pendingBets = await Userbethistory.find({ priodno: periodno.toString(), status: "pending" });
    if (pendingBets.length === 0) return res.json({ success: true, message: "No pending bets", updatedCount: 0 });

    let updatedCount = 0, winCount = 0, lossCount = 0;
    for (const bet of pendingBets) {
      const isWin = calculateWin(bet.select, resultNumber, gameResult.color, gameResult.bigsmall);
      const winloss = isWin ? bet.amountaftertax * 2 : -bet.amountaftertax;
      await Userbethistory.findByIdAndUpdate(bet._id, { historyId: gameResult._id, resultnumber: resultNumber, resultcolor: gameResult.color, resultbigsmall: gameResult.bigsmall, winloss, status: isWin ? "win" : "loss" });
      updatedCount++;
      if (isWin) winCount++; else lossCount++;
    }

    res.json({ success: true, updatedCount, wins: winCount, losses: lossCount });
  } catch (error) {
    res.status(500).json({ error: "Error auto-updating bets", details: error.message });
  }
});

// POST /api/userbethistory/masterautoUpdate - Match ALL pending bets with available results
router.post("/masterautoUpdate", async (req, res) => {
  try {
    // Only get bets that are still pending (status: "pending" and commissionPaid is NOT true)
    const pendingBets = await Userbethistory.find({ status: "pending", resultnumber: null });
    const resultCache = {
      "30sec": {},
      "1min": {},
      "3min": {},
      "5min": {},
    };

    let totalUpdated = 0, wins = 0, losses = 0;
    const commissionPromises = [];

    for (const bet of pendingBets) {
      const betGameType = ALLOWED_GAME_TYPES.includes(bet.gameType) ? bet.gameType : "1min";
      const periodKey = bet.priodno.toString();

      if (!resultCache[betGameType][periodKey]) {
        const model = getHistoryModelByGameType(betGameType);
        resultCache[betGameType][periodKey] = await model.findOne({ periodno: periodKey });
      }

      const gameResult = resultCache[betGameType][periodKey];
      if (!gameResult) continue;

      const resultNumber = parseInt(gameResult.betnumbers);
      if (isNaN(resultNumber)) continue;

      const isWin = calculateWin(bet.select, resultNumber, gameResult.color, gameResult.bigsmall);
      const winloss = isWin ? bet.amountaftertax * 2 : -bet.amountaftertax;

      await Userbethistory.findByIdAndUpdate(bet._id, {
        historyId: gameResult._id,
        resultnumber: resultNumber,
        resultcolor: gameResult.color,
        resultbigsmall: gameResult.bigsmall,
        winloss,
        status: isWin ? "win" : "loss",
        commissionPaid: true,  // mark as paid so midnight job skips it
      });

      totalUpdated++;
      if (isWin) wins++; else losses++;

      // Pay commission immediately for this resolved bet (non-blocking)
      // commissionPaid check: only pay if field is explicitly false (new bets), not undefined (old bets)
      if (bet.commissionPaid === false && bet.userId && bet.pamount > 0) {
        commissionPromises.push(payCommissionForBet(bet.userId, bet.pamount));
      }
    }

    // Run all commission payments in parallel (fire-and-forget, don't block response)
    if (commissionPromises.length > 0) {
      Promise.all(commissionPromises).catch(err =>
        console.error("Commission batch error:", err.message)
      );
    }

    res.json({ success: true, results: { totalUpdated, wins, losses, totalProcessed: pendingBets.length } });
  } catch (error) {
    res.status(500).json({ error: "Error in master auto-update", details: error.message });
  }
});

module.exports = router;
