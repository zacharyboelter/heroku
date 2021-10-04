require('dotenv').config()

// ===========================================================
// DEPENDENCIES 
// ===========================================================
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
// ===========================================================
// PORT
// ===========================================================
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

// ===========================================================
// DATABASE
// ===========================================================
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

// ===========================================================
// MIDDLEWARE
// ===========================================================
//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// ===========================================================
// SEED DATA 
// ===========================================================
app.get('/products/seed', (req, res) => {
  Product.create(
    [
      {
        name: 'Beans',
        description: 'A small pile of beans. Buy more beans for a big pile of beans.',
        img: 'https://imgur.com/LEHS8h3.png',
        price: 5,
        qty: 99
      }, {
        name: 'Bones',
        description: 'It\'s just a bag of bones.',
        img: 'https://imgur.com/dalOqwk.png',
        price: 25,
        qty: 0
      }, {
        name: 'Bins',
        description: 'A stack of colorful bins for your beans and bones.',
        img: 'https://imgur.com/ptWDPO1.png',
        price: 7000,
        qty: 1
      }
    ]
    ,
    (error, data) => {
      res.redirect('/products');
    }
  );
});

// ===========================================================
// ROUTES
// ===========================================================

// ===========================================================
// INDEX - Display all products
// ===========================================================


// ===========================================================
// NEW - display form to add a product
// ===========================================================


// ===========================================================
// DELETE - delete a single product
// ===========================================================


// ===========================================================
// UPDATE - update a single product
// ===========================================================


// ===========================================================
// CREATE - create a new product
// ===========================================================


// ===========================================================
// EDIT - display form to edit a product
// ===========================================================


// ===========================================================
// SHOW - display a single product
// ===========================================================

app.get('/', (req, res) => {
  res.send('Wine store ~~ Now Open!');
});

// ===========================================================
// LISTENER
// ===========================================================
app.listen(PORT, () => console.log('express is listening on:', PORT));