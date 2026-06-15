const mongoose = require("mongoose");
const { Schema } = mongoose;

const Historywingo5min = new Schema(
  {
    periodno: {
      type: String,
    },
    betnumbers: {
      type: String,
    },
    bigsmall: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Historywingo5min", Historywingo5min);
