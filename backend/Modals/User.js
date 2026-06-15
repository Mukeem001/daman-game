const mongoose = require('mongoose');
const {Schema}=mongoose; 
const UserSchema = new Schema({
    name:{
        type:String,
        
    },
    usernumber:{
        type:Number,
        require:true,
        unique:true,
    },
   password:{
        type:String,
    },
    userbalance:{
        type:Number,
        default: 0,
    },
    invitationCode:{
        type: String,
        unique: true,
        sparse: true,
    },
    referredBy:{
        type: String,   // invitation code of the person who referred this user
        default: null,
    },
    totalCommission:{
        type: Number,
        default: 0,
    },
    pendingCommission:{
        type: Number,
        default: 0,
    },
  }, { timestamps: true });

  module.exports = mongoose.model('user',UserSchema);