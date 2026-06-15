
const mongoose = require('mongoose');
const {Schema}=mongoose; 
const UserSchema = new Schema({
    user:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    name:{
        type:String,
        require:true,
       
    },
    phone:{
        type: Number,
        require:true,
        
    },
   address:{
        type:String,
        require:true,
       
    },
    landmark:{
        type:String,
        require:true,
    },
    state:{
        type:String,
        require:true,
    },
    country:{
        type:String,
    },
    city:{
        type:String,
       
       
    },
    pincode:{
        type: Number,
        require:true,
       
       
    },
    
   
    
    }
  );

  module.exports = mongoose.model('UserAddress',UserSchema);