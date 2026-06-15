const express = require("express");
const router = express.Router();
const fetchmidle = require("../midle/midle.js");
const UserAddress = require("../Modals/Address.js");

// =========================================================
// ADDRESS ROUTES - Mounted at /api/Address
// =========================================================

// GET /api/Address/getaddress - Get own addresses (auth required)
router.get("/getaddress", fetchmidle, async (req, res) => {
  try {
    const notes = await UserAddress.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching addresses" });
  }
});

// POST /api/Address/address - Add a new address (auth required)
router.post("/address", fetchmidle, async (req, res) => {
  try {
    const address = new UserAddress({
      user: req.user.id,
      name: req.body.name,
      address: req.body.address,
      landmark: req.body.landmark,
      phone: req.body.phone,
      state: req.body.state,
    });
    const data = await address.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error saving address" });
  }
});

module.exports = router;
