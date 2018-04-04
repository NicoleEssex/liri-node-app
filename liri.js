// store keys in variable accessed from object of keys in .env file
var config = require("./.env").config;
var dotenv = require("dotenv").config();
// set variables to store required access to file with other info or npms.
var fs = require("fs")
var keys = require("./keys.js")
var Twitter = require("twitter");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");
var request = require("request");
    

// store twitter access keys in object
client = new Twitter ({
    consumer_key: config.TWITTER_CONSUMER_KEY,
    consumer_secret: config.TWITTER_CONSUMER_SECRET,
    access_token_key: config.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});

//access spotify key info
var spotify = new Spotify({
    id: config.SPOTIFY_ID,
    secret: config.SPOTIFY_SECRET
});
 

//create file and write text to it. 
fs.writeFile("random.txt", 'spotify-this-song,"I Want it That Way"', function(err){
    if(err) {
        return console.log(err);
    }
});

//store commands in terminal using inquirer
inquirer
.prompt ([
    {
        type: "input",
        message: "Hello Master Programmer... what can I do for you today?",
        name: "username"
    }
    
])
//make call to twitter api
.then(function(answer){
    if(answer.username === "my-tweets") {
        Twitter;
        var params = {screen_name: 'XesseElocin'};
        client.get('statuses/user_timeline/count20', params, function(error, tweets, response) {
            if (!error) {
                for(var i = 0; i < tweets.length; i++){
                    console.log(tweets[i].text);
                    console.log(tweets[i].created_at);
                }
            }
        });
    };
    if(answer.username === "spotify-this-song"){
        inquirer
        .prompt([
            {
                type:"input",
                message: "What is the name of the song?",
                name:"song"
            }
        ])
        //make call to spotify api
        .then(function(answer){
            var song = answer.song;
            spotify
            spotify.search({ type: 'track', query: song }, function(err, data) {
                if ( err ) {
                    console.log('Error occurred: ' + err);
                    return;
                }
                console.log(data.tracks.items[0].artists[0].name);
                console.log(data.tracks.items[0].name);
                console.log(data.tracks.items[0].album.name);
                console.log(data.tracks.items[0].href);
            });
        });
        
    };
    if(answer.username === "movie-this"){
        inquirer
        .prompt([
            {
                type:"input",
                message: "What is the name of the movie?",
                name:"title"
            }
        ])
        //make request to omdb api
        .then(function(answer){
            var title = answer.title;
            request("http://www.omdbapi.com/?t="+title+"&apikey=trilogy", function(error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)display these responses to the console
            if (!error && response.statusCode === 200) {

            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors)
            }
            });
            console.log(title);
        });
    };  
});

