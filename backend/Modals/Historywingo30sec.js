const mongoose = require("mongoose");
const { Schema } = mongoose;

const Historywingo30sec = new Schema(
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

module.exports = mongoose.model("Historywingo30sec", Historywingo30sec);
