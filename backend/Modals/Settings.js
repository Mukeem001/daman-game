const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    appName: {
      type: String,
      default: "Matka Pro",
    },
    supportPhone: {
      type: String,
      default: "+91-9876543210",
    },
    upiId: {
      type: String,
      default: "admin@upi",
    },
    bankName: {
      type: String,
      default: "Bank of India",
    },
    bankAccountNumber: {
      type: String,
      default: "1234567890",
    },
    bankIfscCode: {
      type: String,
      default: "BKID0001234",
    },
    qrCodeUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Settings", settingsSchema);
