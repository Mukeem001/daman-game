const mongoose = require('mongoose');
const { Schema } = mongoose;

const WithdrawalSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ['upi', 'bank_card', 'arpay', 'usdt'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending',
  },
  beneficiaryId: {
    type: Schema.Types.ObjectId,
    ref: 'Beneficiary',
  },
  transactionId: {
    type: String,
  },
  notes: {
    type: String,
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

module.exports = mongoose.model('Withdrawal', WithdrawalSchema);
