const express = require('express');
const hbs = require('hbs');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
})

app.get('/movieInfo', (req, res) => {
  const title = req.query.title;
  const apiKey = "a594b0af"
  axios.get(`http://omdbapi.com/?apikey=${apiKey}&t=${title}`)
    .then((response) => {
      const poster = response.data.Poster;
      const genre = response.data.Genre;
      const released = response.data.Released;
      const runtime = response.data.Runtime;
      const imdbRating = response.data.imdbRating;
      const website = response.data.Website;
      res.send({poster, genre, released, runtime, imdbRating, website});
    })
    .catch((response) => {
      res.send({});
    })
})

app.listen("3000", () =>{
  console.log("Listening on port 3000");
})

// have to let heroku set the port
