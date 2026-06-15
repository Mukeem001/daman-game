const mongoose = require("mongoose");

const upiMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  upiId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    default: ''
  },
  isActive: {
    type: String,
    default: "1"
  }
}, { timestamps: true });

module.exports = mongoose.model("UpiMethod", upiMethodSchema);
