'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CategorySchema = new Schema({
  name: {
    type: String,
    required: 'Enter your a name for this category.'
  },
  description: {
    type: String,
    default: null
  },
  picture: {
    type: String,
    default: null
  },
  civility: {
    type: String,
    enum: ['Hommes', 'Femmes'],
    required: "You need to specify a civility for this category."
  }
});

module.exports = mongoose.model('Categories', CategorySchema);
