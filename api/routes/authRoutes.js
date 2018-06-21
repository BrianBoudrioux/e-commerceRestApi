'use strict';
module.exports = function(app) {
  var auth = require('../controllers/authController');

  // auth Route
  app.route('/connect')
    .post(auth.connect);
};
