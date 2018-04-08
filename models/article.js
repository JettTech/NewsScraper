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
			required: false
		},

		img: {
			type: String,
			required: false
		},

		description: {
			type: String,
			required: false
		},
		
  		saved: {
			type: Boolean,
			default: false
		},
		
		// date is a string
		date: {
			type: Date,
			required: false
		}
});
var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;