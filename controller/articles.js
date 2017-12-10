//Controller: Articles - relays information/connects logic between the DB/Models and the views/frontend-JS 
//=================================================================================================


//Internal Imports/Requires:
//=================================================
// Importing the Models (both the Article and Notes - as Notes is merged into Artilce)
var models = require("../models/Article.js"); //the MODLE OBJECT!!

// importing the Script files:
var scrape = require("../scripts/scrape"); //the scraped data from the website
var makeDate = require("../scripts/date"); //current date function >> to use when no date returend from scrate.date ... 


//  (Articles) Controller Logic:
//=================================================
module.exports = {
    // Article SCRAPE function INVOCATION && RESULTS Access: //////////////////////////////////////////////////////////////////
    fetch: function(callback) { //FETCH >> should PREFORM A NEW SCRAPE (...and therefore needs to access the scape.js file and functio)!!
        scrape(function(data) {
            //the "data" here is the results ARRAY OBJECT passed as the parameter for the callback function.  The function is not being called here, and data now REFERENCES the callback parameter, hence the Articles Array Object.

            var articleLog = data; //name a varible to clarify what the data represents
            console.log("This should be the article data: " + articleLog);

            articleLog.forEach(function(story) {
                story.saved = false; //saved is now a Boolean key (column) in our object model (db table)                

                if (articleLog._id === null || articleLog._id === "" || articleLog._id === undefined) {
                   story.note_ID = "",
                   console.log("Sorry there are no Notes at this time - no NOTE ID can be found: " + data._id);
                } 
                else {
                    story.note_ID = articleLog._id, //VERIFY this is sendind the correct id! >> aligns with Note ID!//
                    console.log("we added a the Note ID to this story (article): " + story.note_ID);
                };
                

                if (story.date === null || story.date === "" || story.date === undefined) {
                    story.date = makeDate //assigning story.date the current date value created in the generateDate function in date.js
                    console.log("we added a the current date to this story: " + story.date);
                } 
                else {
                    console.log("this is the current story's date: " + story.date);
                };
            });

 	// !!!NOW POSTING THE SCRAPED DATA TO THE DATABASE!!!!!!

            //NOTE: The use of "models.collection" below, lets us access the native Mongo "insertMany" method.
            // The strategy is to use the Mongo"insertMany" method, instead of the Mongoose "create" method because here we may
            // specify whether this is an ordered or unordered insert >> addit'l note, we DO NOT need to require in BOTH Mongo and Mongoose when referecing these method.. only Mongoose, as it is rooted in Mongo.
            
            models.collection.insertMany(articleLog, { ordered: false }, function(error, docs) {
                callback(error, docs); //PASS BOTH the error and docs from ArticleLog (the Scrape Data) into the callback function for reference and mainpulation when writing View/Display JQUERY/JS.
            });
        });
    };

    // DB ACCESS: //////////////////////////////////////////////////////////////////
    get: function(query, callback) { //GET >> should RETRIEVE ALL the data from the database/models (and therefore needs to accwss the models directory/ article model in the Article.js file)!!
        models.find(query) {
            //the "query" here is the query that specifies which data we would like from the "fetched" (or scraped) data.
            .sort({
                    _id: -1 //This will SORT starting from most recent (sorted by ID num) >>ref Mongoose documentation.
                })
                .exec(function(error, documentCalledBack) {
                    if (error) console.log(error);
                    callback(documentCalledBack) // Once executed (finished), pass the list into the callback function
                })
        };
    };

    get: function(query, callback) { //GET >> should RETRIEVE ALL the data from the database/models (and therefore needs to accwss the models directory/ article model in the Article.js file)!!
        models.findOne({_id: req.params.id}) 
             // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
            //...the params.id refers the ID that is set within the URL
            .populate(note_ID)

            // ..and populate all of the notes associated with it
            .exec(function(error, documentCalledBack) {
                if (error) console.log(error);
                callback(documentCalledBack) // Once executed (finished), pass the list into the callback function
            })
    };

    update: function(query, callbackFunc) { //UPDATE >> should RETRIEVE and MODIFY PRE-EXISTING DATA in the database/models for ALL MENTIONED data-itmes (and therefore needs to accwss the models directory/ article model in the Article.js file)!!	
        //the "query" here is the query that specifies which data we would like to UPDATE in the Database.
        models.update(
            { _id: query._id },
            { $set: query }, //set the updated FIELD DATA to be equal to any new DATA/VALUES we pass in on QUERY
            null,
            callbackFunc);
    };

    delete: function(query, callback) { //delete >> should RETRIEVE AND REMOVE ALL / ALL MENTIONED the data in the database/models(and therefore needs to accwss the models directory/ article model in the Article.js file)!!	
        models.remove(query, callback);
        //the "query" here is the query that specifies which data we would like to DELETE in the Database.
    };
}
