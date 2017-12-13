//Controller:Note - relays information/connects logic between the DB/Models and the views/frontend-JS 
//=================================================================================================


//Internal Imports/Requires:
//=================================================
// Importing the Models (both the Article and Notes - as Notes is merged into Artilce)
var models = require("../models/Note.js"); //the MODLE OBJECT!!
var articleModel = require("../models/Note.js");
// importing the Script files:
var makeDate = require("../scripts/date"); //current date function >> to use when no date returend from scrate.date ... 


//  (Notes) Controller Logic:
//=================================================
module.exports = {
	get: function(query, callback){ //finds all notes with the article-id provided in the URL id, OR ALL, by default, ALL the notes...
		models.find(
			{article_ID: query._id},
			callback
		);
	},

	getOne: function(query, callback){ //finds all notes with the note-id provided in the URL id, OR ALL, by default, ALL the notes...
		models.find(
			{_id: query._id}, //will "this" reference the Notes model here??
			callback
		);
	},

	post: function(query, callback) { //posts (saves) NEW note to the database
		//Query here will be ==== all the information taken from the NOTE CREATION on the public director >> index.js file.
		var newNote = {
			author: query.author, //these "query"-VARs are created and passed through from the Public Directory's Article.js Script
			title: query.title,
			body: query.body,
			date: makeDate(),
			article_ID: query._id
		};

		Note.create(newNote)
			.then(function(noteData) {
				articleModel.findOneAndUpdate(
					{_id: query._id},
					{note: note._id}, // !! is this the correct way to display the way that the Note's ID will look? !!
					{new: true}
				);

				console.log(noteDate);
				callback(noteData)// Pass through the noteData into the callback function to use it on separate docs and to use with other functions asynchronously.
			})
			.catch(function(error){
				throw error;
			})
	},

	update: function(query, callback) { //"save/unsave" note, "update author", "update TITLE", "update Note text",.... but don't delete note/article from article database
        //the "query" here is the "req.params.id", which was sent over from the ROUTER.JS file.  Because the query is "req.body" AND NOT "req.params.id", the IDs for the NOTE to update still needs to be determined...
        models.update(
            { _id: query._id },
            { $set: query }, //set the updated FIELD DATA to be equal to any new DATA/VALUES we pass in on QUERY
            null,
            callbackFunc
        );
	},

	delete: function(query, callback) {
		models.remove(
			{_id: query._id},
			callback
		);
	}
};


//if wished to create route that would only show notes for specfiic article:
                // if (articleLog._id === null || articleLog._id === "" || articleLog._id === undefined) {
                //    story.note_ID = "",
                //    console.log("Sorry there are no Notes at this time - no NOTE ID can be found: " + data._id);
                // } 
                // else {
                //     story.note_ID = articleLog._id, //VERIFY this is sendind the correct id! >> aligns with Note ID!//
                //     console.log("we added a the Note ID to this story (article): " + story.note_ID);
                // };