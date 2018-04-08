//DEPENDENCIES:
//===============================================
var router = require("express").Router();

//Local File References:
//===============================================
var articleController = require("../../controller/articles");

//Article Routes:
//===============================================
//at this point, the uri address === "/api/articles/:id, which will be used for the GET (find/render) functionality
router.get("/", articleController.findAll);

//at this point, the uri address === "/api/articles/:id," which will be used for the PUT (update) functionality
router.put("/:id", articleController.update);

//at this point, the uri address === "/api/articles/:id," which will be used for the DELETE functionality
router.delete("/:id", articleController.delete);

module.exports = router;