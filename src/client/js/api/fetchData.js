/// Fetching api from different end points.
async function getGeonames(enteredString, username) {
  const url = `http://api.geonames.org/searchJSON?name=${enteredString}&maxRows=1&username=${username}`;
  return await fetch(url);
}

async function getCurrentWeather(lat, lon, key) {
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${key}`;
  return await fetch(url);
}

async function getForecastWeather(lat, lon, key) {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=7&key=${key}`;
  return await fetch(url);
}

async function getPixabay(q, key) {
  const url = `https://pixabay.com/api/?key=${key}&q=${q}&image_type=photo&category=places`;
  return await fetch(url);
}

export { getGeonames, getCurrentWeather, getForecastWeather, getPixabay };
