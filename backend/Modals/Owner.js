const mongoose = require('mongoose');
const {Schema}=mongoose; 
const UserSchema = new Schema({
    name:{
        type:String,
        require:true,
        uniqe:true,
    },
    email:{
        type:String,
        require:true,
        uniqe:true,
    },
   password:{
        type:String,
        
      
    },
    
    
    }
  );

  module.exports = mongoose.model('owner',UserSchema);