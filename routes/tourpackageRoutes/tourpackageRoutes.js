const express = require("express");
const router = express.Router();
const tourpackageController = require("../../tourpackageController/tourpackageController")

//create package
router.post("/createpackage",tourpackageController.createpackage);

//get all package
router.get("/getpackage",tourpackageController.getallpackage);

//get package by id
router.get("/getpackage/:id",tourpackageController.getpackagebyid);

//update package
router.put("/updatepackage/:id",tourpackageController.updatepackage);

//delete package
router.delete("/deletepackage/:id",tourpackageController.deletepackage);

module.exports = router;