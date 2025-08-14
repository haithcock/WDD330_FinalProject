const axios = require('axios');
require('dotenv').config();

//=========================================================

const generatePackingSuggestions = (current, forecast) => {
  const suggestions = [];
  
  // 1. Temperature-based suggestions
  if (current.temperature < 5) {
    suggestions.push({ item: "Heavy winter coat", reason: "Freezing temperatures" });
  } else if (current.temperature < 15) {
    suggestions.push({ item: "Light jacket", reason: "Cool weather" });
  } else if (current.temperature > 25) {
    suggestions.push({ item: "Sunscreen", reason: "Hot weather" });
    suggestions.push({ item: "Hat", reason: "Sun protection" });
  }

  // 2. Precipitation-based suggestions
  if (current.precip > 2 || forecast.some(day => day.precipitation > 2)) {
    suggestions.push({ item: "Umbrella", reason: "Rain expected" });
    suggestions.push({ item: "Waterproof shoes", reason: "Wet conditions" });
  }

  // 3. Activity-based suggestions
  if (current.uv_index > 6) {
    suggestions.push({ item: "Sunglasses", reason: "High UV index" });
  }
  if (forecast.some(day => day.maxwind > 20)) {
    suggestions.push({ item: "Windbreaker", reason: "Windy conditions" });
  }

  // 4. Special cases
  if (forecast.some(day => day.condition.toLowerCase().includes("snow"))) {
    suggestions.push({ item: "Winter boots", reason: "Snow expected" });
  }
  if (current.humidity > 80) {
    suggestions.push({ item: "Moisture-wicking clothes", reason: "High humidity" });
  }

  return suggestions;
};

//=========================================================

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
    const coordinates = `${lat},${lng}`;  // Create coordinates string

    // 2. Get weather forecast (Weatherstack API) for 5 days
    const weatherResponse = await axios.get(
      `http://api.weatherstack.com/forecast?access_key=${process.env.WEATHERSTACK_API_KEY}&query=${coordinates}&forecast_days=5`
    );

    if (weatherResponse.data.error) {
      throw new Error(weatherResponse.data.error.info);
    }

    // 3. Process forecast data
    const forecastData = Object.entries(weatherResponse.data.forecast).map(([date, day]) => ({
      date,
      max_temp: day.maxtemp,
      min_temp: day.mintemp,
      avg_temp: day.avgtemp,
      condition: day.condition,
      precipitation: day.totalprecip,
      wind_speed: day.maxwind,
      humidity: day.avghumidity,
      uv_index: day.uv_index,
      sunrise: day.sunrise,
      sunset: day.sunset
    }));

    //==========================================================

    const packingSuggestions = generatePackingSuggestions(
      weatherResponse.data.current, 
      forecastData
    );
    



    //==========================================================

    // 4. Render results with both current and forecast data
    res.render('weather', {
      location,
      current: weatherResponse.data.current,
      forecast: forecastData,
      coordinates: { lat, lng }
    });

  } catch (err) {
    next(err);
  }
};

module.exports = { getWeather };