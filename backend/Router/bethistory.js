const express = require("express");
const router = express.Router();
const fetchmidle = require("../midle/midle.js");
const Userbethistory = require("../Modals/Userbethistory.js");

// Mapping frontend game types to backend game types
const GAME_TYPE_MAPPING = {
  "lottery": ["1min", "30sec", "3min", "5min"], // Win Go lottery variants
  "casino": [],
  "fishing": [],
  "rummy": [],
  "original": [],
  "slots": [],
};

// Helper: Get status based on win/loss
const getStatus = (winloss) => {
  if (winloss === undefined || winloss === null) return "Pending";
  if (winloss > 0) return "Win";
  if (winloss < 0) return "Lose";
  return "Draw";
};

// GET /api/bet/history - Get all bet history (auth required)
router.get("/", fetchmidle, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all bet history for user
    const bets = await Userbethistory.find({ userId })
      .sort({ ordertime: -1, createdAt: -1 })
      .limit(100)
      .lean();

    // Transform data to frontend format
    const formattedBets = bets.map((bet) => ({
      _id: bet._id,
      gameName: `Win Go ${bet.gameType}`,
      gameType: bet.gameType,
      status: getStatus(bet.winloss),
      createdAt: bet.ordertime || bet.createdAt || new Date(),
      period: bet.priodno,
      periodNo: bet.priodno,
      orderId: bet.orderno,
      selection: bet.select,
      betType: bet.select,
      betAmount: bet.pamount,
      actualAmount: bet.amountaftertax,
      winnings: bet.winloss > 0 ? bet.winloss : 0,
      handlingFee: bet.tax || 0,
      profitLoss: bet.winloss || 0,
      result: `${bet.resultnumber || "?"} ${bet.resultcolor || ""} ${bet.resultbigsmall || ""}`.trim(),
    }));

    res.json({
      success: true,
      bets: formattedBets,
      count: formattedBets.length,
    });
  } catch (error) {
    console.error("Error fetching bet history:", error);
    res.status(500).json({ success: false, error: "Error fetching bet history" });
  }
});

module.exports = router;
