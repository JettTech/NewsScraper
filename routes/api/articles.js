//DEPENDENCIES:
//===============================================
var router = require("express").Router();

//Local File References:
//===============================================
var articleController = require("../../controllers/articles");

//Article Routes:
//===============================================
//at this point, the uri address === "/api/articles/:id, which will be used for the GET (find/render) functionality
router.get("/", articleController.findAll);
//at this point, the uri address === "/api/articles/:id," which will be used for the PUT (update) functionality
router.put("/:id", articleController.update);
//at this point, the uri address === "/api/articles/:id," which will be used for the DELETE functionality
router.delete("/:id", articleController.delete);

module.exports = router;

// ////////////////////////////////////////////////////////////////////////////////////////////////////
// //Article Routes:

// //---------------------
// 	//GET ROUTES:
// 	router.get("/articles", function(request, response){
// 		response.render("./homePage.handlebars");
// 	});

// 	router.get("/articles/saved", function(request, response){ //get ALL SAVED articles
// 		response.render("./articleSaved.handlebars");
// 	});

// 	router.get("/api/articles/?saved=true", function(request, response){
// 		var query = {};
// 	    if (request.query.saved) {
// 	      query = request.query;
// 	    }//If the client specifies a saved query parameter, ie "/api/headlines/?saved=true"
//     		// which is translated to just { saved: true } on req.query, >>> then set the query object equal to the id and saved:true.
		
// 		articlesController.get(query, function (articles) { //create the "GET ALL" ARTICLE function for the articles
// 			response.render("./homePage.handlebars", {Article_data: articles});
// 		});
// 	});

// 	router.get("/api/articles/:id", function(request, response){ //":" means that the URL parmeter just following IS required, but CAN vary in value (ie, it doesn't NEED to be ONE SPECIFIC value/string or charaters in order to satisfy this parameter call...)
// 		var query = {};
// 		query.id = request.params.id;

// 		articlesController.get(query, function (article) { //create the "GET ALL" ARTICLE function for the articles
// 			//response.json(article);
// 			//response.redirect("/articles")
// 			response.render("./homePage.handlebars", {Article_data: article});
// 		});
// 	});


// 	router.get("/api/articles/saved", function(request, response){ //get ALL SAVED articles
// 		var query = request.filter(function(queryDoc){
// 			queryDoc === query.saved;
// 		});
// 		console.log(query); //this should return an array of the queries that are saved ==>>> where req.query.saved  === true
	    
// 		articlesController.get(query, function (savedAll) {
// 			response.render("./articleSaved.handlebars", {Article_data: savedAll});
// 		});
// 	});

// 	router.get("/api/articles/saved/:id", function(request, response){
// 		var query = request.filter(function(queryDoc) {
// 			queryDoc === query.saved;
// 		});
// 		if (query !== {} || query !== null) {
// 			query.id = request.params.id;
// 		}
// 		else {
// 			response.json({
// 				message: "Sorry, there are no saved articles yet."
// 			});
// 		}	
// 		articlesController.get(query, function (savedOne) { //create the "GET ALL" ARTICLE function for the articles
// 			response.render("./articleSaved.handlebars", {Article_data: savedOne});
// 		});
// 	});

// //---------------------
// 	//UPDATE ROUTE:
// 	//**** **** **** **** 
// 	// ROUTER WON'T take the call "UPDATE", or must it be called "PATCH"??!!
// 	router.patch("/api/articles", function(request, response) { //Update ALL articles when ON the HOMEPAGE
// 		var query = request.body; //"req.body" is used here instead of "req.params" to make this route easier to
//     						// change if ever wish to update a headline in any way other than saving it.

// 		articlesController.update(error, query, function(error, article){
// 			if (error) throw error;
// 			response.json(article);v//updating the db
// 			console.log("Inside the Routes.js - Updated the following article in DB with new Query: " + article);		
// 			response.status(200).end();
// 		})
// 	});
// //---------------------
// 	//DELETE ROUTE:
// 	router.delete("/api/articles/:id", function(request, response) {
// 		var query = {}; //set query to an empty object...
// 		query.id = request.params.id  // Set the _id property of the query object to the id in req.params

// 		articlesController.delete(query, function(error, article) { //>>> THE REQUEST.PARAMS.ID is pased into the query here by making the query.id equal to the URL ID (the request.params.id);
// 			if (error) throw error;
// 			response.json(article);v//updating the db
// 			console.log("Inside the Routes.js - Deleted the article from DB: " + article);			
// 			response.status(200).end();
// 		})
// 	});