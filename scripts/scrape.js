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
 	
 	//1.) Accss Website of choice:
 	// try below scrape with THIS URL:"https://www.bizjournals.com/austin/" with className: "h3.item__title"
 	return axios.get("http://www.bbc.com/news/world")
 	
 	//2.) preform Scrape...
 	.then(function(error, res) {
 		if(error) throw error;

		var $ = cheerio.load(res.data); //This turns the cheerio selector into $, which is familiar through jQuery.  We can construct cheerio similar to the known jQuery through use of this "$" (shorthand) selector.	
 		var articles = []; //This will be the arrary into which we'll send all the data we'd like to scape in organized variables that relate ot the DB Fields and (their) Collections (ie: Models and Columns);

  		$("div.responsive-image").each(function(i, element) {	
  			var title = $(element).parent().next().text().trim();
 			var img = $(element).children("img").attr("src");
 			var link = $(element).parent().next().find("a.title-link").attr("href");
 			var description = $(element).parent().next().find("p.pigeon-item__summary").text();
	 		var aside = $(element).parent().next().next().text().trim();
	 		var date = $(element).parent().next().find("div.pigeon-item__info-list").children('ul').first().children('div.date date--v2 relative-time').text(); //.attr("data-datetime") //.data(datetime)

        	var newsItems = {	
        		title: title,
        		img: img,
	 			link: link,
	 			description: description,
	 			aside: aside,
        		date: date
	 		};
	 		// console.log("These are the newsItems - inside the scrape.js - : ");
	 		// console.log(newsItems);

	 		// As long as title, img, link, and desc exist, clean up and push into article array
	      	if (title && img && link && description || title && img && link && aside) {
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
		 		var imgClean = cleanUp(img);
		 		var date = checkDate(date)

		 		var cleanedItems = {
	        		saved: false,
		 			title: titleClean,
		 			img: imgClean,
		 			link: link,
		 			date: date
		 		};;	 		
		 				
		 		if(description) {
		 			var descriptionClean = cleanUp(description);
		 			cleanedItems.description = descriptionClean;
		 		}
		 		else if (aside) {
		 			var aside = cleanUp(aside);
		 			cleanedItems.aside = asideClean;
		 		}
		 		
				console.log("\nThese are the cleanedItems: ");
		 		console.log(cleanedItems);
		 		console.log("\n\n");

		 		articles.push(cleanedItems);
	 		}
 		});
 		// console.log("These are the scraped-article results (still inside Scrape.js): ");
 		// console.log(articles);

 		return articles; //Send back the results (once processed) to the CallBack function, which is passed into the scrape function being exported as a module...
 	});

 };
 // Export the function, so other backend files can access/use it
 module.exports = scrape;