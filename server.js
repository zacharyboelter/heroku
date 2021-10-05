

// ===========================================================
// DEPENDENCIES 
// ===========================================================
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/products.js');
const methodOverride = require('method-override');
// ===========================================================
// PORT
// ===========================================================
// Allow use of Heroku's port or your own local port, depending on the environment
// const PORT = process.env.PORT || 3000;

// ===========================================================
// DATABASE
// ===========================================================
// How to connect to the database either via heroku or locally
const db = mongoose.connection;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }
);






mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});






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
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
// app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// ===========================================================
// SEED DATA 
// ===========================================================
app.get('/products/seed', (req, res) => {
  Product.create(
    [
      {
        name: 'Vinedos La Consulta Adelante Malbec',
        description: 'Extremely popular, Argentinian Malbec is an inky, medium-bodied, dry red wine with strong impressions of dark fruits on the nose and palate. This wine tends to have mellower tannins than its French counterpart.',
        variety: 'Malbec',
        img: 'https://i.imgur.com/IpzO6Ae.jpg',
        price: 15
      }, {
        name: '"So Far Out" Chillable Red',
        description: 'Chillable, sustainably and organically farmed, flavorful dark red fruits, herbs, forest floor, spicy, aromatic, fresh, beguiling.',
        variety: 'malbec',
        img: 'https://i.imgur.com/j9Puc1e.jpg',
        price: 25
      }, {
        name: 'Domaine de la Patience Rouge',
        description: 'Natural. Organic. Chillable. Dry. Fresh. Juicy. Minerally. Dark red fruit.',
        variety: 'carignan',
        img: 'https://i.imgur.com/L0psJwn.jpg',
        price: 13
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
app.get('/products', (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render('index.ejs', {
      products: allProducts,
    });
  });
});


// ===========================================================
// NEW - display form to add a product
// ===========================================================
app.get('/products/new', (req, res) => {
  res.render('new.ejs');
});




// ===========================================================
// DELETE - delete a single product
// ===========================================================
app.delete('/products/:id', (req, res) => {
  Product.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect('/products');
  });
});

// ===========================================================
// UPDATE - update a single product
// ===========================================================
app.put('/products/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedProduct) => {
    res.redirect(`/products/${req.params.id}`);
  });
});

// ===========================================================
// CREATE - create a new product
// ===========================================================
app.post('/products', (req, res) => {
  Product.create(req.body, (error, createdProduct) => {
    res.redirect('/products');
  });
});

// ===========================================================
// EDIT - display form to edit a product
// ===========================================================
app.get('/products/:id/edit', (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render('edit.ejs', {
      product: foundProduct
    });
  });
});

// ===========================================================
// SHOW - display a single product
// ===========================================================

app.get('/products/:id', (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render('show.ejs', {
      product: foundProduct,
    });
  });
});

// ===========================================================
// LISTENER
// ===========================================================
const PORT = process.env.PORT;
app.listen(PORT, () => console.log('express is listening on:', PORT));


