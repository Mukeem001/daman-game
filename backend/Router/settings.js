const express = require("express");
const router = express.Router();
const Settings = require("../Modals/Settings.js");

// ============ SETTINGS MANAGEMENT ============

// GET /api/admin/settings - Get all settings
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json({ success: true, data: settings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching settings" });
  }
});

// PUT /api/admin/settings - Update settings
router.put("/", async (req, res) => {
  try {
    const { appName, supportPhone, upiId, bankName, bankAccountNumber, bankIfscCode, qrCodeUrl } = req.body;
    
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }

    if (appName) settings.appName = appName;
    if (supportPhone) settings.supportPhone = supportPhone;
    if (upiId) settings.upiId = upiId;
    if (bankName) settings.bankName = bankName;
    if (bankAccountNumber) settings.bankAccountNumber = bankAccountNumber;
    if (bankIfscCode) settings.bankIfscCode = bankIfscCode;
    if (qrCodeUrl) settings.qrCodeUrl = qrCodeUrl;

    await settings.save();
    res.json({ success: true, data: settings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating settings" });
  }
});

// ============ UPI METHODS MANAGEMENT ============

// GET /api/admin/settings/upi-methods - Get all UPI methods
router.get("/upi-methods", async (req, res) => {
  try {
    const UpiMethod = require("../Modals/UpiMethod.js");
    const upiMethods = await UpiMethod.find({}).sort({ createdAt: -1 });
    res.json(upiMethods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching UPI methods" });
  }
});

// POST /api/admin/settings/upi-methods - Add UPI method
router.post("/upi-methods", async (req, res) => {
  try {
    const UpiMethod = require("../Modals/UpiMethod.js");
    const { name, upiId, displayName } = req.body;
    
    if (!name || !upiId) {
      return res.status(400).json({ error: "Name and UPI ID are required" });
    }

    const newUpi = new UpiMethod({
      name,
      upiId,
      displayName: displayName || name,
      isActive: "1"
    });

    const savedUpi = await newUpi.save();
    res.json({ success: true, data: savedUpi });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding UPI method" });
  }
});

// DELETE /api/admin/settings/upi-methods/:id - Delete UPI method
router.delete("/upi-methods/:id", async (req, res) => {
  try {
    const UpiMethod = require("../Modals/UpiMethod.js");
    const { id } = req.params;
    await UpiMethod.findByIdAndDelete(id);
    res.json({ success: true, message: "UPI method deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting UPI method" });
  }
});

// POST /api/admin/upi-methods - Add UPI method
router.post("/upi-methods", async (req, res) => {
  try {
    const { name, upiId, displayName } = req.body;
    
    if (!name || !upiId) {
      return res.status(400).json({ error: "Name and UPI ID are required" });
    }

    // Mock save (In real app, save to DB)
    const newUpi = {
      id: Date.now(),
      name,
      upiId,
      displayName: displayName || name,
      isActive: "1",
      createdAt: new Date()
    };

    res.json({ success: true, data: newUpi });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding UPI method" });
  }
});

// DELETE /api/admin/upi-methods/:id - Delete UPI method
router.delete("/upi-methods/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Mock delete (In real app, delete from DB)
    res.json({ success: true, message: "UPI method deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting UPI method" });
  }
});

// ============ APK FILES MANAGEMENT ============

// GET /api/admin/settings/apk-files - Get all APK files
router.get("/apk-files", async (req, res) => {
  try {
    const ApkFile = require("../Modals/ApkFile.js");
    const apkFiles = await ApkFile.find({}).sort({ createdAt: -1 });
    res.json(apkFiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching APK files" });
  }
});

// POST /api/admin/settings/apk-files - Upload APK file
router.post("/apk-files", async (req, res) => {
  try {
    const ApkFile = require("../Modals/ApkFile.js");
    const { filename, filesize, versionCode, versionName } = req.body;
    
    const newApk = new ApkFile({
      filename,
      filepath: `/uploads/apk/${filename}`,
      filesize,
      versionCode,
      versionName,
      isActive: "1"
    });

    const savedApk = await newApk.save();
    res.json({ success: true, data: savedApk });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error uploading APK file" });
  }
});

// DELETE /api/admin/settings/apk-files/:id - Delete APK file
router.delete("/apk-files/:id", async (req, res) => {
  try {
    const ApkFile = require("../Modals/ApkFile.js");
    const { id } = req.params;
    await ApkFile.findByIdAndDelete(id);
    res.json({ success: true, message: "APK file deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting APK file" });
  }
});

// POST /api/admin/apk-files - Upload APK file
router.post("/apk-files", async (req, res) => {
  try {
    const { filename, versionCode, versionName } = req.body;
    
    if (!filename || !versionCode || !versionName) {
      return res.status(400).json({ error: "Filename, version code and version name are required" });
    }

    // Mock upload (In real app, handle file upload)
    const newApk = {
      id: Date.now(),
      filename,
      filepath: `/apk/${filename}`,
      filesize: "45 MB",
      versionCode,
      versionName,
      isActive: "1",
      createdAt: new Date()
    };

    res.json({ success: true, data: newApk });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error uploading APK file" });
  }
});

// DELETE /api/admin/apk-files/:id - Delete APK file
router.delete("/apk-files/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Mock delete (In real app, delete from DB and file system)
    res.json({ success: true, message: "APK file deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting APK file" });
  }
});
// POST /api/admin/settings/upload-qr - Upload QR code image
router.post("/upload-qr", async (req, res) => {
  try {
    // Mock QR code upload (In real app, handle file upload and storage)
    const qrCodeUrl = "https://via.placeholder.com/200x200?text=QR+Code";
    res.json({ success: true, qrCodeUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error uploading QR code" });
  }
});
module.exports = router;
