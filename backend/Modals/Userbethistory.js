const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  userId: {
    type: String,
    index: true,
  },
  historyId:{
    type: Schema.Types.ObjectId,
    ref: 'Historywingo1min',
    default: null
  },
  priodno:{
    type: String,  // ✅ Changed to String to match Historywingo1min model
    index: true,
  },
  orderno: {
    type: String,
  },
  pamount: {
    type: Number,
  },
  amountaftertax: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  resultnumber: {
    type: Number,
    default: null
  },
  resultcolor: {
    type: String,
  },
  resultbigsmall: {
    type: String,
  },
  select: {
    type: String,
  },
  gameType: {
    type: String,
    default: "1min",
    index: true,
  },
  status: {
    type: String,
  },
  winloss: {
    type: Number,
  },
  ordertime: {
    type: Number,
  },
  commissionPaid: {
    type: Boolean,
    default: false,
    index: true,
  },
}, { timestamps: true });

// ✅ CRITICAL: Unique index to prevent duplicate bets for same user + period + game type
// This ensures we don't save the same bet twice even if the API is called multiple times
UserSchema.index({ userId: 1, priodno: 1, gameType: 1, select: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("userbethistory", UserSchema);
