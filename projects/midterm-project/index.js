const express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var dataUtil = require("./data-util");
var _ = require("underscore");
const logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const exphbs = require('express-handlebars');
var handlebars = exphbs.handlebars;
const restaurantRoutes = express.Router();
const PORT = 3000;

let Restaurant = require('./restaurant.model');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

// Connect to MongoDB
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});
mongoose.connection.on('open', function(e){
    console.log("Connection Successful");

})

var _DATA = dataUtil.loadData().restaurant_list;

app.get("/", function(req, res) {
    var tags = dataUtil.getAllTags(_DATA);
    res.render('home', {
        data: _DATA,
        tags: tags
    });
});

app.get("/api/getRestaurants", function(req, res) {
    res.send(_DATA);
});

function find(name) {
    res.redirect("/find/name/"+name);
}

//Get the restaurant by the name
app.get("/find/name/:name", function(req, res) {
	var tags = dataUtil.getAllTags(_DATA);
    var name = req.params.name;
    console.log("Name: " + name );
    var disp = [];
    _DATA.forEach(function(restaurant) {
        if (restaurant.name.includes(name)) {
            disp.push(restaurant);
        }
    });
    res.render('home', {
        name: name,
        data: disp,
        tags: tags
    });
});

app.get('/add', function(req, res) {
	console.log("Hello")
	res.render('add');
})


//create a restaurant by the name
app.post('/add', function(req, res) {
    var body = req.body;

    body.name = body.name;
    body.location = body.location;
    body.price = parseInt(body.price);
    body.tags = body.tags;
    console.log("Body.Stars: " + body.stars);
    body.stars = body.stars;
    body.author = body.author;
    body.comment = body.review;
   
    _DATA.push(req.body);
    console.log(_DATA);
    dataUtil.saveData(_DATA);
    res.redirect("/");
    
});

app.post('/add/:name/location/:location/price/:price/tags/:tags/stars/:stars/author/:author/comment/:comment', function(req, res){
    var _name = req.params.name;
    var _location = req.params.location;
    var _price = parseInt(req.params.price);
    var _tags = req.params.tags.split("_");
    var _stars = parseInt(req.params.stars);
    var _author = req.params.author;
    var _comment = req.params.comment;

    var restaurant = new Restaurant({
        name: _name,
        location: _location,
        price: _price,
        tags : _tags,
        stars : _stars,
        author: _author,
        comment : _comment
    });

    _DATA.push(restaurant);
    dataUtil.saveData(_DATA);
    res.redirect("/");
});

//Sorting Through By Pricepoint
app.get("/price/:price", function(req, res) {
	var tags = dataUtil.getAllTags(_DATA);
    var price = parseInt(req.params.price);
    var disp = [];
    _DATA.forEach(function(restaurant) {
        if (restaurant.price == (price)) {
            disp.push(restaurant);
        }
    });
    res.render('home', {
        price: price,
        data: disp,
        tags: tags
    });
});

//Sort Through Tag
app.get('/tag/:tag', function(req, res) {
    var tags = dataUtil.getAllTags(_DATA);
    var tag = req.params.tag;
    var disp = [];
    _DATA.forEach(function(restaurant) {
        if (restaurant.tags.includes(tag)) {
            disp.push(restaurant);
        }
    });
    res.render('home', {
        tag: tag,
        data: disp,
        tags: tags
    });
});

app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
