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
    type:String,  // ✅ Changed to String to match Historywingo1min model
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
  
});

module.exports = mongoose.model("userbethistory", UserSchema);
