var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema ({
	author: {
		type: String,
		required: true
	},

	title: {
		type: String,
		required: true
	},

	body: String
});
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;