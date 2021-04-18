'use strict';
require('dotenv').config();
const fetchWeather = require('./weather')
const fetchMovies = require('./movies')
const express = require('express'); 
const superagent = require('superagent');
 
const cors = require('cors');
const { response } = require('express');

const app = express(); //always required 
app.use(cors());

// const weatherData = require('./data/weather.json')


const PORT = process.env.PORT || 3001; // if 3002 is unavailable use 3001c 

 app.get('/city_weather', fetchWeather); 

app.get('/movies', fetchMovies);


function handleError(error,response){
  response.status(500).send('Status Code 500: Internal Serve Error!');
  console.log(handleError);
} 

app.listen (PORT,() => console.log(`Server is listening on port ${PORT}`)); 