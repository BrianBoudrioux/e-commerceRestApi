'use strict';


var mongoose = require('mongoose'),
  Products = mongoose.model('Products'),
  jwt = require('jsonwebtoken'),
  config = require('../../config');


exports.list_all_products = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      Products.find({}, function(err, product) {
      if (err)
        res.send(err);
      res.json(product);
    });
  });
};

exports.list_all_products_by_category = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      Products.find({category: req.params.categoryId}, function(err, product) {
      if (err)
        res.send(err);
      res.json(product);
    });
  });
};

exports.create_a_product = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    var new_product = new Products(req.body);
    new_product.save(function(err, product) {
      if (err)
        res.send(err);

      res.json(product);
    });
  });
};

exports.read_a_product = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    Products.findById(req.params.productId, function(err, product) {
      if (err)
        res.send(err);
      res.json(product);
    });
  });
};

exports.update_a_product = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    Products.findOneAndUpdate({_id: req.params.productId}, req.body, {new: true}, function(err, product) {
      if (err)
        res.send(err);
      res.json(product);
    });
  });
};

exports.delete_a_product = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    Products.remove({
      _id: req.params.productId
    }, function(err, product) {
      if (err)
        res.send(err);
      res.json({ message: 'Categories successfully deleted' });
    });
  });
};

exports.delete_all_products_by_category = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    Products.remove({
      category: req.params.categoryId
    }, function(err, product) {
      if (err)
        res.send(err);
      res.json({ message: 'Categories successfully deleted' });
    });
  });
};
