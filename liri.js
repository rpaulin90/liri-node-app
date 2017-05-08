/**
 * Created by rpaulin on 5/8/17.
 */

var Twitter = require('twitter');

var myKeys = require("./keys");

var request = require("request");

var spotify = require('spotify');

var fs = require("fs");

var client = new Twitter(myKeys.twitterKeys);

var params = {screen_name: 'nodejs'};

var argument = process.argv[2];

/// NEED TO STORE ALL ARGUMENTS STARTING ON INDEX 3 TO THEN JOIN THEM INTO A STRING

var argument_array = [];

for(var s = 3; s < process.argv.length; s++){
    argument_array.push(process.argv[s])
}

var argument_name = argument_array.join(" ");

var rotten_tomatoes_url = argument_array.join("_");

/////wrapping everything in a function

var liri = function() {

///// MY-TWEETS LOGIC

    if (argument === "my-tweets") {

        client.get('statuses/user_timeline', function (error, tweets, response) {
            if (!error) {
                if (tweets.length < 20) {
                    for (var x = 0; x < tweets.length; x++) {

                        console.log("Tweet created on " + tweets[x].created_at + " :" + tweets[x].text);

                    }
                }
                else {
                    for (var i = 0; i < 20; i++) {

                        console.log("Tweet created on " + tweets[i].created_at + " :" + tweets[i].text);

                    }
                }
            }
        });
    }

///// SPOTIFY-THIS-SONG LOGIC

    if (argument === "spotify-this-song") {

        //console.log(argument_name);

        if (argument_name === "") {
            spotify.search({type: 'track', query: "The Sign"}, function (err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                }
                console.log("Artist Name: " + data.tracks.items[3].artists[0].name);
                console.log("Name of track: " + data.tracks.items[3].name);
                console.log("Link to a preview of the track: " + data.tracks.items[3].preview_url);
                console.log("Name of the album: " + data.tracks.items[3].album.name);
                console.log("///////////////////////////////////////////////////")
                // Do something with 'data'
            });
        }

        else {
            spotify.search({type: 'track', query: argument_name}, function (err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                }

                for (var z = 0; z < data.tracks.items.length; z++) {
                    console.log("Result " + (z + 1));
                    console.log("Artist Name: " + data.tracks.items[z].artists[0].name);
                    console.log("Name of track: " + data.tracks.items[z].name);
                    console.log("Link to a preview of the track: " + data.tracks.items[z].preview_url);
                    console.log("Name of the album: " + data.tracks.items[z].album.name);
                    console.log("///////////////////////////////////////////////////")
                }
            });
        }
    }

///// MOVIE-THIS LOGIC

    if (argument === "movie-this") {

        if (process.argv[3] === undefined) {

            argument_name = "mr nobody"

        }

        var queryUrl = "http://www.omdbapi.com/?t=" + argument_name + "&y=&plot=short&r=json";

        request(queryUrl, function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {

                console.log("Title of the movie: " + JSON.parse(body).Title);
                console.log("Year the movie came out: " + JSON.parse(body).Year);
                console.log("IMDB Rating of the movie: " + JSON.parse(body).Ratings[0].Value);
                console.log("Country where the movie was produced: " + JSON.parse(body).Country);
                console.log("Language of the movie: " + JSON.parse(body).Language);
                console.log("Plot of the movie: " + JSON.parse(body).Plot);
                console.log("Actors in the movie: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes URL: " + "https://www.rottentomatoes.com/m/" + rotten_tomatoes_url);

            }
        });

    }
};

////// DO-WHAT-IT-SAYS LOGIC

if(argument === "do-what-it-says") {


    fs.readFile("random.txt", "utf8", function (error, data) {

        // split text file by commas
        var dataArr = data.split(",");

        //use array content as our command line arguments
        argument = dataArr[0];

        argument_name = dataArr[1];

        rotten_tomatoes_url = dataArr[1].split(' ').join('_');

        //call the liri function and use the updated argument variables
        liri();


    });
}
else{
    liri();
}
