const mongoose = require("mongoose");
const { Schema } = mongoose;
const Historywingo3min = new Schema({
    periodno:{
        type:String,
       
    },
    betnumbers:{
        type:String,
         
    },
    bigsmall:{
        type: String,
       
    },
    color:{
        type:String,
    },
}, { timestamps: true });

module.exports = mongoose.model("Historywingo3min", Historywingo3min);
