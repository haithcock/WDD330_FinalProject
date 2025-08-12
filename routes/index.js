// routes/index.js
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// Home route
router.get('/', (req, res) => {
  res.render('index');
});

// Weather search route
router.post('/search', weatherController.getWeather);

module.exports = router;