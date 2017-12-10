//Controller:Note - relays information/connects logic between the DB/Models and the views/frontend-JS 
//=================================================================================================


//Internal Imports/Requires:
//=================================================
// Importing the Models (both the Article and Notes - as Notes is merged into Artilce)
var models = require("../models/Note.js"); //the MODLE OBJECT!!
// importing the Script files:
var makeDate = require("../scripts/date"); //current date function >> to use when no date returend from scrate.date ... 


//  (Notes) Controller Logic:
//=================================================
module.exports = {

}

get: function(data, callback){
	models.find(
		....
	)
};

post: function(data, callback) {
	//DATA here will be ==== all the information taken from the NOTE CREATION on the public director >> index.js file.
	var newNote = {
		author: data.author, //these data VARs are created and passed through from the Public Directory's Article.js Script
		title: data.title,
		body: data.body,
		date: makeDate(),
		article_ID: data._id
	};

	Note.create(newNote, function(error, noteData) {
		if(error) console.log(error);
		console.log(noteDate);
		callback(noteData;)// Pass through the noteData into the callback function to use it on separate docs and to use with other functions asynchronously.
	});
};

update: //"save/unsave" note, "update author", "update TITLE", "update Note text",.... but don't delete note/article from article database

delete: