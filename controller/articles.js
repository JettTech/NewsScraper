//================================================================================================================
//Controller: Purpose Note - relays information/connects logic between the DB/Models and the views/frontend-JS 
//================================================================================================================

//Local Files:
//=================================================
var db = require("../models");


// Articles Controller Logic:
//=================================================
module.exports = {
    findAll: function(req, res) { //GET >> should RETRIEVE ALL the data from the database/models (and therefore needs to accwss the models directory/ article model in the Article.js file)!!
        db.Article
            .find(req.query)
             //The .sort mongoose method will SORT starting from most recent (sorted by date) >>ref Mongoose documentation.
            .sort({date: -1})
            .then(function(dbArticle) {
                res.json(dbArticle);
            });
    },

    findOne: function(req, res) {     
        db.Article
            .findOne(
                { _id: req.params.id }
            )
            .then(function(dbArticle) {
                console.log("hey this is dbArticle: ");
                console.log(dbArticle);
                res.json(dbArticle);
            });
    }, 

    update: function(req, res) { //UPDATE >> should RETRIEVE and MODIFY PRE-EXISTING DATA in the database/models for ALL MENTIONED data-itmes (and therefore needs to accwss the models directory/ article model in the Article.js file)!!
        
        db.Article
            .findOneAndUpdate(
                { _id: req.params.id },
                { $set: {saved : true} },
                { new: true}
            )
            .then(function(dbArticle) {
                console.log("hey this is dbArticle: ");
                console.log(dbArticle);
                res.json(dbArticle);
            });
    },

    delete: function(req, res) { //delete >> should RETRIEVE AND REMOVE ALL / ALL MENTIONED the data in the database/models(and therefore needs to accwss the models directory/ article model in the Article.js file)!!   
        db.Article
            .remove({ _id: req.params.id })
            .then(function(dbArticle){
                res.json(dbArticle);
            });
    }
};