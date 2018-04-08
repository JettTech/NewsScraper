//Dependencies:
//=================================================
var axios = require("axios");//Scraping-Tool Dependency
var cheerio = require("cheerio"); //Scraping-Tool Dependency


//Scrape Logic:
//=================================================
 var scrape = function() {
 	
 	//1.) Accss Website of choice:
 	//"https://www.bizjournals.com/austin/datacenter/lists/all/"
 	return axios.get("https://www.bizjournals.com/austin/industry-news/technology") 
 	
 	//2.) preform Scrape...
 	.then(function(res) {
		var $ = cheerio.load(res.data); //This turns the cheerio selector into $, which is familiar through jQuery.  We can construct cheerio similar to the known jQuery through use of this "$" (shorthand) selector.	
 		var articles = []; //This will be the arrary into which we'll send all the data we'd like to scape in organized variables that relate ot the DB Fields and (their) Collections (ie: Models and Columns);

 		// $("div.item__body").each(function(i, element) {	
		 //    var listTitle = $(element).children().first().find("strong").text().trim();
		 //    var listRanker = $(element).children().find("div.item__subhead").text().trim();
		 //    var link = $(element).find("a").attr("href");


 		$("div.cropped").each(function(i, element) {	
			var title = $(element).parent().parent().parent().children("div.item__body").find("h3.item__title").text().trim();
			var image = $(element).children("img").attr("src");
			var url = $(element).parent().parent().parent().attr("href");
 
	      if (image && title && url) {
	        var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
	        var fullURL = "https://www.bizjournals.com/" + url;

	        // Initialize an object we will push to the articles array
	        var dataToAdd = {
	          img: image,
	          title: titleNeat,
	          link: fullURL
	        };

        	articles.push(dataToAdd);
	 	  }
 		});
 		console.log("These are the scraped-article results (still inside Scrape.js): ");
 		console.log(articles);

 		return articles; //Send back the results for backend to access
 	});

 };
 // Export the function, so other backend files can access/use it
 module.exports = scrape;