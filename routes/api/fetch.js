//DEPENDENCIES:
//===============================================
var router = require("express").Router();

//Local File References:
//===============================================
var fetchController = require("../../controller/fetch");

//Fetch Routes:
//===============================================
router.get("/", fetchController.scrapeHeadlines);

module.exports = router;