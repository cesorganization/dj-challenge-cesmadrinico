require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.WEATHERBIT_API_KEY;
const baseUrl = process.env.WEATHERBIT_BASE_URL;

async function getCurrentWeatherByLatLon(lat, lon) {
  const response = await axios.get(`${baseUrl}/current`, {
    params: { lat, lon, key: apiKey }
  });
  return response.data;
}

async function getCurrentWeatherByPostCode(postalCode, country = 'US') {
  const response = await axios.get(`${baseUrl}/current`, {
    params: { postal_code: postalCode, country, key: apiKey }
  });
  return response.data;
}

module.exports = {
  getCurrentWeatherByLatLon,
  getCurrentWeatherByPostCode,
};