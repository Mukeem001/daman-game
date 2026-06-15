const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  priodno:{
    type:Number,

  },
  big: {
    type: Number,
  },
  small: {
    type: Number,
  },
  red: {
    type: Number,
  },
  green: {
    type: Number,
  },
  violet: {
    type: Number,
  },

  Num1: {
    type: Number,
  },
  Num2: {
    type: Number,
  },
  Num3: {
    type: Number,
  },
  Num3: {
    type: Number,
  },
  Num4: {
    type: Number,
  },

  Num5: {
    type: Number,
  },
  Num6: {
    type: Number,
  },
  Num7: {
    type: Number,
  },
  Num8: {
    type: Number,
  },
  Num9: {
    type: Number,
  },
  Num0: {
    type: Number,
  },
});

// Use Wingo1minbetcontrol.js instead - this prevents model duplication
module.exports = require("./Wingo1minbetcontrol.js");
