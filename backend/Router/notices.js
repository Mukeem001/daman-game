const express = require("express");
const router = express.Router();
const Notice = require("../Modals/Notice.js");

// =========================================================
// NOTICES ROUTES - Mounted at /api/notices
// =========================================================

// GET /api/notices - Get all notices
router.get("/", async (req, res) => {
  try {
    const notices = await Notice.find({}).sort({ createdAt: -1 });
    res.json({ success: true, count: notices.length, notices });
  } catch (err) {
    console.error("Error fetching notices:", err);
    res.status(500).json({ error: "Error fetching notices" });
  }
});

// POST /api/notices/broadcast - Create broadcast notice
router.post("/broadcast", async (req, res) => {
  try {
    const { title, content, isActive } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const notice = new Notice({
      title,
      content,
      isActive: isActive !== false,
      recipientType: "broadcast",
    });
    const saved = await notice.save();
    res.status(201).json({ success: true, notice: saved });
  } catch (err) {
    console.error("Error creating broadcast notice:", err);
    res.status(500).json({ error: "Error creating notice" });
  }
});

// POST /api/notices/user/:userId - Create notice for specific user
router.post("/user/:userId", async (req, res) => {
  try {
    const { title, content, isActive } = req.body;
    const { userId } = req.params;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const notice = new Notice({
      title,
      content,
      isActive: isActive !== false,
      recipientType: "userId",
      userId,
    });
    const saved = await notice.save();
    res.status(201).json({ success: true, notice: saved });
  } catch (err) {
    console.error("Error creating user notice:", err);
    res.status(500).json({ error: "Error creating notice" });
  }
});

// POST /api/notices/user/name/:userName - Create notice for user by name
router.post("/user/name/:userName", async (req, res) => {
  try {
    const { title, content, isActive } = req.body;
    const { userName } = req.params;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const notice = new Notice({
      title,
      content,
      isActive: isActive !== false,
      recipientType: "userName",
      userName: decodeURIComponent(userName),
    });
    const saved = await notice.save();
    res.status(201).json({ success: true, notice: saved });
  } catch (err) {
    console.error("Error creating user notice by name:", err);
    res.status(500).json({ error: "Error creating notice" });
  }
});

// DELETE /api/notices/:id - Delete a notice
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notice.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Notice not found" });
    }
    res.json({ success: true, message: "Notice deleted", id });
  } catch (err) {
    console.error("Error deleting notice:", err);
    res.status(500).json({ error: "Error deleting notice" });
  }
});

module.exports = router;

