//Dependencies:
//=================================================
var logger = require("morgan");//Scraping-Tool Dependency
var cheerio = require("cheerio"); //Scraping-Tool Dependency
var request = require("request"); //>>REVIEW THE PURPOSE OF THIS dependency AGAIN...

//Scrape Logic:
//=================================================
 var scrape = function() {

 	request("http://www.bbc.com/news/world", function(error, response, body) {
 		//Note: above, the reference to body is the ACTUAL HTML on the page reference in the URL. This will now be loaded into the Cheerio NPM Package.
 		var $ = cheerio.load(body); //This turns the cheerio selector into $, which is familiar through jQuery.  We can construct cheerio similar to the known jQuery through use of this "$" (shorthand) selector.

 		var articles = []; //This will be the arrary into which we'll send all the data we'd like to scape in organized variables that relate ot the DB Fields and (their) Collections (ie: Models and Columns);

 		$("div.pigeon__column pigeon__column--a").each(function(i, element) {		
 			var img = $(element).children().attr("src");
 			var title = $(element).class("pigeon-item__body").find("a").find("h3").find("span").text();
	 		var link = $(element).class("pigeon-item__body").find("a").attr("href");
	 		var descripton = $(element).class("pigeon-item__body").find("p").text();
	 		var date = $(element).class("pigeon-item__body").class("pigeon-item__info-list").find("ul").find("li").find("div").attr("data-datetime");

	 		var newsItems = {
	 			img: img,
	 			title: title,
	 			link: link,
	 			descripton: descripton,
	 			date: date
	 		};
	 		console.log("These are the newsItems: " + newsItems);
	 		results.push(newsItems);
 		});
 		console.log("These are the results: " + results);

 	});
 	
 };
 module.exports = scrape;