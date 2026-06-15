const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  userId:{

  },
  priodno:{
    type:Number,

  },
  orderno: {},
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
  status: {
    type: String,
  },
  winloss: {
    type: Number,
  },

  ordertime: {
    type: Number,
  },
  
});

module.exports = mongoose.model("userbethis3min", UserSchema);
