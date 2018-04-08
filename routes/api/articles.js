//DEPENDENCIES:
//===============================================
var router = require("express").Router();

//Local File References:
//===============================================
var articleController = require("../../controller/articles");

//Article Routes:
//===============================================
router.get("/", articleController.findAll);
router.delete("/:id", articleController.delete);
router.put("/:id", articleController.update);

module.exports = router;