
//Internal Imports/Requires:
//=================================================
// Importing the Scrape function from "Scripts" folder/directory:
var scrape = require("../scripts/scrape.js");

// importing the controller files:
var articlesController = require("../controller/articles.js");
var notesController = require("../controller/notes.js");


//Routes:
//=================================================
module.exports = function(router) {
	router.get("/", function(request,result){
		result.redirect("/articles");
	})

	router.get("/articles", function(request, result){
		db.all(function (articles) { //create the "get all" function fo rthe ariticles
			result.render("homePage", {Article_data: articles});
		});
	});

	router.get("/articles/saved", function(request, result){
		db.saved(function (saved) { //create the saved function..
			result.render("articleSaved", {Article_data: saved});
		});
	});
};