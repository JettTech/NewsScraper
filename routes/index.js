//DEPENDENCIES:
//===============================================
var router = require("express").Router();

//Local File Refs:
//===============================================
var apiRoutes = require("./api");
var viewRoutes = require("./view");

//Router Orientation / Setup:
//===============================================
router.use("/api", apiRoutes);
router.use("/", viewRoutes);

module.exports = router;
