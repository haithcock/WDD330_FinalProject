const axios = require('axios');
require('dotenv').config();
const suggestionsData = require('../json/suggestions.json'); // Add this line

const getWeather = async (req, res, next) => {
  try {
    const { location } = req.body;

    // Geocode location (OpenCage API)
    const geocodeResponse = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${process.env.OPENCAGE_API_KEY}`
    );

    if (!geocodeResponse.data.results.length) {
      throw new Error('Location not found');
    }

    const { lat, lng } = geocodeResponse.data.results[0].geometry;
    const coordinates = `${lat},${lng}`;

    // Get current weather
    const weatherResponse = await axios.get(
      `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${coordinates}`
    );

    if (weatherResponse.data.error) {
      throw new Error(weatherResponse.data.error.info);
    }

    // Generate packing suggestions - NEW CODE STARTS HERE
    const current = weatherResponse.data.current;
    const packingSuggestions = [];

    // Temperature-based suggestions
    if (current.temperature < 0) {
      packingSuggestions.push(suggestionsData.temperature.freezing);
    } else if (current.temperature < 10) {
      packingSuggestions.push(suggestionsData.temperature.cold);
    } else if (current.temperature < 20) {
      packingSuggestions.push(suggestionsData.temperature.moderate);
    } else {
      packingSuggestions.push({
        items: ["T-shirt", "Shorts", "Sun hat"],
        reason: "Warm weather"
      });
    }

    // Precipitation-based suggestions
    const description = current.weather_descriptions[0].toLowerCase();
    if (description.includes('rain') || description.includes('shower')) {
      packingSuggestions.push(suggestionsData.precipitation.rain);
    } else if (description.includes('snow') || description.includes('sleet')) {
      packingSuggestions.push(suggestionsData.precipitation.snow);
    }

    // UV-based suggestions
    if (current.uv_index > 6) {
      packingSuggestions.push(suggestionsData.uv.high);
    }
    // NEW CODE ENDS HERE

    // Render results
    res.render('weather', {
      location,
      current: weatherResponse.data.current,
      packing: packingSuggestions, // Pass suggestions to view
      coordinates: { lat, lng }
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { getWeather };