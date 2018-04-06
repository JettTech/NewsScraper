//DEPENDENCIES:
//===============================================
var router = require("express").Router();

//HTML Routes:
//===============================================
// This route redirects the server to the handlebars homepage
router.get("/", function(request, response){
	response.redirect("/articles");
});

// This route renders the handlebars homepage
router.get("/articles", function(request, response){
	response.render("homePage.handlebars");
});

// This route renders the saved articles handledbars page
router.get("/saved", function(request, response){ //get ALL SAVED articles
	response.render("articleSaved.handlebars");
});

module.exports = router;

