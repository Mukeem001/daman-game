const mongoose = require('mongoose');
const { Schema } = mongoose;

const BeneficiarySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    enum: ['bank_card', 'upi', 'arpay', 'usdt'],
    required: true,
  },
  fullName: {
    type: String,
  },
  bankName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  ifscCode: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  upiId: {
    type: String,
  },
  usdtAddress: {
    type: String,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries by userId and method
BeneficiarySchema.index({ userId: 1, method: 1 });

module.exports = mongoose.model('Beneficiary', BeneficiarySchema);
