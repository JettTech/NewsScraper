//DEPENDENCIES:
//===============================================
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars");

var logger = require("morgan");
var cheerio = require("cheerio"); //Scraping-Tool Dependency

var routes = require("./routes")

//Server SET-UP (Routing MIDDLEWARE Definition AND LOCAL Dependency/import Configuration)
//=========================================================================================
app.use(express.static("public"));  //serves the "PUBLIC" folder as the static folder/directory for entire app.

app.engine("handlebars", expressHandlebars({ //ESTABLISHES THE ENGINE WITHIN APP
	defaultLayout: "main" //desingates the index file to reference as the root views file.
}));
app.set("view-engine", "handlebars"); //INFORMS THE APP to USE the defined VIEW ENGINE above...
 
app.use(bodyParser.urlencoded({extended: false})); // code determins how to handle form
 //submissions, the option "false" denies access to extended objects (objects whose keys have values that are 
  // addt'l objs..), and will instead return them as undefined.
app.use(bodyParser.json());
app.use(routes); //requires EVERY REQUEST to process through the ROUTES MIDDLEWARE >> Do we need to use this


//PORT and Database Definition AND Set-up
//=========================================
var PORT = process.env.PORT | 4500;

mongoose.Promise = Promise;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoNewScraper";

mongoose.connect(MONGODB_URI, function(error){
	if (error) throw error;
	useMongoClient: true;
	console.log("Mongoose connection is successful!!")
});


// Start the Server // Initialize Server Listiner with PORT Connection..
//==========================================================================
app.listen(PORT, function() {
	console.log("We're listening on PORT: " + PORT);
});