// Vendor
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// My Scripts
var keys = require('./keys.js');

var app = {
  "my-tweets": function() {
    var client = new Twitter(keys);
    client.get('statuses/user_timeline', function(error, tweetData, response) {
      if (!error) {
        console.log(' ');
        console.log('================ My Tweets ================');
        tweetData.forEach(function(obj) {
          console.log('--------------------------');
          console.log('Time: ' + obj.created_at);
          console.log('Tweet: ' + obj.text);
          console.log('--------------------------');
          console.log(' ');
        });
        console.log('===========================================');
        console.log(' ');

      } else {
        console.log(error);
      }
    });
  },
  "movie-this": function(query) {
    request('http://www.omdbapi.com/?t=' + (query || "Mr.Nobody")  + '&apikey=40e9cece' +'&tomatoes=true', function (error, response, info) {
      if (!error && response.statusCode == 200) {

        var movieData = JSON.parse(info);

        console.log(' ');
        console.log('================ Movie Info ================');
        console.log('Title: ' + movieData.Title);
        console.log('Year: ' + movieData.Year);
        console.log('IMDB Rating: ' + movieData.imdbRating);
        console.log('Country: ' + movieData.Country);
        console.log('Language: ' + movieData.Language);
        console.log('Plot: ' + movieData.Plot);
        console.log('Actors: ' + movieData.Actors);
        console.log('Rotten Tomatoes Rating: ' + movieData.tomatoRating);
        console.log('Rotten Tomatoes URL: ' + movieData.tomatoURL);
        console.log('===========================================');
        console.log(' ');
      }
    });
  },

  "spotify-this-song": function(keyword)
   { var spotify = new Spotify({
      id: '3983338be70446bd803b30a4a25002fc',
      secret: 'd8fb9e30063c48818e23948f160e25d7'
});
    spotify.search({ type: 'track', query: 'Toxicity' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
 

        }if(data.tracks.items.length > 0) 
        { var record = data.tracks.items[0];
  
        console.log(' ');
        console.log('================ Song Info ================');
        console.log('Artist: ' + record.artists[0].name);
        console.log('Name: ' + record.name);
        console.log('Link: ' + record.preview_url);
        console.log('Album: ' + record.album.name);
        console.log('===========================================');
        console.log(' ');
    };
  }
  )},
  "do-what-it-says": function() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
      if(err) throw err;
      console.log(data.toString());

      var cmds = data.toString().split(',');

      app[cmds[0].trim()](cmds[1].trim());
    });
  },
};


app[process.argv[2]](process.argv[3]);