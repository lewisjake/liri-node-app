// required libraries
require("dotenv").config();
var fs = require("fs");
const keys = require("./keys.js");
var moment = require('moment');
var axios = require("axios");
const Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
let command = process.argv[2];
let searchTerm = process.argv.splice(3).join(" ");
 
fs.appendFile('log.txt', command + ",", function(err) {
    if (err) throw err;
});

// swtich command to gather the input from the user. 
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
function searchBandsInTown(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function (response) {
    // console.log(response);
    console.log("\n----------------------------------\n");
    console.log("Name of the venue:", response.data[0].venue.name);
    console.log("Venue location:", response.data[0].venue.city);
    var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
    console.log("Date of the Event:", eventDate);
    console.log("\n----------------------------------\n");
    })
    .catch(function (error) {
    console.log(error);
    });
  }

function spotifyThisSong(song) {
    spotify
    .search({ type: 'track', query: song })
    .then(function(response){
        if (response.tracks.total === 0) {
            errorConditionForSpotify();
        } else {
        console.log("\n----------------------------------\n");
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Track: " + response.tracks.items[0].name);
        console.log("Preview URL: " + response.tracks.items[0].preview_url);
        console.log("Album: " + response.tracks.items[0].album.name);
        console.log("\n----------------------------------\n");
        }
    });
}

function errorConditionForSpotify() {
    spotify
    .search({ type: 'track', query: 'The Sign' })
    .then(function(response) {
        for (var i = 0;i < response.tracks.items.length; i++) {
            if (response.tracks.items[i].artists[0].name === "Ace of Base") {
            console.log("\n----------------------------------\n");
            console.log("Error, no results found. This is the default song.");
            console.log("Artist: " + response.tracks.items[i].artists[0].name);
            console.log("Track: " + response.tracks.items[i].name);
            console.log("Preview URL: " + response.tracks.items[i].preview_url);
            console.log("Album: " + response.tracks.items[i].album.name);
            console.log("\n----------------------------------\n");
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
            console.log("\n----------------------------------\n");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("imdbRating:: " + response.data.imdbRating);
            console.log("RottenTomatoes: " + response.data.tomatoRating);
            console.log("Country:: " + response.data.Country);
            console.log("Language:: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("\n----------------------------------\n");
            } 
            else {
                console.log("\n----------------------------------\n");
                movieThis("Mr. Nobody");
                console.log("Error, no results found. This is the default movie.");
                console.log("\n----------------------------------\n");
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


    
