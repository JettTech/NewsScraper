//Dependencies:
//=================================================
var logger = require("morgan");//Scraping-Tool Dependency
var cheerio = require("cheerio"); //Scraping-Tool Dependency
var request = require("request"); //>>REVIEW THE PURPOSE OF THIS dependency AGAIN...

//Scrape Logic:
//=================================================
 var scrape = function(callback) {

 	request("http://www.bbc.com/news/world", function(error, response, body) {
 		//Note: above, the reference to body is the ACTUAL HTML on the page reference in the URL. This will now be loaded into the Cheerio NPM Package.
 		var $ = cheerio.load(body); //This turns the cheerio selector into $, which is familiar through jQuery.  We can construct cheerio similar to the known jQuery through use of this "$" (shorthand) selector.

 		var articles = []; //This will be the arrary into which we'll send all the data we'd like to scape in organized variables that relate ot the DB Fields and (their) Collections (ie: Models and Columns);

 		$("div.pigeon__column pigeon__column--a").each(function(i, element) {		
 			var img = $(element).children("pigeon-item__image").children("responsive-image").find("img").attr("src");
 			var title = $(element).children("pigeon-item__body").find("a").find("h3").find("span").text().trim();
	 		var link = $(element).children("pigeon-item__body").find("a").attr("href");
	 		var description = $(element).children("pigeon-item__body").find("p").text().trim();
	 		var date = $(element).children("pigeon-item__body").children("pigeon-item__info-list").find("ul").find("li").find("div").attr("data-datetime");

	 	// !! Regex >> REMOVES extra lines/Spacing/Tabs/etc.. to increase clean up data returned (ie. increase "typographical cleanliness").
	 		var imgClean = img.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        	var titleClean = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        	var linkClean = link.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        	var descriptionClean = description.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        	var dateClean = date.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        	var newsItems = {
	 			img: imgClean,
	 			title: titleClean,
	 			link: linkClean,
	 			descripton: descriptionClean,
	 			date: dateClean
	 		};
	 		console.log("These are the newsItems: " + newsItems);
	 		articles.push(newsItems);
 		});

 		console.log("These are the results: " + articles);
 		callback(articles); //Send back the results (once processed) to the CallBack function, which is passed into the scrape function being exported as a module...
 	});
 	
 };
 module.exports = scrape;