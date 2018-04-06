//================================================================================================================
//Controller: Purpose Note - relays information/connects logic between the DB/Models and the views/frontend-JS 
//================================================================================================================

//Local Files:
//=================================================
var db = require("../models"); //the MODLE OBJECT!!


// Articles Controller Logic:
//=================================================
module.exports = {
    findAll: function(req, res) { //GET >> should RETRIEVE ALL the data from the database/models (and therefore needs to accwss the models directory/ article model in the Article.js file)!!
        db.Article
            .find(req.query)
            .sort({
                    date: -1 //This will SORT starting from most recent (sorted by date) >>ref Mongoose documentation.
            })
            // .populate("note_ID") //populate all of the notes associated with it;
            .then(function(dbArticle) {
                res.json(dbArticle);
            });
    },

    update: function(req, res) { //UPDATE >> should RETRIEVE and MODIFY PRE-EXISTING DATA in the database/models for ALL MENTIONED data-itmes (and therefore needs to accwss the models directory/ article model in the Article.js file)!!
        db.Article
            .findOneAndUpdate(
                { _id: req.params._id },
                { $set: req.body }, //set the updated FIELD DATA to be equal to any new DATA/VALUES we pass in on QUERY
                { new: true })
            .then(function(dbArticle) {
                res.json(dbArticle);
            });
    },

    delete: function(req, res) { //delete >> should RETRIEVE AND REMOVE ALL / ALL MENTIONED the data in the database/models(and therefore needs to accwss the models directory/ article model in the Article.js file)!!   
        db.Article
            .remove({ _id: req.params._id })
            .then(function(dbArticle){
                res.json(dbArticle);
            });
    }
};