

//Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them 
    //cheerio


//Each scraped article should be saved to your application database
    //mongodb


//At a minimum, the app should scrape and display the following information for each article:
    //Headline - the title of the article
    //Summary - a short summary of the article
    //URL - the url to the original article


//Feel free to add more content to your database (photos, bylines, and so on).




//Users should also be able to leave comments on the articles displayed and revisit them later
//The comments should be saved to the database as well and associated with their articles
//Users should also be able to delete comments left on articles. 
//All stored comments should be visible to every user.


//DEPENDENCIES
var express = require("express");
var mongojs = require("mongojs");

//REQUIRE AXIOS AND CHEERIO TO SCRAPE DATA FROM NEWS WEBSITE
var cheerio = require("cheerio");
var axios = require("axios");


//EXPRESS APP
var app = express();
var path = require('path');

//CONFIGURE DB AND MONGOJS
var databaseUrl = "scraper";
var collections = ["results", "comment"];
var db = mongojs(databaseUrl, collections);

//CONFIGURE MONGOOSE
var mongoose = require('mongoose');
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true});

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

//POST COMMENT 
// SAVE FORM SUBMISSION
app.post("/submit", function(req, res) {
  console.log(req.body);
  // Insert the note into the notes collection
  db.comment.insert(req.body, function(error, saved) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    else {
      // Otherwise, send the note back to the browser
      // This will fire off the success function of the ajax request
      res.send(saved);
    }
  });
});

 






// LISTENER
app.listen(3000, function() {
  console.log("App running on port 3000!");
});


