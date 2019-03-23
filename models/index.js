// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
//https://polar-gorge-36143.herokuapp.com/ 
//>>>>>>>>>>
module.exports = {
    article: require("./article"),
    comment: require("./comment")
  };
  





// var mongoose = require('mongoose');
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// mongoose.connect(MONGODB_URI);
// mongoose.connection.on('error', function() {
//   console.error('MongoDB Connection Error. Make sure MongoDB is running.');
// });
// var ListingsSchema = new mongoose.Schema({
//   Headline: String,
//   Summary: {type: String, default: ''},
//   URL: {type: String, default: '', lowercase: true}
// });
// module.exports = mongoose.model('Listings', ListingsSchema);