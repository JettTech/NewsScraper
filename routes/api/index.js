//DEPENDENCIES:
//===============================================
var router = require("express").Router();

//Local Files:
//===============================================
var fetchRoutes = require("./fetch");
var noteRoutes = require("./notes");
var articleRoutes = require("./articles");

//API Routes:
//===============================================
//at this point, the uri address === "/api/fetch"
router.use("/fetch", fetchRoutes);
//at this point, the uri address === "/api/notes"
router.use("/notes", noteRoutes);
//at this point, the uri address === "/api/articles"
router.use("/articles", articleRoutes);

module.exports = router;



///////////////////////////////////////////////////////////////////////////
// Importing the Scrape function from "Scripts" folder/directory:
// var scrape = require("../scripts/scrape.js");

// importing the controller files:
// var articlesController = require("../controller/articles.js");
// var notesController = require("../controller/notes.js");
// var scrape = require("../scripts/scrape"); //the scraped data from the website
///////////////////////////////////////////////////////////////////////////



