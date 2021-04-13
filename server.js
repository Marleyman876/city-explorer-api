'use strict';
require('dotenv').config();
// const { response } = require('express');
const express = require('express'); //always required for building servers 
const cors = require('cors');

const app = express(); //always required 
app.use(cors());

const weatherData = require('./data/weather.json')

require ('dotenv').config(); //needed to run .env file 

const PORT = process.env.PORT || 3001; // if 3002 is unavailable use 3001c 

app.get('/city_weather', (request, response) =>{
  //to get request and send response 
  
  response.json(mapOverdata());
});

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