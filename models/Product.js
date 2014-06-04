//NEEDS TO INCLUDED IN THE SERVER.JS

// Require mongoose dependency
var mongoose = require('mongoose');

// Grab a referrence to the Schema
var Schema = mongoose.Schema;

// Create a new product schema
//json object

var productSchema = new Schema({
	guid: String,
	title: String,
	isFeatured: Boolean,
	isSpecial: Boolean
});

// Register the Product model and schema with mongoose
mongoose.model('Product', productSchema);