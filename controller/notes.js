//================================================================================================================
//Controller: Purpose Note - relays information/connects logic between the DB/Models and the views/frontend-JS 
//================================================================================================================

//Local Files:
//=================================================
// Importing the Model files (both the Article and Notes - as Notes is merged into Artilce)
var db = require("../models");

// Notes Controller Logic:
//=================================================
module.exports = {
	//get/find a single note by id
	findOne: function(req, res) {
	db.Note
	  .findOne(req.params._id)
	  .then(function(dbNote) {
	    res.json(dbNote);
	   });
	},

	//post/create a note in db
	create: function(req, res) { //posts (creates) a NEW note within the database
	    db.Note
	      .create(req.body)
	      .then(function(dbNote) {
	        res.json(dbNote);
	    });
	},

	//delete the note by ID
  	delete: function(req, res) {
	    db.Note
	      .remove({ _id: req.params.id })
	      .then(function(dbNote) {
	        res.json(dbNote);
	    });
	}
};