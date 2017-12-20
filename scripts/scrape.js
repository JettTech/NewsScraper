//Dependencies:
//=================================================
var logger = require("morgan");//Scraping-Tool Dependency
var cheerio = require("cheerio"); //Scraping-Tool Dependency
var request = require("request"); //>>REVIEW THE PURPOSE OF THIS dependency AGAIN...

//Scrape Logic:
//=================================================
 var scrape = function(callback) {

 	request("http://www.bbc.com/news/world", function(error, response, body) {
 		if(error) throw error;

 		//Note: above, the reference to body is the ACTUAL HTML on the page to scrape, >>referenced in the URL. This will now be loaded into the Cheerio NPM Package.
 		var $ = cheerio.load(body); //This turns the cheerio selector into $, which is familiar through jQuery.  We can construct cheerio similar to the known jQuery through use of this "$" (shorthand) selector.
 		var articles = []; //This will be the arrary into which we'll send all the data we'd like to scape in organized variables that relate ot the DB Fields and (their) Collections (ie: Models and Columns);

  		$("div.responsive-image").each(function(i, element) {	
 			var title = $(element).parent().next().text().trim();
 			var img = $(element).children("img").attr("src");
 			var link = $(element).parent().next().find("a.title-link").attr("href");
 			var description = $(element).parent().next().find("p.pigeon-item__summary").text();
	 		var aside = $(element).parent().next().next().text().trim();

        	var newsItems = {			
	 			img: img,
	 			title: title,
	 			link: link,
	 			descripton: description,
	 			aside: aside
	 		};
	 		// console.log("These are the newsItems: ");
	 		// console.log(newsItems);

	 		function cleanUp(item) {
	 			if (item === undefined || item === "") {
	 				return item === "none available"; //does this return as "false" instead?? >>> is that a REGEX or MONGO/MONGOOSE action??
	 			}
	 			else {
	 					// !! Regex >> REMOVES extra lines/Spacing/Tabs/etc.. to increase clean up data returned (ie. increase "typographical cleanliness").
	 				return item = item.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
	 			}
	 		};
	 		
	 		var imgClean = cleanUp(img);
	 		var titleClean = cleanUp(title);
	 		var linkClean = cleanUp(link);
	 		var descriptionClean = cleanUp(description);
	 		var asideClean = cleanUp(aside);

        	var cleanedItems = {
	 			img: imgClean,
	 			title: titleClean,
	 			link: linkClean,
	 			descripton: descriptionClean,
	 			aside: asideClean
	 		};
			// console.log("\nThese are the cleanedItems: ");
	 		// console.log(cleanedItems);
	 		// console.log("\n\n");

	 		articles.push(cleanedItems);
 		});
 		console.log("These are the scraped-article results (still inside Scrape.js): ");
 		// console.log(articles);

 		callback(articles); //Send back the results (once processed) to the CallBack function, which is passed into the scrape function being exported as a module...
 	});
 	
 };
 module.exports = scrape;
