const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static('static'));

// Endpoint 1: Calculate the total price of items in the cart
function firstendpoint(newItemPrice, cartTotal) {
  let total = newItemPrice + cartTotal;
  return total.toString();
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(firstendpoint(newItemPrice, cartTotal));
});

// Endpoint 2 : Apply a discount based on membership status

function secondendpoint(cartTotal, isMember) {
  let discountpercentage = 0.1;
  if (isMember == 'true') {
    return (cartTotal * (1 - discountpercentage)).toString();
  }
  return cartTotal.toString();
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;

  res.send(secondendpoint(cartTotal, isMember));
});

// Endpoint 3 : Calculate tax on the cart total

function thirdendpoint(cartTotal) {
  let taxrate = 5;
  return ((cartTotal * taxrate) / 100).toString();
}
app.get('/calculate-tax', (req, res) => { 
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(thirdendpoint(cartTotal));
});

// Endpoint 4 : Estimate delivery time based on shipping method

function fourthendpoint(shippingMethod, distance) {
  if (shippingMethod.toLowerCase() === 'express') {
    return (distance / 100).toString();
  }
  return (distance / 50).toString();
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(fourthendpoint(shippingMethod, distance));
});

// Endpoint 5 : Calculate the shipping cost based on weight and distance

function fivthendpoint(weight, distance) {
  return (weight * distance * 0.1).toString();
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(fivthendpoint(weight, distance));
});

// Endpoint 6 : Calculate loyalty points earned from a purchase

function sixthendpoint(purchaseAmount) {
  return (purchaseAmount*2).toString();
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(sixthendpoint(purchaseAmount));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
