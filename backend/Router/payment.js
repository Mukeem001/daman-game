const express = require("express");
const router = express.Router();
const axios = require("axios");
const Order = require("../Modals/Order.js");
const User = require("../Modals/User.js");
const Withdrawal = require("../Modals/Withdrawal.js");
const Beneficiary = require("../Modals/Beneficiary.js");
const jwt = require("jsonwebtoken");
const fetchmidle = require("../midle/midle.js");

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mukeemis$muk");
    req.userId = decoded.user.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Admin auth middleware - Verify JWT token
const adminAuth = (req, res, next) => {
  const token = req.headers["admin-token"] || req.headers["authorization"]?.split(" ")[1];
  
  if (!token) {
    console.log("❌ Admin auth FAILED - no token provided");
    return res.status(403).json({ error: "Unauthorized admin" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mukeemis$muk");
    if (!decoded.admin) {
      console.log("❌ Admin auth FAILED - not an admin token");
      return res.status(403).json({ error: "Unauthorized - not an admin token" });
    }
    console.log("✅ Admin auth PASSED for:", decoded.admin.email);
    next();
  } catch (error) {
    console.log("❌ Admin auth FAILED - invalid or expired token:", error.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// POST /api/pay/payment-requests
router.post("/payment-requests", async (req, res) => {
  const apiKey = process.env.INSTAMOJO_API_KEY;
  const authToken = process.env.INSTAMOJO_AUTH_TOKEN;
  if (!apiKey || !authToken) {
    return res.status(500).json({ error: "Payment gateway not configured" });
  }
  try {
    const response = await axios.post("https://api.instamojo.com/v2/payment_requests/", req.body, {
      headers: {
        "X-Api-Key": apiKey,
        "X-Auth-Token": authToken,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    const errData = error.response ? error.response.data : { message: error.message };
    res.status(500).json(errData);
  }
});

// POST /api/pay/create-order
router.post("/create-order", verifyToken, async (req, res) => {
  try {
    const { amount, paymentMethod, paymentChannel } = req.body;
    const userId = req.userId;

    if (!amount || !paymentMethod || !paymentChannel) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (amount < 100 || amount > 50000) {
      return res.status(400).json({ error: "Amount must be between 100 and 50000" });
    }

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const barcode = `${orderNumber}-QR`;

    const order = new Order({
      userId,
      orderNumber,
      amount,
      paymentMethod,
      paymentChannel,
      barcode,
      status: 'pending'
    });
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        amount: order.amount,
        paymentMethod: order.paymentMethod,
        paymentChannel: order.paymentChannel,
        barcode: order.barcode,
        status: order.status,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: error.message || "Error creating order" });
  }
});

// POST /api/pay/submit-utr
router.post("/submit-utr", verifyToken, async (req, res) => {
  try {
    const { orderId, utrNumber } = req.body;
    const userId = req.userId;

    if (!orderId || !utrNumber) {
      return res.status(400).json({ error: "Missing orderId or utrNumber" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.userId.toString() !== userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    order.utrNumber = utrNumber;
    order.status = 'utr_submitted';
    order.utrSubmittedAt = new Date();
    await order.save();

    res.json({
      success: true,
      message: "UTR submitted successfully",
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        utrNumber: order.utrNumber
      }
    });
  } catch (error) {
    console.error("Submit UTR error:", error);
    res.status(500).json({ error: error.message || "Error submitting UTR" });
  }
});

// ================= ADMIN ENDPOINTS =================

// POST /api/pay/admin-approve/:id
router.post("/admin-approve/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    const user = await User.findById(order.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    let bonus = 0;
    if (order.paymentChannel.includes('Bonus') || order.paymentChannel.includes('77Pay')) {
      bonus = Math.floor(order.amount * 0.01);
    }

    const finalAmount = order.amount + bonus;

    user.userbalance += finalAmount;
    await user.save();

    order.status = 'approved';
    order.bonus = bonus;
    order.finalAmount = finalAmount;
    order.adminNotes = notes || 'Approved';
    order.approvedAt = new Date();
    await order.save();

    res.json({ 
      success: true, 
      message: "Deposit approved & wallet credited ₹" + finalAmount,
      userBalance: user.userbalance,
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/pay/admin-reject/:id
router.post("/admin-reject/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = 'rejected';
    order.adminNotes = notes || 'Rejected by admin';
    order.rejectedAt = new Date();
    await order.save();

    res.json({ 
      success: true, 
      message: "Deposit rejected",
      order 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/pay/admin-withdraw-approve/:id
router.post("/admin-withdraw-approve/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId, notes } = req.body;

    const withdrawal = await Withdrawal.findById(id);
    if (!withdrawal) return res.status(404).json({ error: "Withdrawal not found" });

    withdrawal.status = 'approved';
    withdrawal.transactionId = transactionId;
    withdrawal.notes = notes;
    withdrawal.approvedAt = new Date();
    await withdrawal.save();

    res.json({ 
      success: true, 
      message: "Withdrawal approved ₹" + withdrawal.amount,
      withdrawal 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/pay/admin-withdraw-reject/:id
router.post("/admin-withdraw-reject/:id", adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const withdrawal = await Withdrawal.findById(id);
    if (!withdrawal) return res.status(404).json({ error: "Withdrawal not found" });

    const user = await User.findById(withdrawal.userId);
    if (user) {
      user.userbalance += withdrawal.amount;
      await user.save();
    }

    withdrawal.status = 'rejected';
    withdrawal.reason = reason;
    withdrawal.rejectedAt = new Date();
    await withdrawal.save();

    res.json({ 
      success: true, 
      message: "Withdrawal rejected & refunded ₹" + withdrawal.amount,
      userBalance: user ? user.userbalance : null,
      withdrawal 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/pay/orders/:orderId
router.get("/orders/:orderId", verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.userId.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/pay/user-orders
router.get("/user-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// WITHDRAW ROUTES
router.get("/history", fetchmidle, async (req, res) => {
  try {
    const userId = req.user.id;
    const withdrawals = await Withdrawal.find({ userId }).sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, withdrawals: withdrawals.map(w => ({
      _id: w._id,
      userId: w.userId,
      amount: w.amount,
      method: w.method,
      status: w.status,
      createdAt: w.createdAt,
      transactionId: w.transactionId,
      notes: w.notes
    })) });
  } catch (error) {
    console.error("Error fetching withdrawal history:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/request", fetchmidle, async (req, res) => {
  try {
    const { amount, method } = req.body;
    const userId = req.user.id;

    if (!amount || !method) return res.status(400).json({ error: "Missing fields" });
    if (amount < 100 || amount > 30000) return res.status(400).json({ error: "Amount range 100-30000" });

    const user = await User.findById(userId);
    if (!user || user.userbalance < amount) return res.status(400).json({ error: "Insufficient balance" });

    const beneficiary = await Beneficiary.findOne({ userId, method });
    if (!beneficiary) return res.status(400).json({ error: "Add beneficiary first" });

    const withdrawal = new Withdrawal({ userId, amount, method, status: 'pending', beneficiaryId: beneficiary._id });
    await withdrawal.save();

    user.userbalance -= amount;
    await user.save();

    res.status(201).json({ success: true, message: "Withdrawal requested", withdrawal, userBalance: user.userbalance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/beneficiary", fetchmidle, async (req, res) => {
  try {
    const { method, fullName, bankName, accountNumber, ifscCode, phoneNumber, upiId, usdtAddress } = req.body;
    const userId = req.user.id;

    // Validation logic (abbreviated for brevity)
    if (!method || !['bank_card', 'upi', 'arpay', 'usdt'].includes(method)) return res.status(400).json({ error: "Invalid method" });
    if (!fullName) return res.status(400).json({ error: "Full name required" });

    let beneficiary = await Beneficiary.findOne({ userId, method });
    if (beneficiary) {
      beneficiary.fullName = fullName;
      // Update other fields based on method...
      await beneficiary.save();
    } else {
      beneficiary = new Beneficiary({ userId, method, fullName /* + other fields */ });
      await beneficiary.save();
    }

    res.status(201).json({ success: true, message: "Beneficiary saved", beneficiary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/beneficiary", fetchmidle, async (req, res) => {
  try {
    const method = req.query.method || 'upi';
    const userId = req.user.id;
    const beneficiary = await Beneficiary.findOne({ userId, method });
    res.json({ success: true, beneficiary: beneficiary || null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
