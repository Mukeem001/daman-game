const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommissionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  fromUserId: { type: Schema.Types.ObjectId, ref: 'user' },
  amount: { type: Number, required: true },
  tier: { type: Number, required: true }, // 1-5
  betVolume: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  description: { type: String },
});

module.exports = mongoose.model('commissionhistory', CommissionSchema);
