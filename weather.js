require('dotenv').config();
const superagent = require('superagent');

fetchWeather = (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    .query({
      key: process.env.WEATHER_API_KEY,
      lat: request.query.lat,
      lon: request.query.lon,
      
    })
    .then(weatherData => {
      console.log(weatherData);

      response.json(weatherData.body.data.map(day => new DailyForecast(day)));

    })

};

function DailyForecast(day) {
  this.date = day.valid_date;
  this.description = day.weather.description;

}

module.exports = fetchWeather;
