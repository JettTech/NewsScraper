var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object..
// .., this is similar to a Sequelize model ~= to SQL Table
var ArticleSchema = new Schema ({
		title: {
			type: String,
			unique: false,
			require: true
		},

		link: {
			type: String,
			required: true
		},

		img: {
			type: String,
			required: true
		},

		description: {
			type: String,
			required: true
		},

		// note_ID: { //can I import the Note ID here... AND import the ID for the article in the Notes Schmea?
		// 	type: Schema.Types.ObjectId,
		// 	ref: "Note"
		// },
		  // `Note` is an Mongoose object (model), and therefore creates and stores a Note_id for every object on the Note Model.
  			// The ref property links the ObjectId to the Note model
  				// This allows us to populate the Article with an associated Note Model

  		aside: {
			type: String,
			required: false,
			default: ""
		},

  		saved: {
			type: Boolean,
			default: false
		},

		date: {
			type: Date,
			required: false
		}
});
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;