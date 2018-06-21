'use strict';


var mongoose = require('mongoose'),
  Categories = mongoose.model('Categories'),
  Products = mongoose.model('Products'),
  jwt = require('jsonwebtoken'),
  config = require('../../config');


exports.list_all_categories = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    Categories.find({}, function(err, category) {
      if (err)
        res.send(err);
      res.json(category);
    });
  });
};


exports.create_a_category = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    var new_category = new Categories(req.body);
    new_category.save(function(err, category) {
      if (err)
        res.send(err);

      res.json(category);
    });
  });
};


exports.read_a_category = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    Categories.findById(req.params.categoryId, function(err, category) {
      if (err)
        res.send(err);
      res.json(category);
    });
  });
};


exports.update_a_category = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    Categories.findOneAndUpdate({_id: req.params.categoryId}, req.body, {new: true}, function(err, category) {
      if (err)
        res.send(err);
      res.json(category);
    });
  });
};


exports.delete_a_category = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    Products.remove({
      category: req.params.categoryId
    }, function(err, product) {
      if (err)
        res.send(err);
    });
    Categories.remove({
      _id: req.params.categoryId
    }, function(err, category) {
      if (err)
        res.send(err);
      res.json({ message: 'Categories successfully deleted with all products associated.' });
    });
  });
};
