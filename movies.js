require('dotenv').config();
const superagent = require('superagent');

fetchMovies = (request,response) => {
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
};


function Film(movie){
  this.title = movie.title;
  this.votes = movie.vote_average;
  this.vote_count = movie.vote_count;
  this.poster_path = movie.poster_path;
  this.popularity = movie.popularity; 
  this.release_date = movie.release_date;
}

module.exports = fetchMovies;