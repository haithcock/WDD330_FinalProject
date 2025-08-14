// middleware/staticFiles.js
const path = require('path');
const express = require('express');

module.exports = express.static(path.join(__dirname, '../css'));