const express = require("express");
const router = express.Router();
const fetchmidle = require("../midle/midle.js");
const Userbethistory3min = require("../Modals/Userbethis3min.js");
const Wingo3minbetcontrol = require("../Modals/Wingo3minbetcontrol.js");

// Helper: Update betcontrol when a 3min bet is placed
const updateBetcontrol3min = async (select, betAmount, priodno) => {
  try {
    if (!select || !betAmount || !priodno) return;

    // Map select value to betcontrol field name
    let field = null;
    const selectLower = select.toString().toLowerCase();

    if (selectLower === "big") field = "big";
    else if (selectLower === "small") field = "small";
    else if (selectLower === "red") field = "red";
    else if (selectLower === "green") field = "green";
    else if (selectLower === "violet") field = "violet";
    else if (!isNaN(selectLower) && selectLower >= 0 && selectLower <= 9) {
      field = `Num${selectLower}`;
    }

    if (!field) return; // Unknown select type

    // Update betcontrol entry for this period
    const updateObj = { $inc: {} };
    updateObj.$inc[field] = betAmount;

    const updated = await Wingo3minbetcontrol.findOneAndUpdate(
      { priodno: priodno.toString() },
      updateObj,
      { upsert: true, new: true }
    );

    console.log(`✅ 3min Betcontrol updated: period ${priodno} - ${field} += ${betAmount}`);
  } catch (err) {
    console.error("Error updating 3min betcontrol:", err.message);
    // Don't throw error - this should not block bet placement
  }
};

// =========================================================
// USER BET HISTORY ROUTES - 3 Minute Game
// =========================================================


router.get("/getuserbethis", fetchmidle, async (req, res) => {
  try {
    console.log(req.user.id,"this is user id find")
    const notes = await Userbethistory3min.find({ userId: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(400).json({ error: "You are not logged in" });
  }
});

// Add user bet history


router.post("/adduserbethis", fetchmidle, async (req, res) => {
  try {

    console.log(req.user.id,"this is user id ")


    const notes = new Userbethistory3min({
      userId: req.user.id, // Add user ID here
      priodno: req.body.priodno,
      pamount: req.body.pamount,
      amountaftertax: req.body.amountaftertax,
      resultnumber: req.body.resultnumber,
      resultcolor: req.body.resultcolor,
      resultbigsmall: req.body.resultbigsmall,
      select: req.body.select,
      status: req.body.status,
      winloss: req.body.winloss,
      ordertime: req.body.ordertime,
      tax: req.body.tax,
    });

    const data = await notes.save();

    // 🎯 Update betcontrol with this bet amount (fire-and-forget)
    updateBetcontrol3min(req.body.select, req.body.amountaftertax || req.body.pamount, req.body.priodno).catch((err) =>
      console.error("Betcontrol update error:", err.message)
    );

    res.json(data);
  } catch (error) {
    res.status(400).json({ error: "Please try again" });
  }
});

// Update user bet history
router.put("/upuserbethistory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { resultnumber, resultcolor, resultbigsmall, status, winloss } = req.body;

    const updatedNote = await Userbethistory3min.findByIdAndUpdate(
      id,
      {
        resultnumber: resultnumber,
        resultcolor: resultcolor,
        resultbigsmall: resultbigsmall,
        winloss: winloss,
        status: status,
      },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating user bet history:", error);
    res.status(500).json({ error: "An error occurred while updating user bet history" });
  }
});

// Get user selected bet
router.post("/getuserselectedbet", async (req, res) => {
  try {
    const notes = { priodno: req.body.priodno };
    console.log(notes, "mukeem console big value");

    const foundNotes = await Userbethistory3min.find({ priodno: notes.priodno });
    res.json(foundNotes);
  } catch (error) {
    res.status(400).json({ error: "You are not logged in" });
  }
});

module.exports = router;
