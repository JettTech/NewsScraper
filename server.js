//This if the MongoDB URI String (for use in the Production Env, as ref,
   //use as the Env Var) ==> heroku_dr61zkxg:m0lf5nkldjfi0cjmhunrth12c8@ds127389.mlab.com:27389/heroku_dr61zkxg

//REVIEW: Then, just pass the MONGODB_URI variable to mongoose.connect. If you define MONGODB_URI on heroku,
// your production app will automatically use the remote database.

//DEPENDENCIES:
//===============================================
var express = require("express");
var app = express();
var router = express.Router(); //WHAT IS the DIFFERENCE between using Express as express.router, vs Express as APP???

var mongoose = require("mongoose");
var bodyParser = require("body-parser");
//var path = require("path"); >> DO WE NEED THIS DEPENDENCY/ PACKAGE?
var request = require("request"); //>>REVIEW THE PURPOSE OF THIS dependency AGAIN...

var logger = require("morgan");
var cheerio = require("cheerio"); //Scraping-Tool Dependency
var expressHandlebars = require("express-handlebars");


//Server SET-UP (Routing MIDDLEWARE Definition AND LOCAL Dependency/import Configuration)
//=========================================================================================
require("./config/routes")(router); //WHAT IS the difference bewtween using (app) and (router) ?!?!?!?! //LOCAL FILE >> //"./" signifies that the path/pathway for the file/folder required in, is found at the same level as current file.
app.use(express.static("public"));  //serves the "PUBLIC" folder as the static folder/directory for entire app.

app.engine("handlebars", expressHandlebars({ //ESTABLISHES THE ENGINE WITHIN APP
	defaultLayout: "main" //desingates the index file to reference as the root views file.
}));
app.set("view-engine", "handlebars"); //INFOMRS THE APP to USE the defined VIEW ENGINE above...
 
app.use(logger("dev")); // Use morgan logger for logging requests
app.use(bodyParser.urlencoded({extended: false})); // code determins how to handle form
 //submissions, the option "false" denies access to extended objects (objects whose keys have values that are 
  // addt'l objs..), and will instead return them as undefined.

app.use(router); //requires EVERY REQUEST to process through the ROUTER MIDDLEWARE >> Do we need to use this


//PORT and Database Definition AND Set-up
//=========================================
var PORT = process.env.PORT | 4500;

mongoose.Promise = Promise;
//ONLY UNCOMMENT BELOW WHEN READY to use the PRODUCTION ENVIRONMENT ->> HEROKU, >> ie. NOT the DEV Environment
//var MONGODB_URI = "mongodb://heroku_r3c350dk:ahv3co62acof8hqhc9n9uvkm0i@ds033186.mlab.com:33186/heroku_r3c350dk";
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoNewScraper";

mongoose.connect(db, function(error){ // !! WHY is node calling this structure a "deprecated version," if I am using the RECOMENDED "useMongoClient," when calling ".connect"
	if (error) throw error;
	useMongoClient: true;
	console.log("Mongoose connection is successful!!")
});


// Start the Server // Initialize Server Listiner with PORT Connection..
//==========================================================================
app.listen(PORT, function() {
	console.log("We're listening on PORT: " + PORT);
});
