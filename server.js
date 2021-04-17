'use strict';
require('dotenv').config();
// const { response } = require('express');
const express = require('express'); 
const superagent = require('superagent');

const cors = require('cors');

const app = express(); //always required 
app.use(cors());

// const weatherData = require('./data/weather.json')

require ('dotenv').config(); //needed to run .env file 

const PORT = process.env.PORT || 3001; // if 3002 is unavailable use 3001c 

app.get('/city_weather', (request, response) =>{
  //console.log(request.query);
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
  .query({
    key:process.env.WEATHER_API_KEY,
    lat:request.query.lat,
    lon:request.query.lon,
  })
  .then (weatherData => {
    response.json(weatherData.body.data.map(day => new DailyForecast(day)));

  })
  //response.status(200).send('you got a response');
});

//use request to do back end API call for weather from front end API call... 
//when using axios in front end and looking for data in super agent look for .body so AXIOS IS date SUper Agent is BODY. 


function DailyForecast(day){
  this.date = day.valid_date;
  this.description = day.weather.description;

}

const mapOverdata = () => {
 return weatherData.data.map(item =>{
    return new DailyForecast(item)
  })
}

// app.get('./city-explorer', (request, respone) =>{
//   to get request and send response 
//   response.send('hello World!');
// })

app.listen (PORT,() => console.log(`Server is listening on port ${PORT}`)); 