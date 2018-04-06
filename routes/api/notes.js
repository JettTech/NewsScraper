//DEPENDENCIES:
//===============================================
var router = require("express").Router();

//Local File References:
//===============================================
var noteController = require("../../controllers/notes");


//Note Routes:
//===============================================
//at this point, the uri address === "/api/notes/:id, which will be used for the GET (find/render) functionality
router.get("/:id", noteController.findOne);
//at this point, the uri address === "/api/notes/," which will be used for the POST (create) functionality
router.post("/", noteController.create);
//at this point, the uri address === "/api/notes/:id," which will be used for the UPDATE functionality
router.put("/:id", noteController.update);
//at this point, the uri address === "/api/notes/:id," which will be used for the DELETE  functionality
router.delete("/:id", noteController.delete);

module.exports = router;


// ////////////////////////////////////////////////////////////////////////////////////////////////////
// //Note Routes:
	
// 	//GET ROUTES:
// 	router.get("/api/notes/:articles_id?", function(request, response){
// 		var query = {};
// 		if (request.params.articles_id) {
// 			query._id = request.params.articles_id;
// 		}
// 		// If supplied an article-id in "req.params" >>> then the id will be added to the query object,
//     		//...otherwise the query will remain an empty object and thus refernce (and thereby return) every note when passed into the following function for precessing (on the controller.js page); 
// 		notesController.get(query, function (error, notes) { //create the "GET ALL" ARTICLE function for the articles, while on the Homepage
// 			if (error) throw error;
// 			response.render("./articleSaved.handlebars", {Article_data: notes});
// 			console.log("Inside the Routes.js - called a note by ID from DB: " + notes);		
// 		})
// 	});

// 	router.get("/api/notes/:note_id?", function(request, response){
// 		var query = {};
// 		if (request.params.note_id) {
// 			query._id = request.params.note_id;
// 		}
// 		// If supplied an note-id in "req.params" >>> then the id will be added to the query object,
//     		//...otherwise the query will remain an empty object and thus refernce (and thereby return) every note when passed into the following function for precessing (on the controller.js page); 
// 		notesController.getOne(query, function (error, notes) { //create the "GET ALL" ARTICLE function for the articles, while on the Homepage
// 			if (error) throw error;
// 			//response.json(notes);
// 			response.render("./articleSaved.handlebars", {Article_data: notes});
// 			console.log("Inside the Routes.js - called a note by ID from DB: " + notes);		
// 		})
// 	});
// //---------------------
// 	//POST ROUTES:
// 	router.post("/api/notes", function(request, response){
// 		var query = request.body;

// 		notesController.post(query, function (error, note) { //create the "GET ALL" ARTICLE function for the articles
// 			if (error) throw error;
// 			console.log("Inside the Routes.js - Posted NEW article/data to the DB: " + note);
// 			response.json(note); //This is the callback referenced in the note controller.js file
// 			response.status(200).end();
// 		})
// 	});
// //---------------------
// 	//UPDATE ROUTE:
// 	router.patch("/api/notes/:id", function(request, response) { //Update One article by ID with NEW NOTE, when ON the SAVEDPAGE
// 		var query = request.body

// 		notesController.update(query, function(error, note){
// 			if(error) throw error;
// 			response.json(note);
// 			console.log("Inside the Routes.js - Updated the following article in DB with new Query: " + note);
// 			response.status(200).end();
// 		})
// 	});

// //---------------------
// 	//DELETE ROUTE:
// 	router.delete("/api/notes/:id", function(request, response) {
// 		var query = {};
// 		query._id = request.params.id;

// 		notesController.delete(query, function(error, note) {
// 			if(error) throw error;
// 			response.json(note);
// 			console.log("Inside the Routes.js - Deleted the article from DB: " + note);
// 			response.status(200).end();
// 		})
// 	});

////////////////////////////////////////////////////
//if wished to create route that would only show notes for specfiic article:
                // if (articleLog._id === null || articleLog._id === "" || articleLog._id === undefined) {
                //    story.note_ID = "",
                //    console.log("Sorry there are no Notes at this time - no NOTE ID can be found: " + data._id);
                // } 
                // else {
                //     story.note_ID = articleLog._id, //VERIFY this is sendind the correct id! >> aligns with Note ID!//
                //     console.log("we added a the Note ID to this story (article): " + story.note_ID);
                // };