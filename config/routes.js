
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
//DEFAULT >> Route to HomePage:
	router.get("/", function(request,response){
		response.redirect("/articles");
	})
////////////////////////////////////////////////////////////////////
//Article Routes:
	router.get("/articles", function(request, response){
		articlesController.get(function (articles) { //create the "GET ALL" ARTICLE function fo rthe ariticles
			response.render("homePage", {Article_data: articles});
		});
	});

	router.get("/articles/:id", function(request, response){
		articlesController.get(function (article) { //create the "GET ALL" ARTICLE function fo rthe ariticles
			response.render("homePage", {Article_data: article});
		});
	});

	router.get("/articles/saved", function(request, response){ //get ALL SAVED articles
		articlesController.get(function (saved) { //create the saved function..
			response.render("articleSaved", {Article_data: saved});
		});
	});

	router.get("/articles/saved/:id", function(request, response){
		articlesController.get(function (saved) { //create the "GET ALL" ARTICLE function fo rthe ariticles
			response.render("articleSaved", {Article_data: saved});
		});
	});

	router.post("/articles", function(request, response) {
		articlesController.fetch(function(article){
			console.log("Inside the Routes.js - Posted NEW Data to the DB.");
			response.status(200).end()
		})
	});

	router.post("/articles/:id", function(request, response){
		articlesController.post(function (article) { //create the "GET ALL" ARTICLE function fo rthe ariticles
			console.log("Inside the Routes.js - Posted NEW article/data to the DB: " + article);
			response.json(article); //DO we need this???
			response.status(200).end()
		})
	});

	router.update("/articles/:id", function(request, response) {
		articlesController.update(function(article){
			console.log("Inside the Routes.js - Updated the following article in DB with new Query: " + article);
			response.json(article); //DO we need this???
			response.status(200).end();
		})
	});

	router.delete("/articles/:id", function(request, response) {
		articlesController.delete(function(article) {
			console.log("Inside the Routes.js - Deleted the article from DB: " + article);
			response.json(article); //DO we need this???
			response.status(200).end();
		})
	});

////////////////////////////////////////////////////////////////////////////////////////////////////
//Note Routes:
	router.get("/articles", function(request, response){
		notesController.get(function (notes) { //create the "GET ALL" ARTICLE function fo rthe ariticles
			response.render("homePage", {Notes_data: notes});
		});
	});

	router.get("/articles", function(request, response){
		notesController.get(function (savedNotes) { //create the "GET ALL" ARTICLE function fo rthe ariticles
			response.render("    ", {Notes_data: savedNotes});
		});
	});


};