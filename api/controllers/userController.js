'use strict';


var mongoose = require('mongoose'),
  Users = mongoose.model('Users'),
  jwt = require('jsonwebtoken'),
  config = require('../../config');


exports.list_all_users = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    Users.find({}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  });
};


exports.create_a_user = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    var new_user = new Users(req.body);
    new_user.save(function(err, user) {
      if (err)
        res.send(err);

      res.json(user);
    });
  });
};


exports.read_a_user = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    Users.findById(req.params.userId, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  });
};


exports.update_a_user = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    Users.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  });
};


exports.delete_a_user = function(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    Users.remove({
      _id: req.params.userId
    }, function(err, user) {
      if (err)
        res.send(err);
      res.json({ message: 'Users successfully deleted' });
    });
  });
};
