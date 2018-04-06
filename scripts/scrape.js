//Dependencies:
//=================================================
var logger = require("morgan");//Scraping-Tool Dependency
var axios = require("axios");//Scraping-Tool Dependency
var cheerio = require("cheerio"); //Scraping-Tool Dependency

//Local Files:
//=================================================
var makeDate = require("./generateDate"); //current date function >> to use when no date returend from scrate.date ... 


//Scrape Logic:
//=================================================
 var scrape = function() {
 	
 	return axios.get("https://www.bizjournals.com/austin/") 	
 	.then(function(error,res) {
 		if(error) throw error;
		var $ = cheerio.load(res.data); //This turns the cheerio selector into $, which is familiar through jQuery.  We can construct cheerio similar to the known jQuery through use of this "$" (shorthand) selector.	
 		var articles = []; //This will be the arrary into which we'll send all the data we'd like to scape in organized variables that relate ot the DB Fields and (their) Collections (ie: Models and Columns);

  		$("h3.item__title").each(function(i, element) {	
 			var title = $(element).text().trim();
 			var date = $(element).parent("div").next().find("time").find("i").text().trim();
 			var img = $(element).parent("div").parent("div").find("div.item__media").find("div.cropped").attr("src");
 			// var link = $(element).parent().next().find("a.title-link").attr("href");
 			// var body = $(element).parent().next().find("p.pigeon-item__summary").text().trim();

        	var newsItems = {	
        		title: title,
        		date: date,		
	 			img: img,
	 			// link: link,
	 			// body: body
	 		};
	 		console.log("These are the newsItems - inside the scrape.js - : ");
	 		console.log(newsItems);

	 		function cleanUp(item) {
	 			if (item === undefined || item === "") {
	 				return item === "none available";
	 			}
	 			else {
	 				// !! Regex >> REMOVES extra lines/Spacing/Tabs/etc.. to increase clean up data returned (ie. increase "typographical cleanliness").
	 				return item = item.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
	 			}
	 		};

	 		function checkDate(date) {
				if (date === null || date === "" || date === undefined) {
				    date = makeDate //assigning story.date the current date value created in the generateDate function in date.js
				    console.log("we added a the current date to this story: " + date);
					
					return date = date.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
	 			}
	 		};

	 		var titleClean = cleanUp(title);
	 		var date = checkDate(date);
	 		var imgClean = cleanUp(img);	 		
	 		// var bodyClean = cleanUp(body);

        	var cleanedItems = {
        		saved: false,
	 			title: titleClean,
	 			date: date,
	 			img: imgClean,
	 			// link: link,
	 			// body: bodyClean,
	 		};
			console.log("\nThese are the cleanedItems: ");
	 		console.log(cleanedItems);
	 		console.log("\n\n");

	 		articles.push(cleanedItems);
 		});
 		// console.log("These are the scraped-article results (still inside Scrape.js): ");
 		// console.log(articles);

 		return articles; //Send back the results (once processed) to the CallBack function, which is passed into the scrape function being exported as a module...
 	});

 };
 // Export the function, so other backend files can access/use it
 module.exports = scrape;