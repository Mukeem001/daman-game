const mongoose = require("mongoose");
const { Schema } = mongoose;

const Wingo30secBetControlSchema = new Schema({
  priodno: { type: String },
  big: { type: Number, default: 0 },
  small: { type: Number, default: 0 },
  red: { type: Number, default: 0 },
  green: { type: Number, default: 0 },
  violet: { type: Number, default: 0 },
  Num0: { type: Number, default: 0 },
  Num1: { type: Number, default: 0 },
  Num2: { type: Number, default: 0 },
  Num3: { type: Number, default: 0 },
  Num4: { type: Number, default: 0 },
  Num5: { type: Number, default: 0 },
  Num6: { type: Number, default: 0 },
  Num7: { type: Number, default: 0 },
  Num8: { type: Number, default: 0 },
  Num9: { type: Number, default: 0 },
});

module.exports = mongoose.model("wingo30sec", Wingo30secBetControlSchema);
