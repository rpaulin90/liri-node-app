# liri-node-app

This command line application can accept any of four arguments: my-tweets, spotify-this-song, movie-this, or do-what-it-says.

These arguments will all log different things on the terminal/bash window

# my-tweets

example of use: node liri.js my-tweets

This will show my last 20 tweets (or all my tweets if I have less than 20) and when they were created.

# spotify-this-song 

example of use: node liri.js sporify-this-song Yellow Submarine

This will show the following information about the song

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from

Because there can be multiple songs with the same name, the program will return 20 results and hopefully the song you are looking for will be within that list.

if no song is provided then your program will default to

"The Sign" by Ace of Base

# movie-this

example of use: node liri.js movie-this deadpool

This will output the following information to your terminal/bash window:

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
  * Rotten Tomatoes URL.
  
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

# do-what-it-says

example of use: node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

# Logging datat in log.txt

In addition to logging the data to your terminal/bash window, LIRI will output the data to a .txt file called log.txt everytime a command is run.

