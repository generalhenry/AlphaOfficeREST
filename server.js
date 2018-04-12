'use strict';

const express = require('express');
const productCatalog = require('./product-catalog');

const port = process.env.PORT || 8002;
const app = express();

app.get('/', function(req, res) {
  res.sendFile('./index.html', { root: __dirname });
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/*
 * route /products has been replaced in this example with static JSON data
 */

app.get('/products', function(req, res) {
  console.log('/products api called');
  res.json(productCatalog);
});

app.get('/searchProductNames', function(req, res) {
  console.log('/productNames api called');
  res.json(
    productCatalog.Products
      .filter(product => product.PRODUCT_NAME.includes(req.query.term))
      .map(
        product => (({PRODUCT_NAME, PRODUCT_ID}) => ({PRODUCT_NAME, PRODUCT_ID}))(product)
      ));
});

app.get('/productNames', function(req, res) {
  console.log('/productNames api called');
  res.json(
    productCatalog.Products.map(
      product => (({PRODUCT_NAME, PRODUCT_ID}) => ({PRODUCT_NAME, PRODUCT_ID}))(product)
    ));
});

app.get('/product/:id', function(req, res) {
  console.log('/product api called');
  res.json(
    productCatalog.Products.filter(product =>
      product.PRODUCT_ID == req.params.id
    ));
});

app.listen(port, function() {
  console.log('AlphaOffice listening on port', port);
});