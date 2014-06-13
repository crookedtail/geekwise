module.exports = function(app) {

	//REQUIRED DEPENDENCIES
	// Require mongoose dependency
	var mongoose = require('mongoose');
	/* Add the dependency to passport after the mongoose require decleration */
	var passport = require('passport');

	/* ======================= server routes ====================== */
	// handle things like api calls
	// authentication routes

	// product api route
	// the url that can access the following function
	app.get('/api/product/:productId', function(req, res) {
		// use mongoose to get a product in the database by guid
		mongoose.model('Product').findOne({guid: req.params.productId}, function(err, product) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err);

			res.send(product); // return the product object in JSON format
		});
	});


	// products api route
	app.get('/api/products', function(req, res) {

		//Day 8
		var params = {};

		//checking for featured=true/false
		if(req.query.featured !== undefined) {
			params.isFeatured = req.query.featured;
		}

		mongoose.model('Product').find(params, function(err, products) {
			if (err) 
				res.send(err);

			res.send(products); // return all the products in JSON format
		});
	});

	//DAY 7
	// featured products api route
	/*app.get('/api/featured', function(req, res) {
	mongoose.model('Product').find({isFeatured: true}, function(err, featured) {
	if (err) 
	res.send(err);

	res.send(featured);
	});
	});*/

	//  DAY 10
	/* Add the following routes after the products routes */
	// logout API route
	app.get('/api/logout', function(req, res, next) {
		req.logout();
		res.send(200);
	});

	// login API route
	app.post('/api/login', passport.authenticate('local'), function(req, res) {
		res.cookie('user', JSON.stringify(req.user));
		res.send(req.user);
	});

	// signup API route
	app.post('/api/signup', function(req, res, next) {
		var User = mongoose.model('User');
		var user = new User({
			email: req.body.email,
			password: req.body.password
		});
		user.save(function(err) {
			if (err) return next(err);
			res.send(200);
		});
	});

	/* ========================= frontend routes ======================= */
	// route to handle all angular requests not already specified and point them 
	// to the public site
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load our public/index.html file
	});

};
