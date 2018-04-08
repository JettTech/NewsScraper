var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object..
// .., this is similar to a Sequelize model ~= to SQL Table
var ArticleSchema = new Schema ({
		title: {
			type: String,
			unique: {index:{ unique: true }},
			required: true
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
		
  		saved: {
			type: Boolean,
			default: false
		},
		
		date: {
			type: Date,
			default: Date.now
		}
});
var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;