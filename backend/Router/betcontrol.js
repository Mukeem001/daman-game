const express = require("express");
const router = express.Router();
const betcontrol = require("../Modals/Betcontrol.js");

// =========================================================
// BETCONTROL ROUTES - Mounted at /api/betcontrol
// =========================================================

// POST /api/betcontrol/getwingosresult - Get betting totals for a period (public)
router.post("/getwingosresult", async (req, res) => {
  const { priodno } = req.body;
  if (!priodno) return res.status(400).json({ error: "priodno is required" });

  try {
    const notes = await betcontrol.find({ priodno });

    const totals = notes.reduce(
      (acc, note) => {
        acc.totalBig += note.big || 0;
        acc.totalSmall += note.small || 0;
        acc.totalGreen += note.green || 0;
        acc.totalRed += note.red || 0;
        acc.totalViolet += note.violet || 0;
        acc.totalNum0 += note.Num0 || 0;
        acc.totalNum1 += note.Num1 || 0;
        acc.totalNum2 += note.Num2 || 0;
        acc.totalNum3 += note.Num3 || 0;
        acc.totalNum4 += note.Num4 || 0;
        acc.totalNum5 += note.Num5 || 0;
        acc.totalNum6 += note.Num6 || 0;
        acc.totalNum7 += note.Num7 || 0;
        acc.totalNum8 += note.Num8 || 0;
        acc.totalNum9 += note.Num9 || 0;
        return acc;
      },
      {
        totalBig: 0, totalSmall: 0, totalGreen: 0, totalRed: 0, totalViolet: 0,
        totalNum0: 0, totalNum1: 0, totalNum2: 0, totalNum3: 0, totalNum4: 0,
        totalNum5: 0, totalNum6: 0, totalNum7: 0, totalNum8: 0, totalNum9: 0,
      }
    );

    res.json(totals);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bet totals" });
  }
});

// POST /api/betcontrol/addwingoitems - Add betcontrol entry (internal scheduler use)
// NOTE: For admin use, prefer /api/admin/betcontrol
router.post("/addwingoitems", async (req, res) => {
  try {
    const notes = new betcontrol({
      priodno: req.body.priodno,
      big: req.body.big || 0,
      small: req.body.small || 0,
      red: req.body.red || 0,
      green: req.body.green || 0,
      violet: req.body.violet || 0,
      Num0: req.body.Num0 || 0,
      Num1: req.body.Num1 || 0,
      Num2: req.body.Num2 || 0,
      Num3: req.body.Num3 || 0,
      Num4: req.body.Num4 || 0,
      Num5: req.body.Num5 || 0,
      Num6: req.body.Num6 || 0,
      Num7: req.body.Num7 || 0,
      Num8: req.body.Num8 || 0,
      Num9: req.body.Num9 || 0,
    });
    const data = await notes.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error adding betcontrol entry" });
  }
});

// PUT /api/betcontrol/getwingoitems - Increment betcontrol values (internal, called when user places bet)
router.put("/getwingoitems", async (req, res) => {
  try {
    const { priodno } = req.body;
    if (!priodno) return res.status(400).json({ error: "priodno is required" });

    const inc = {
      big: req.body.big || 0,
      small: req.body.small || 0,
      red: req.body.red || 0,
      green: req.body.green || 0,
      violet: req.body.violet || 0,
      Num0: req.body.Num0 || 0,
      Num1: req.body.Num1 || 0,
      Num2: req.body.Num2 || 0,
      Num3: req.body.Num3 || 0,
      Num4: req.body.Num4 || 0,
      Num5: req.body.Num5 || 0,
      Num6: req.body.Num6 || 0,
      Num7: req.body.Num7 || 0,
      Num8: req.body.Num8 || 0,
      Num9: req.body.Num9 || 0,
    };

    const updatedNote = await betcontrol.findOneAndUpdate(
      { priodno },
      { $inc: inc },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ error: "Betcontrol entry not found for this period" });

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: "Error updating betcontrol entry" });
  }
});

module.exports = router;
