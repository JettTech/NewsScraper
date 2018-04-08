$(document).ready(function(){      
	initApp();

	var articleContainer = $("#article-container");
	$(document).on("click", ".btn.save", handleArticleSave);
	$(document).on("click", ".scrape-new", handleArticleScrape);   

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

  function renderArticles(articles) {
    // This function handles appending HTML containing our article data to the page
    // We are passed an array of JSON containing all available articles in our database
    var articlePanels = [];
    // We pass each article JSON object to the createPanel function which returns a bootstrap
    // panel with our article data inside
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
    // Once we have all of the HTML for the articles stored in our articlePanels array,
    // append them to the articlePanels container
    articleContainer.append(articlePanels);
  }

  function createPanel(article) {
    // This functiont takes in a single JSON object for an article/headline
    // It constructs a jQuery element containing all of the formatted HTML for the
    // article panel
    var panel = $(
      [
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        "<a class='article-link' target='_blank' href='" + article.url + "'>",
        article.headline,
        "</a>",
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summary,
        "</div>",
        "</div>"
      ].join("")
    );
    // Attach the article's id to the jQuery element
    // This will be used when trying to figure out which article the user wants to save
    panel.data("_id", article._id);
    // Return constructed panel jQuery element
    return panel;
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
 // Save Article Logic
 // ==================================================	
	function handleArticleSave(){hat.
	    var articleToSave = $(this)
	      .parents(".panel")
	      .data();
	    articleToSave.saved = true;
	    // Using a patch method to be semantic since this is an update to an existing record in our collection
	    $.ajax({
	      method: "PUT",
	      url: "/api/articles/" + articleToSave._id,
	      data: articleToSave
	    }).then(function(data) {
	      // If the data was saved successfully
	      if (data.saved) {
	        // Run the initPage function again. This will reload the entire list of articles
	        initPage();
	      }
	    });
   }
});