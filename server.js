var mongoose = require('mongoose'),
  express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  User = require('./api/models/userModel'),
  Category = require('./api/models/categoryModel'),
  Product = require('./api/models/productModel'),
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/eCommerceApiDb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//register the routes
var userRoutes = require('./api/routes/userRoutes'); //importing route
var authRoutes = require('./api/routes/authRoutes'); //importing route
var productRoutes = require('./api/routes/productRoutes'); //importing route
var categoryRoutes = require('./api/routes/categoryRoutes'); //importing route
userRoutes(app);
authRoutes(app);
categoryRoutes(app);
productRoutes(app);


app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('e-commerce RESTful API server started on: ' + port);
