
const mongoose = require('mongoose');
const {Schema}=mongoose; 
const UserSchema = new Schema({
    // user:{

    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'user',
    // },
    periodno:{
        type:String,
       
       
    },
    betnumber:{
         
    },
    bigsmall:{
        type: String,
       
    },
    color:{
        type:String,
    },
   
   
    
    }
  );

  module.exports = mongoose.model('betitem',UserSchema);