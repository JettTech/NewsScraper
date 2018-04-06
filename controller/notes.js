//================================================================================================================
//Controller: Purpose Note - relays information/connects logic between the DB/Models and the views/frontend-JS 
//================================================================================================================

//Local Files:
//=================================================
// Importing the Model files (both the Article and Notes - as Notes is merged into Artilce)
var db = require("../models");

// importing the Script files:
var makeDate = require("../scripts/generateDate"); //current date function >> to use when no date returend from scrate.date ... 


// Notes Controller Logic:
//=================================================
module.exports = {
	//get/find a single note by id
	findOne: function(req, res){ //finds one note with the note-id provided in the URL
		db.Note
			.findOne({_id: req.params._id})
			.then(function(dbNote) {
				res.json(dbNote);
			});
	},

	//post/create a note in db
	create: function(req, res) { //posts (creates) a NEW note within the database
		var newNote = {
			author: req.body.author, //these "req.body"-VARs are created and passed through from the Public Directory's Article.js Script
			title: req.body.title,
			body: req.body.body,
			date: makeDate(),
			article_ID: req.body._id
		};

		db.Note
			.create(newNote)
			.then(function(dbNote) {
				res.json(dbNote);
			})
			.catch(function(error){
				throw error;
			});
	},

	//update a note by ID
	update: function(req, res) { //"save/unsave" note, "update author", "update TITLE", "update Note text",.... but don't delete note/article from article database
        //the "query" here is the "req.params.id", which was sent over from the ROUTER.JS file.  Because the query is "req.body" AND NOT "req.params.id", the IDs for the NOTE to update still needs to be determined...
        db.Note
	        .findOneAndUpdate(
	            { _id: req.params._id },
	            { $set: req.body }, //set the updated FIELD DATA to be equal to any new DATA/VALUES we pass in on QUERY
	            {new: true})
	        .then(function(dbNote) {
	        	res.json(dbNote);
	        })
	},

	//delete the note by ID
	delete: function(req, res) {
		db.Note
			.remove({_id: req.params._id})
			.then(function(dbNote) {
				res.json(dbNote);
			});
	}
};