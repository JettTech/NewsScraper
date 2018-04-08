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
