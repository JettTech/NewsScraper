$(document).ready(function() {
  // Setting a reference to the article-container div where all the dynamic content will go
  // Adding event listeners to any dynamically generated "save article"
  // and "scrape new article" buttons
  var articleContainer = $(".article-container");
  $(document).on("click", ".btn.save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);

  // Once the page is ready, run the initPage function to kick things off
  initPage();

  function initPage() {
    // Empty the article container, run an AJAX request for any unsaved articles
    articleContainer.empty();
    $.get("/api/articles?saved=false").then(function(data) {
      // If we have articles in the db, render them to the page
      if (data && data.length) {
        renderArticles(data);
      }
      else {
        // Otherwise render a message explaing we have no articles
        renderEmpty();
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
        "<div class='col-sm-12 col-md-6 col-lg-4 flip-container'>",
        "<div class='card flipper'>",
        "<div class='card-image front waves-effect waves-block waves-light'>",
        "<img id='data-" + article.img + "' src= '" + article.img + "' height='300px' style='z-index:2px;'>",
        "<h4 class='text-center' style='color:white'>",
        "<i class='material-icons' style='font-size:3rem'>",
        "info_outline",
        "</i>",
        "</h4>",
        "</div>",
        "<div class='card-content'>",
        "<div class='panel-heading text-center back'>",
        "<h4>",
        "<a class='article-link' target='_blank' href='" + article.link + "'>",
        article.title,
        "</a>",
        "</h4>",
        "<br/>",
        "<a  target='_blank' href='" + article.link + "' class='btn btn-large btn-success link'>",
        "Visit Article",
        "</a>",
        "<a class='btn btn-large btn-success save' id='" + article._id + "'>",
        "Save Article",
        "</a>",
        "</div>",
        "</div>",
        "</div>"
      ].join("")
    );
    // panel.data("_id", article._id);
    return panel;
  }

  function renderEmpty() {
    // This function renders some HTML to the page explaining we don't have any articles to view
    // Using a joined array of HTML string data because it's easier to read/change than a concatenated string
    var emptyAlert = $(
      [
        "<div class='alert alert-warning text-center'>",
        "<h4>Uh Oh. It looks like we don't have any new articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What Would You Like To Do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
        "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
        "</div>",
        "</div>"
      ].join("")
    );
    // Appending this data to the page
    articleContainer.append(emptyAlert);
  }

  function handleArticleSave() {
    // This function is triggered when the user wants to save an article
    var articleToSaveID = $(this).attr("id");
    // Using a patch method to be semantic since this is an update to an existing record in our collection
    $.ajax({
      method: "PUT",
      url: "/api/articles/" + articleToSaveID,
      body: articleToSaveID
    }).then(function(data) {
      // If the data was saved successfully
        console.log("articleToSave info: ");
        console.log(articleToSaveID);
        console.log("data : ");
        console.log(data);
        initPage();
    });
  }

  function handleArticleScrape() {
    // This function handles the user clicking any "scrape new article" buttons
    $.get("/api/fetch").then(function(data) {
      // If we are able to succesfully scrape the NYTIMES and compare the articles to those
      // already in our collection, re render the articles on the page
      // and let the user know how many unique articles we were able to save
      initPage();
      bootbox.alert("<h3 class='text-center'> Nice choice. Check out your scrapes! <h3>");
      // can alternatively use the returned message above..: "+ data.message +""
    });
  }
});