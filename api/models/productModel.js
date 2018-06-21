'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProductSchema = new Schema({
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
  price: {
    type: Number,
    required: "You must define a price for this product."
  },
  colors: [{
    type: String,
    default: null
  }],
  category: [{
    type: Schema.Types.ObjectId,
    ref: "Categories",
    required: "You must define a category for this product"
  }]
});

module.exports = mongoose.model('Products', ProductSchema);
