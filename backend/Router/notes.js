const express = require("express");
const router = express.Router();
const fetchmidle = require("../midle/midle.js");
const Betitems = require("../Modals/Betitems.js");

// =========================================================
// BET ITEMS ROUTES - Mounted at /api/Bet
// =========================================================

// GET /api/Bet/getbetitem - Get all bet items (public)
router.get("/getbetitem", async (req, res) => {
  try {
    const notes = await Betitems.find({});
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bet items" });
  }
});

// POST /api/Bet/addbetitem - Add a bet item
router.post("/addbetitem", async (req, res) => {
  try {
    const notes = new Betitems({
      periodno: req.body.periodno,
      betnumber: req.body.betnumber,
      bigsmall: req.body.bigsmall,
      color: req.body.color,
    });
    const data = await notes.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error adding bet item" });
  }
});

module.exports = router;
