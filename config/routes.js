
//Internal Imports/Requires:
//=================================================
// Importing the Scrape function from "Scripts" folder/directory:
var scrape = require("../scripts/scrape.js");

// importing the controller files:
var articlesController = require("../controller/articles.js");
var notesController = require("../controller/notes.js");
var scrape = require("../scripts/scrape"); //the scraped data from the website


//Routes:
//=================================================
module.exports = function(router) {
//DEFAULT >> Route to HomePage:
	router.get("/", function(request,response){
		response.redirect("/articles");
	});
////////////////////////////////////////////////////////////////////
//Article Routes:
	
	//FETCH ROUTE >> Fetches Article:
	router.get("/api/articles/fetch", function(request, response) { //GETS/FETCHES the new articles from the Scraper Function AND ADDS them to our DB
		//new promise (requesting scrape info)
		//with the resolve of the promise, do this


		scrape(function(data) {
            //the "data" here is the results ARRAY OBJECT passed as the parameter for the callback function.  The function is not being called here, and data now REFERENCES the callback parameter, hence the Articles Array Object.
            //console.log(data);
            var articleLog = data; //name a varible to clarify what the data represents
            // console.log("ArticleLog data (Inside the Config-article.js.).. = ");
            // console.log(articleLog);

            articleLog.forEach(function(story) {
                story.saved = false; //each time we save new data in the DB, we set the saved Boolean to the default "false." //saved references a Boolean key (column) in our object model (db table)                
                story.date = makeDate(); //This NEEDS TO BE called as a function (eveen though it's import is not named with a function invocation), because the import references the file import taht holds the function, and we would now like to invoke it...
            });

            // !!!NOW POSTING THE SCRAPED DATA TO THE DATABASE!!!!!! 
            try {
                models.collection.insertMany(articleLog);
            } catch (error) {
                console.log("Error is "+ error);
            }


            // models.collection.insertMany(articleLog, { ordered: false }, function(error, docs) {
            //     // console.log("test");
            //     if(error){
            //         console.log("error was sent : "+ error);
            //     }
            //     callback(error, docs); //PASS BOTH the error and docs from ArticleLog (the Scrape Data) into the callback function for reference and mainpulation when writing View/Display JQUERY/JS.
            // });


             console.log("Finished writing");
            //NOTE: The use of "models.collection" below, lets us access the native Mongo "insertMany" method.
            // The strategy is to use the Mongo"insertMany" method, instead of the Mongoose "create" method because here we may
            // specify whether this is an ordered or unordered insert >> addit'l note, we DO NOT need to require in BOTH Mongo and Mongoose when referecing these method.. only Mongoose, as it is rooted in Mongo.         
        });

		if(error) {
				console.log("Error in routes.config = " + error);
				throw error;
			}

			//.then with the resolve of the promise, do this
			console.log("inside ROUTES.JS - article scraped is: ");
			console.log(article); //this is carried over from AFTER the Models Collection Insert in the Controller/articles.js

			//console.log("Inside the Routes.js - Posted NEW Data to the DB.");
			if(article.insertedCount === 0 || !article){
				response.json({
					message: "No new articles currently. Come back and try your luck again at a later time!"
				});
				response.status(200).end();
			}
			else {
				response.json({
					message: "Nicely Done!  You just added " + article.instertedCount + " new artiles to the Homepage! \n Now go give them a visit. =D"
				});
				response.redirect("/api/articles");
				//response.status(200).end();
			}




		// articlesController.fetch(function(error, article){ 

		// 	if(error) {
		// 		console.log("Error in routes.config = " + error);
		// 		throw error;
		// 	}

		// 	//.then with the resolve of the promise, do this
		// 	console.log("inside ROUTES.JS - article scraped is: ");
		// 	console.log(article); //this is carried over from AFTER the Models Collection Insert in the Controller/articles.js

		// 	//console.log("Inside the Routes.js - Posted NEW Data to the DB.");
		// 	if(article.insertedCount === 0 || !article){
		// 		response.json({
		// 			message: "No new articles currently. Come back and try your luck again at a later time!"
		// 		});
		// 		response.status(200).end();
		// 	}
		// 	else {
		// 		response.json({
		// 			message: "Nicely Done!  You just added " + article.instertedCount + " new artiles to the Homepage! \n Now go give them a visit. =D"
		// 		});
		// 		response.redirect("/api/articles");
		// 		//response.status(200).end();
		// 	}
		// });

	});

//---------------------
	//GET ROUTES:
	router.get("/articles", function(request, response){
		response.render("./homePage.handlebars");
	});

	router.get("/articles/saved", function(request, response){ //get ALL SAVED articles
		response.render("./articleSaved.handlebars");
	});

	router.get("/api/articles/?saved=true", function(request, response){
		var query = {};
	    if (request.query.saved) {
	      query = request.query;
	    }//If the client specifies a saved query parameter, ie "/api/headlines/?saved=true"
    		// which is translated to just { saved: true } on req.query, >>> then set the query object equal to the id and saved:true.
		
		articlesController.get(query, function (articles) { //create the "GET ALL" ARTICLE function for the articles
			response.render("./homePage.handlebars", {Article_data: articles});
		});
	});

	router.get("/api/articles/:id", function(request, response){ //":" means that the URL parmeter just following IS required, but CAN vary in value (ie, it doesn't NEED to be ONE SPECIFIC value/string or charaters in order to satisfy this parameter call...)
		var query = {};
		query.id = request.params.id;

		articlesController.get(query, function (article) { //create the "GET ALL" ARTICLE function for the articles
			//response.json(article);
			//response.redirect("/articles")
			response.render("./homePage.handlebars", {Article_data: article});
		});
	});


	router.get("/api/articles/saved", function(request, response){ //get ALL SAVED articles
		var query = request.filter(function(queryDoc){
			queryDoc === query.saved;
		});
		console.log(query); //this should return an array of the queries that are saved ==>>> where req.query.saved  === true
	    
		articlesController.get(query, function (savedAll) {
			response.render("./articleSaved.handlebars", {Article_data: savedAll});
		});
	});

	router.get("/api/articles/saved/:id", function(request, response){
		var query = request.filter(function(queryDoc) {
			queryDoc === query.saved;
		});
		if (query !== {} || query !== null) {
			query.id = request.params.id;
		}
		else {
			response.json({
				message: "Sorry, there are no saved articles yet."
			});
		}	
		articlesController.get(query, function (savedOne) { //create the "GET ALL" ARTICLE function for the articles
			response.render("./articleSaved.handlebars", {Article_data: savedOne});
		});
	});

//---------------------
	//UPDATE ROUTE:
	//**** **** **** **** 
	// ROUTER WON'T take the call "UPDATE", or must it be called "PATCH"??!!
	router.patch("/api/articles", function(request, response) { //Update ALL articles when ON the HOMEPAGE
		var query = request.body; //"req.body" is used here instead of "req.params" to make this route easier to
    						// change if ever wish to update a headline in any way other than saving it.

		articlesController.update(error, query, function(error, article){
			if (error) throw error;
			response.json(article);v//updating the db
			console.log("Inside the Routes.js - Updated the following article in DB with new Query: " + article);		
			response.status(200).end();
		})
	});
//---------------------
	//DELETE ROUTE:
	router.delete("/api/articles/:id", function(request, response) {
		var query = {}; //set query to an empty object...
		query.id = request.params.id  // Set the _id property of the query object to the id in req.params

		articlesController.delete(query, function(error, article) { //>>> THE REQUEST.PARAMS.ID is pased into the query here by making the query.id equal to the URL ID (the request.params.id);
			if (error) throw error;
			response.json(article);v//updating the db
			console.log("Inside the Routes.js - Deleted the article from DB: " + article);			
			response.status(200).end();
		})
	});


////////////////////////////////////////////////////////////////////////////////////////////////////
//Note Routes:
	
	//GET ROUTES:
	router.get("/api/notes/:articles_id?", function(request, response){
		var query = {};
		if (request.params.articles_id) {
			query._id = request.params.articles_id;
		}
		// If supplied an article-id in "req.params" >>> then the id will be added to the query object,
    		//...otherwise the query will remain an empty object and thus refernce (and thereby return) every note when passed into the following function for precessing (on the controller.js page); 
		notesController.get(query, function (error, notes) { //create the "GET ALL" ARTICLE function for the articles, while on the Homepage
			if (error) throw error;
			response.render("./articleSaved.handlebars", {Article_data: notes});
			console.log("Inside the Routes.js - called a note by ID from DB: " + notes);		
		})
	});

	router.get("/api/notes/:note_id?", function(request, response){
		var query = {};
		if (request.params.note_id) {
			query._id = request.params.note_id;
		}
		// If supplied an note-id in "req.params" >>> then the id will be added to the query object,
    		//...otherwise the query will remain an empty object and thus refernce (and thereby return) every note when passed into the following function for precessing (on the controller.js page); 
		notesController.getOne(query, function (error, notes) { //create the "GET ALL" ARTICLE function for the articles, while on the Homepage
			if (error) throw error;
			//response.json(notes);
			response.render("./articleSaved.handlebars", {Article_data: notes});
			console.log("Inside the Routes.js - called a note by ID from DB: " + notes);		
		})
	});
//---------------------
	//POST ROUTES:
	router.post("/api/notes", function(request, response){
		var query = request.body;

		notesController.post(query, function (error, note) { //create the "GET ALL" ARTICLE function fot he articles
			if (error) throw error;
			console.log("Inside the Routes.js - Posted NEW article/data to the DB: " + note);
			response.json(note); //This is the callback referenced in the note controller.js file
			response.status(200).end();
		})
	});
//---------------------
	//UPDATE ROUTE:
	router.patch("/api/notes/:id", function(request, response) { //Update One article by ID with NEW NOTE, when ON the SAVEDPAGE
		var query = request.body

		notesController.update(query, function(error, note){
			if(error) throw error;
			response.json(note);
			console.log("Inside the Routes.js - Updated the following article in DB with new Query: " + note);
			response.status(200).end();
		})
	});

//---------------------
	//DELETE ROUTE:
	router.delete("/api/notes/:id", function(request, response) {
		var query = {};
		query._id = request.params.id;

		notesController.delete(query, function(error, note) {
			if(error) throw error;
			response.json(note);
			console.log("Inside the Routes.js - Deleted the article from DB: " + note);
			response.status(200).end();
		})
	});
};