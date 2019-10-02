// required libraries
require("dotenv").config();
var fs = require("fs");
const keys = require("./keys.js");
var moment = require('moment');
var axios = require("axios");
const Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let command = process.argv[2];
let searchTerm = process.argv[3];
 
fs.appendFile('log.txt', command + ",", function(err) {
    if (err) throw err;
});

// swtich command to gather the input from the user. if user entry is error, display message
switch (command) {
    case "concert-this": // BandsInTown
    searchBandsInTown(searchTerm);
    break;
    
    case "spotify-this-song": // Spotify
    spotifyThisSong(searchTerm);
    break;
    
    case "movie-this": // OMDB
    movieThis(searchTerm);
    break;

    case "do-what-it-says": // Random.txt
    doRandom();
    break;
}
function spotifyThisSong(song) {
    spotify
    .search({ type: 'track', query: song })
    .then(function(response){
        if (response.tracks.total === 0) {
            errorConditionForSpotify();
        } else {
            console.log("Artist: " + response.tracks.items[0].artists[0].name);
            console.log("Track: " + response.tracks.items[0].name);
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
        }
    });
}

function errorConditionForSpotify() {
    spotify
    .search({ type: 'track', query: 'The Sign' })
    .then(function(response) {
        for (var i=0;i < response.tracks.items.length; i++) {
            if (response.tracks.items[i].artists[0].name === "Ace of Base") {
                console.log("Error, no results found. This is the default song.");
                console.log("Artist: " + response.tracks.items[i].artists[0].name);
                console.log("Track: " + response.tracks.items[i].name);
                console.log("Preview URL: " + response.tracks.items[i].preview_url);
                console.log("Album: " + response.tracks.items[i].album.name);
                i = response.tracks.items.length;
            }
        }
    });
  }

  function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function(response) {
            //console.log(response.data);
            if (response.data.Title != undefined) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("imdbRating:: " + response.data.imdbRating);
                console.log("RottenTomatoes: " + response.data.tomatoRating);
                console.log("Country:: " + response.data.Country);
                console.log("Language:: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            } 
            else {
                movieThis("Mr. Nobody");
                console.log("Error, no results found. This is the default movie.");
            }
        });
      
        }       
  
      function doRandom() {
        fs.readFile("random.txt", "utf8", function(error, data) {
            var dataArr = data.split(",");
            spotifyThisSong(dataArr[1])
            // If the code experiences any errors it will log the error to the console.
            if (error) {
              return console.log(error);
            }
        });
      }



