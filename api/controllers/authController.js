'use strict';


var mongoose = require('mongoose'),
  Users = mongoose.model('Users'),
  jwt = require('jsonwebtoken'),
  passwordHash = require('password-hash'),
  config = require('../../config');


exports.connect = function(req, res) {

  if (req.body.password) {
    Users.findOne({ email: req.body.email }, function(err, user) {
      if (err)
        res.send(err);

      if (user != "" && user != null) {
        var check_pwd = passwordHash.verify(req.body.password, user.password);
        if (check_pwd && user.role === 2) {
          var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
          });

          res.json({ auth: true, token: token });
        }
        else
          res.json({ auth: false, message: "Your email do not match with the specified password or you don't have the right for use this api."})

      }
      else
          res.json({ auth: false, message: "This account do not exist." });

    });
  }
  else
    res.json({ auth: false, message: "You must define your email and password for connecting to this api." });

};
