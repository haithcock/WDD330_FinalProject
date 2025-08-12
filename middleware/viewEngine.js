// middleware/viewEngine.js
const path = require('path');
const express = require('express');

module.exports = (app) => {
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');
};