const mongoose = require('mongoose');
var user = mongoose.model('user',
   {
    Email:{
    type:String,
    required: true,
    trim:true,
    minLength: 1
    }
  });
  module.exports = {user};