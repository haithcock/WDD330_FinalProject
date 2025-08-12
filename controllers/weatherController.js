// controllers/weatherController.js
const axios = require('axios');
require('dotenv').config();

const getWeather = async (req, res, next) => {
  try {
    const { location } = req.body;

    // 1. Geocode location (OpenCage API)
    const geocodeResponse = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${process.env.OPENCAGE_API_KEY}`
    );

    if (!geocodeResponse.data.results.length) {
      throw new Error('Location not found');
    }

    const { lat, lng } = geocodeResponse.data.results[0].geometry;

    // 2. Get weather (Weatherstack API)
    const weatherResponse = await axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${lat},${lng}`
    );

    if (weatherResponse.data.error) {
      throw new Error(weatherResponse.data.error.info);
    }

    // 3. Render results
    res.render('weather', {
      location,
      weather: weatherResponse.data.current,
      coordinates: { lat, lng }
    });

  } catch (err) {
    next(err); // Pass to error middleware
  }
};

module.exports = { getWeather };