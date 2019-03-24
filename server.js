
//DEPENDENCIES
var express = require("express");
var mongojs = require("mongojs");

//REQUIRE AXIOS AND CHEERIO TO SCRAPE DATA FROM NEWS WEBSITE
var cheerio = require("cheerio");
var axios = require("axios");


//EXPRESS APP
var app = express();
var path = require('path');


var port = process.env.PORT || 3000;
//CONFIGURE DB AND MONGOJS
var databaseUrl = "scraper";
var collections = ["results", "comment"];
var db = mongojs(process.env.MONGODB_URI, collections);

//CONFIGURE MONGOOSE
var mongoose = require('mongoose');
console.log
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


//SCRAPE WALL STREET JOURNAL WEBSITE
  axios.get("https://www.wsj.com/").then(function (response) {
    var $ = cheerio.load(response.data);
    var results = [];
    

    $("a.wsj-headline-link").each(function (i, element) {
        var Headline = $(element).text();
        var URL = $(element).attr('href');
     
        var Summary = $(element).parent().next().next().children(".wsj-summary").children().text();
//console.log(Summary)

        results.push({
            Headline: Headline,   
            URL: URL,
            Summary: Summary
        });
    
        //console.log(results)
        db.results.insert({
          Headline: Headline,   
          URL: URL,
          Summary: Summary
        })
          
    });  

  });

 
//ROUTES
//SEND DATA TO BROWSER 
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname+'/app.html'));
});

app.get("/scrape", function(req, res) {
  db.results.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });

})




// LISTENER
app.listen(port, function() {
  console.log("App running on port 3000!");
});


