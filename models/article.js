var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object..
// .., this is similar to a Sequelize model ~= to SQL Table
var ArticleSchema = new UserSchema ({
		title: {
			type: String,
			unique: true,
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

		descriptionShort: {
			type: String,
			required: true
		},

		descriptionFull: String,

		note: {
			type: Schema.Types.ObjectId,
			ref: "Note"
		},
		  // `Note` is an Mongoose object (model), and therefore stores its own Note id
  			// The ref property links the ObjectId to the Note model
  				// This allows us to populate the Article with an associated Note Model

  		saved: {
			type: Boolean,
			default: false
		}

		date: {
			type: date,
			required: false
		}
});
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

