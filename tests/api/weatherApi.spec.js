require('module-alias/register');
const { test, expect } = require('@playwright/test');
const {
  getCurrentWeatherByLatLon,
  getCurrentWeatherByPostCode
} = require('@helpers/weatherApi');

test.describe('Weatherbit Current Weather API Regression', () => {
  const latLonLocations = [
    { lat: 48.8566, lon: 2.3522, name: 'Paris' },
    { lat: 40.7128, lon: -74.0060, name: 'New York' },
  ];

  const postCodes = [
    { postal_code: '75001', country: 'FR', name: 'Paris' },
    { postal_code: '10001', country: 'US', name: 'New York' },
  ];

  test('AC1 - Get current weather by Lat/Lon', async () => {
    for (const { lat, lon, name } of latLonLocations) {
      console.log(`\n===== 🌍 [LAT/LON] Testing ${name} (Lat: ${lat}, Lon: ${lon}) =====`);

      const data = await getCurrentWeatherByLatLon(lat, lon);
      expect(data).toHaveProperty('data');
      const weather = data.data[0];

      if (!weather) {
        console.warn(`⚠️ No weather data returned for ${name}`);
        continue;
      }

      console.log(`✅ City: ${weather.city_name}`);
      console.log(`🌡️ Temp: ${weather.temp}°C`);
      console.log(`☁️ Conditions: ${weather.weather?.description}`);

      // ✅ Raw response
      console.log(`📦 Raw response:\n${JSON.stringify(data, null, 2)}`);

      expect(weather).toHaveProperty('city_name');
    }
  });

  test('AC2 - Get current weather by Postcode', async () => {
    for (const { postal_code, country, name } of postCodes) {
      console.log(`\n===== 📬 [POSTCODE] Testing ${name} (Postcode: ${postal_code}, Country: ${country}) =====`);

      const data = await getCurrentWeatherByPostCode(postal_code);
      expect(data).toHaveProperty('data');
      const weather = data.data[0];

      if (!weather) {
        console.warn(`⚠️ No weather data returned for ${name}`);
        continue;
      }

      console.log(`✅ City: ${weather.city_name}`);
      console.log(`🌡️ Temp: ${weather.temp}°C`);
      console.log(`☁️ Conditions: ${weather.weather?.description}`);

      // ✅ Raw response
      console.log(`📦 Raw response:\n${JSON.stringify(data, null, 2)}`);

      expect(weather).toHaveProperty('city_name');
    }
  });
});