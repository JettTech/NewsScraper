//Controller - relays information/connects logic between the DB/Models and the views/frontend-JS 
//=================================================================================================
//Internal Imports/Requires:
//=================================================
// Importing the Models (both the Article and Notes - as Notes is merged into Artilce)
var models = require("../models/Article.js"); //the MODLE OBJECT!!

// importing the Script files:
var scrape = require("../scripts/scrape"); //the scraped data from the website
var makeDate = require("../scripts/date"); //current date function >> to use when no date returend from scrate.date ... 


//  (Article) Controller Logic:
//=================================================
// Article SCRAPE function INVOCATION && RESULTS Access: //////////////////////////////////////////////////////////////////
fetch: function(callback) { //FETCH >> should PREFORM A NEW SCRAPE (...and therefore needs to access the scape.js file and functio)!!
	scrape(function(data){
		//the "data" here is the results ARRAY OBJECT passed as the parameter for the callback function.  The function is not being called here, and data now REFERENCES the callback parameter, hence the Articles Array Object.
		
		var articleLog = data; //name a varible to clarify what the data represents
		console.log("This should be the article data: " + data);

		articleLog.forEach( function(story) {
			story.saved = false;
			
			if(story.date === null || story.date === "" || story.date === undefined) {
				story.date = makeDate //assigning story.date the current date value created in the generateDate function in date.js
				console.log("we added a the current date to this story: " + story.date);
			else{
				console.log("this is the current story's date: " + story.date);
			}

			}
		});

	});
};

// DB ACCESS: //////////////////////////////////////////////////////////////////
get: function(callback) { //GET >> should RETRIEVE ALL the data from the database/models (and therefore needs to accwss the models directory/ article model in the Article.js file)!!
	models(function(data){
		//the "data" here is the results ARRAY OBJECT passed as the parameter for the callback function.  The function is not being called here, and data now REFERENCES the callback parameter, hence the Articles Array Object.
		
	});
};

post: function(callback) { //POST >> should SEND NEW SETS of DATA into the database/models (and therefore needs to access the models directory/ article model in the Article.js file)!!
	
	models(function(data){
		//the "data" here is the results ARRAY OBJECT passed as the parameter for the callback function.  The function is not being called here, and data now REFERENCES the callback parameter, hence the Articles Array Object.
		
	});
};

update: function(callback) { //UPDATE >> should RETRIEVE and MODIFY PRE-EXISTING DATA in the database/models for ALL MENTIONED data-itmes (and therefore needs to accwss the models directory/ article model in the Article.js file)!!	
	models(function(data){
		//the "data" here is the results ARRAY OBJECT passed as the parameter for the callback function.  The function is not being called here, and data now REFERENCES the callback parameter, hence the Articles Array Object.
		
	});
};

delete: function(callback) { //delete >> should RETRIEVE AND REMOVE ALL / ALL MENTIONED the data in the database/models(and therefore needs to accwss the models directory/ article model in the Article.js file)!!	
	models(function(data){
		//the "data" here is the results ARRAY OBJECT passed as the parameter for the callback function.  The function is not being called here, and data now REFERENCES the callback parameter, hence the Articles Array Object.
		
	});
};