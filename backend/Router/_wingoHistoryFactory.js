const express = require("express");

const createWingoHistoryRouter = (HistoryModel) => {
  const router = express.Router();

  router.get("/getwingoitems", async (req, res) => {
    try {
      const notes = await HistoryModel.find({}).sort({ periodno: -1 });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Error fetching game history" });
    }
  });

  router.get("/getlastwingoitem", async (req, res) => {
    try {
      const lastItem = await HistoryModel.findOne({}).sort({ createdAt: -1, periodno: -1 });
      if (!lastItem) return res.status(404).json({ error: "No wingo items found" });
      res.json(lastItem);
    } catch (error) {
      res.status(500).json({ error: "Error fetching last game result" });
    }
  });

  router.post("/getwingoitemsone", async (req, res) => {
    try {
      const { periodno } = req.body;
      const notes = await HistoryModel.find({ periodno });
      if (notes.length === 0) return res.status(404).json({ error: "No records found for this period" });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ error: "Error fetching game history for period" });
    }
  });

  router.post("/addwingoitems", async (req, res) => {
    try {
      const notes = new HistoryModel({
        periodno: req.body.periodno,
        betnumbers: req.body.betnumbers,
        bigsmall: req.body.bigsmall,
        color: req.body.color,
      });
      const data = await notes.save();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error adding game history" });
    }
  });

  return router;
};

module.exports = createWingoHistoryRouter;
