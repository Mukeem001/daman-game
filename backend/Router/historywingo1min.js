const express = require("express");
const router = express.Router();
const historywingoitem = require("../Modals/Historywingo1min.js");

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

// =========================================================
// GAME HISTORY ROUTES - Mounted at /api/history
// =========================================================

// GET /api/history/getwingoitems - Get all game history (public)
router.get("/getwingoitems", async (req, res) => {
  try {
    const notes = await historywingoitem.find({}).sort({ periodno: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching game history" });
  }
});

// GET /api/history/getlastwingoitem - Get latest game result (public)
router.get("/getlastwingoitem", async (req, res) => {
  try {
    const lastItem = await historywingoitem.findOne({}).sort({ createdAt: -1, periodno: -1 });
    if (!lastItem) return res.status(404).json({ error: "No wingo items found" });
    res.json(lastItem);
  } catch (error) {
    res.status(500).json({ error: "Error fetching last game result" });
  }
});

// POST /api/history/getwingoitemsone - Get history for a specific period (public)
router.post("/getwingoitemsone", async (req, res) => {
  try {
    const { periodno } = req.body;
    const notes = await historywingoitem.find({ periodno });
    if (notes.length === 0) return res.status(404).json({ error: "No records found for this period" });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching game history for period" });
  }
});

// POST /api/history/addwingoitems - Add game result (internal scheduler use)
// NOTE: For admin use, prefer /api/admin/history
router.post("/addwingoitems", async (req, res) => {
  try {
    const notes = new historywingoitem({
      periodno: req.body.periodno,
      betnumbers: req.body.betnumbers,
      bigsmall: req.body.bigsmall,
      color: req.body.color,
    });
    const data = await notes.save();

    // Fire-and-forget: trigger auto-update for pending bets
    (async () => {
      try {
        await fetch(`${API_BASE_URL}/api/userbethistory/autoupdatePendingBets/${req.body.periodno}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.error("Auto-update trigger failed:", err.message);
      }
    })();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error adding game history" });
  }
});

module.exports = router;
