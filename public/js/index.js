$(document).ready(function(){      
	initApp();

	var articleContainer = $("#article-container");
	$(document).on("click", ".savedBtn", handleArticleSave);
	$(document).on("click", ".scrapeArticles", handleArticleScrape);
	$(document).on("click", ".homeBtn", handleArticleHome);    

 // ==================================================
 // Intialize App Logic
 // ==================================================
  function initApp() {
    // Empty the article container, and run an AJAX request for all articles (saved and unsaved)
    // articleContainer.empty();
    $.get("/api/articles").then(function(data) {
      // If we have headlines, render them to the page
      if (data && data.length) {
        console.log("This is the data object, which should refect the articles scrapped"); 	
     	console.log(data);
        // THEN the articles should post / show via the handlebars object passed into the index views express router function.
      }
      else {
        // Otherwise notify user that no articles are avail, and offer to preferm scrape
        renderEmptyMessage();
      }
    });
  }

 ///////////////////////
  function renderEmptyMessage() {
    // Creates user message re: lack of articles
    // (Using a joined array of HTML string data rather than a concatenated string for improved data readability/manipulation...)
    var emptyAlert = $(
      [
        "<div id='emptyAlertMsg' class='warning-alert text-center'>",
        "<h4>Oh, no... It looks like we don't yet have any new articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrapeArticles btn'>Scrape for New Articles!</a></h4>",
        "<h4><a href='/saved'>Visit the Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    // Append message to the page
    articleContainer.append(emptyAlert);
  }

 // ==================================================
 // Article Scrape Logic
 // ==================================================
	function handleArticleScrape(){
		$.get("/api/fetch") //this should return the JSON message created with the article scraped number, as created in the fetch.js file
	        .then(function(data) {
	          bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "<h3>");
	          console.log("Load was preformed. 'data.message' = ");
	          console.log(data.message); 
	    });
	}
      
 // ==================================================
 // Home Article Logic
 // ==================================================
	function handleArticleHome(){
		$.get("/articles")
	        .then(function(data) {
	          initApp();
	          console.log("redirecting to the Homepage");
	    });
	}

 // ==================================================
 // Save Article Logic
 // ==================================================	
	function handleArticleSave(){
		var articleToSave = $(this).parent()._id
		var newData = articleToSave.saved = true;
		console.log("articleToSave =" + articleToSave);

		$.ajax({
		      method: "PUT",
		      url: "/api/articles/" + articleToSave,
		      data: newData
		}).then(function (data) {
			if (data.saved) {
				// window.location.pathname = "/saved";
				$.get("/saved")
					.then(function(data) {
						console.log("redirecting to the saved page...")
					});
			}
		});	  	
	}
});