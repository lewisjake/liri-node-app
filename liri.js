// required libraries
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var moment = require('moment');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

