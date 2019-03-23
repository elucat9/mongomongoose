//DEPENDENCIES
var mongoose = require("mongoose");

//SCHEMA CONSTRUCTOR
var Schema = mongoose.Schema;

//NEW articleSchema OBJECT
var articleSchema = new Schema({
  Headline: {
    type: String,
    required: true
  }, 
  URL: {
    type: String,
    required: true
  },
  Summary: {
    type: String,  
  },

  //ADD COMMENTS TO ARTICLES
  //"COMMENT" IS AN OBJECT, IT STORES AN ID 
  //"REF" LINKS THE OBJECT ID TO THE COMMENT MODEL
    Comment: {
    type: Schema.Types.ObjectId,
    ref: "comment"
  }
});

// MONGOOSE MODEL
var article = mongoose.model("article", articleSchema);

// EXPORT 
module.exports = article;
