# liri-node-app
This app uses a switch case statement that uses the following commands to be ran with node.js.

All commands will begin with: node liri, followed by a command.

'Commands': (' ' symbols are used to separate commands)

'concert-this ' with the user entering an artists name after the command. This command calls the Bands In Town API and returns an object with the venue name, venue location, and the nearest date of their next concert. The concert-this command has a function built in that will send the user an error if the value the user input is invalid.

'spotify-this-song' with the user entering a song title after the command. This command calls the Spotify API and returns an object with the artists name, the name of the track, a preview of the song, and the title of the album. This command uses an if/else statement that checks the users input. If the user input is invalid, it will return an error message and display a default song. 

'movie-this' with the user entering the title of a movie after the command. This command calls the OMDB API and returns an object with the title, year it released, an imdb rating, a rotten tomatoes rating, the country it was released in, the language of origin, a short summary of the plot, and the actors that starred in it. If the user input is invalid, an error message will display as well as a default movie.

'do-what-it-says' this command calls to the random.txt file and returns the data that is written in the file. In this case it calls the spotify-this-song command and the following song title.

Packages used include: 'dotenv', 'require fs', './keys.js', 'moment', 'axios', and 'node-spotify-api'.

The fs.appendFile is used to log the search data into a textFile. 

++++The working app is showcased in the images folder in the liri-node-app page of this repo.++++
