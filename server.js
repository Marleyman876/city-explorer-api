'use strict';
require('dotenv').config();
// const { response } = require('express');
const express = require('express'); 
const superagent = require('superagent');
 
const cors = require('cors');
const { response } = require('express');

const app = express(); //always required 
app.use(cors());

// const weatherData = require('./data/weather.json')

require ('dotenv').config(); //needed to run .env file 

const PORT = process.env.PORT || 3001; // if 3002 is unavailable use 3001c 

app.get('/city_weather', (request, response) =>{
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
  .query({
    key:process.env.WEATHER_API_KEY,
    lat:request.query.lat,
    lon:request.query.lon,
  })
  .then (weatherData => {
    response.json(weatherData.body.data.map(day => new DailyForecast(day)));

  })
  
});

app.get('/movies', (request,response) => {
  let citySearched = request.query.city;
  superagent.get('https://api.themoviedb.org/3/search/movie')
  .query({
    api_key:process.env.MOVIE_API_KEY,
    query:`${citySearched}`,
    
  })
  .then(movieData => {
    response.json(movieData.body.results.map(movie =>new Film(movie)));
  })
  .catch(error => {
   // handleError(error, response)
   console.log(error);
  });
});



function Film(movie){
  this.title = movie.title;
  this.votes = movie.vote_average;
  this.vote_count = movie.vote_count;
  this.poster_path = movie.poster_path;
  this.popularity = movie.popularity; 
  this.release_date = movie.release_date;
}

function DailyForecast(day){
  this.date = day.valid_date;
  this.description = day.weather.description;

}

// const mapOverdata = () => {
//  return weatherData.data.map(item =>{
//     return new DailyForecast(item)
//   })
// }


function handleError(error,response){
  response.status(500).send('Status Code 500: Internal Serve Error!');
} 

app.listen (PORT,() => console.log(`Server is listening on port ${PORT}`)); 