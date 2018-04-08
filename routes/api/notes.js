//DEPENDENCIES:
//===============================================
var router = require("express").Router();

//Local File References:
//===============================================
var noteController = require("../../controller/notes");


//Note Routes:
//===============================================
//at this point, the uri address === "/api/notes/:id, which will be used for the GET (find/render) functionality
router.get("/:id", noteController.findOne);

//at this point, the uri address === "/api/notes/," which will be used for the POST (create) functionality
router.post("/", noteController.create);

//at this point, the uri address === "/api/notes/:id," which will be used for the UPDATE functionality
router.put("/:id", noteController.update);

//at this point, the uri address === "/api/notes/:id," which will be used for the DELETE  functionality
router.delete("/:id", noteController.delete);

module.exports = router;