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
var spotifyTest = process.env.SPOTIFY_ID
 
fs.appendFile('log.txt', command + ",", function(err) {
    if (err) throw err;
});

// swtich command to gather the input from the user. if user entry is error, display message
switch (command) {
    case "concert-this": // BandsInTown
    searchBIT(searchTerm);
    break;
    
    case "spotify-this-song": // Spotify
    searchThisSong(searchTerm);
    break;
    
    case "movie-this": // OMDB
    movieThis(searchTerm);
    break;

    case "do-what-it-says": // Random.txt
    doRandom();
    break;
}


