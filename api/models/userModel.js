'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passwordHash = require('password-hash');


var UserSchema = new Schema({
  first_name: {
    type: String,
    required: 'Enter your family name'
  },
  last_name: {
    type: String,
    required: 'Enter your lastname'
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: "Enter you email please",
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: 'Enter your password'
  },
  role: {
    type: Number,
    default: 0
  },
  created_date: {
    type: Date,
    default: Date.now
  },
});

UserSchema.pre('save', function(next) {
    if(this.password) {
        this.password  = passwordHash.generate(this.password);
    }
    next();
});

module.exports = mongoose.model('Users', UserSchema);
