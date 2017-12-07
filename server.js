//This if the MongoDB URI String (for use in the Production Env, as ref,
   //use as the Env Var) ==> heroku_dr61zkxg:m0lf5nkldjfi0cjmhunrth12c8@ds127389.mlab.com:27389/heroku_dr61zkxg

//REVIEW: Then, just pass the MONGODB_URI variable to mongoose.connect. If you define MONGODB_URI on heroku,
// your production app will automatically use the remote database.



//DEPENDENCIES:
//===============================================
var express = require("express");
var app = express();

var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var request = require("request"); //>>REVIEW THE PURPOSE OF THIS dependency AGAIN...

var logger = require("morgan");
var cheerio = require("cheerio"); //Scraping-Tool Dependency
var expressHandlebars = require("express-handlebars");

>>require("./models")(app); //LOCAL FILE

//var path = require("path"); >> DO WE NEED THIS DEPENDENCY/ PACKAGE?


//Server SET-UP (PORT, route middleware, and (general) dependency configuration.);
//================================================================================
var PORT = process.env.PORT | 4500;


app.use(logger("")) // Use morgan logger for logging requests
app.use(bodyParser.urlencoded({extended: false})); // code determins how to handle form
 //submissions, false denies extended objects (objects whose keys have values that are 
  // addt'l ojbs..) to display, will return them undefined.
app.use(express.static("public")); 
  //serves the "PUBLIC" folder as the static folder/directory for entire app.


//Est MongoDB Set-up, and ConnecT to Mongo Database (Routing)
//=================================================
mongoose.Promise = Promise;
//ONLY UNCOMMENT BELOW WHEN READY to use the PRODUCTION ENVIRONMENT ->> HEROKU, >> ie. NOT the DEV Environment
//var MONGODB_URI = "mongodb://heroku_r3c350dk:ahv3co62acof8hqhc9n9uvkm0i@ds033186.mlab.com:33186/heroku_r3c350dk";
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoNewScraper";

mongoose.conect(db, function(error){
	if (error) throw error;
	useMongoClient: true;
	console.log("mongoose connection is successful!!")
});


//Local Dependencies/Imports:
//=================================================

//Routes:
//=================================================

// A GET route for scraping the echojs website

var scrape




// Start the server
//=================================================
var PORT = app.listen(PORT, function() {
	console.log("We're listening on PORT: " + PORT);
});
