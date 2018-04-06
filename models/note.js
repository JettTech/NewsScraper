var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema ({
	// article_ID is the article associate with the note
	article_ID: {
		type: Schema.Types.ObjectId,
		ref: "Article"
	},

	author: {
		type: String,
		required: true
	},

	title: {
		type: String,
		required: true
	},

	body: String,

	date: {
		type: String,
		required: true
	}
});
var Note = mongoose.model("Note", NoteSchema);
module.exports = Note;