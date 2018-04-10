var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema ({
	// article_ID is the article associate with the note
	_article_Id: {
		type: Schema.Types.ObjectId,
		ref: "Article"
	},

	noteText: String,

	date: {
		type: Date,
		default: Date.now
	}
});
var Note = mongoose.model("Note", NoteSchema);
module.exports = Note;