const mongoose = require("mongoose");
const { Schema } = mongoose;
const Historywingo = new Schema({
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
}, { timestamps: true }); // ✅ Add timestamps for createdAt and updatedAt

module.exports = mongoose.model("Historywingo1min", Historywingo);
