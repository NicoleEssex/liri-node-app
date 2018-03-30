//node package required for reading and writing files
var fs = require("fs")

fs.writeFile("random.txt", 'spotify-this-song,"I Want it That Way"', function(err){
    if(err) {
        return console.log(err);
    }

    // console.log("random.txt was updated");
});

var config = require("./.env").config;
console.log (config.SPOTIFY_ID);