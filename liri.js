/**
 * Created by rpaulin on 5/8/17.
 */

var Twitter = require('twitter');

var myKeys = require("./keys");

var request = require("request");

var spotify = require('spotify');

var fs = require("fs");

var client = new Twitter(myKeys.twitterKeys);

var params = {screen_name: 'codingricardo', count: 20};


var argument = process.argv[2];

/// NEED TO STORE ALL ARGUMENTS STARTING ON INDEX 3 TO THEN JOIN THEM INTO A STRING

var argument_array = [];

for(var s = 3; s < process.argv.length; s++){
    argument_array.push(process.argv[s])
}

var argument_name = argument_array.join(" ");

var rotten_tomatoes_url = argument_array.join("_");

var consoleLog = "";

///// function to save content in a text file

var saveIntoLog = function(){

    var commandLine = process.argv[0] + " " + process.argv[1] + " " + argument + " " + argument_name + "\n" + "************************************" + "\n";

    fs.appendFile("log.txt", commandLine + consoleLog, function(err) {

        // If an error was experienced we say it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Content Added!");
        }

    });

};

/////wrapping everything in a function

var liri = function() {

///// MY-TWEETS LOGIC


    if (argument === "my-tweets") {

        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {

                for(var x = 0; x < tweets.length; x ++){

                    console.log("Tweet created on " + tweets[x].created_at + ": " + tweets[x].text + "\n" + "------------------------------------------------");
                    consoleLog += "Tweet created on " + tweets[x].created_at + ": " + tweets[x].text + "\n" + "------------------------------------------------" + "\n";

                }

                // append results to log.txt
                saveIntoLog();
            }
        });
    }

///// SPOTIFY-THIS-SONG LOGIC

    if (argument === "spotify-this-song") {

        if (argument_name === "") {
            spotify.search({type: 'track', query: "The Sign"}, function (err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                }
                console.log("Artist Name: " + data.tracks.items[4].artists[0].name);
                console.log("Name of track: " + data.tracks.items[4].name);
                console.log("Link to a preview of the track: " + data.tracks.items[4].preview_url);
                console.log("Name of the album: " + data.tracks.items[4].album.name);
                console.log("///////////////////////////////////////////////////");

                consoleLog += "Artist Name: " + data.tracks.items[4].artists[0].name + "\n";
                consoleLog += "Name of track: " + data.tracks.items[4].name + "\n";
                consoleLog += "Link to a preview of the track: " + data.tracks.items[4].preview_url + "\n";
                consoleLog += "Name of the album: " + data.tracks.items[4].album.name + "\n";
                consoleLog += "///////////////////////////////////////////////////" + "\n";

                saveIntoLog();

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
                    console.log("///////////////////////////////////////////////////");

                    consoleLog += "Result " + (z + 1) + "\n";
                    consoleLog += "Artist Name: " + data.tracks.items[z].artists[0].name + "\n";
                    consoleLog += "Name of track: " + data.tracks.items[z].name + "\n";
                    consoleLog += "Link to a preview of the track: " + data.tracks.items[z].preview_url + "\n";
                    consoleLog += "Name of the album: " + data.tracks.items[z].album.name + "\n";
                    consoleLog += "///////////////////////////////////////////////////" + "\n";
                }
                saveIntoLog();
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

                consoleLog += "Title of the movie: " + JSON.parse(body).Title + "\n";
                consoleLog += "Year the movie came out: " + JSON.parse(body).Year + "\n";
                consoleLog += "IMDB Rating of the movie: " + JSON.parse(body).Ratings[0].Value + "\n";
                consoleLog += "Country where the movie was produced: " + JSON.parse(body).Country + "\n";
                consoleLog += "Language of the movie: " + JSON.parse(body).Language + "\n";
                consoleLog += "Plot of the movie: " + JSON.parse(body).Plot + "\n";
                consoleLog += "Actors in the movie: " + JSON.parse(body).Actors + "\n";
                consoleLog += "Rotten Tomatoes URL: " + "https://www.rottentomatoes.com/m/" + rotten_tomatoes_url + "\n";

                saveIntoLog();
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

