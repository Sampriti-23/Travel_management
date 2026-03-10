const express = require("express");
const router = express.Router();
const roomController = require("../../controller/roomController/roomController");

// Create a new room
router.post("/createroom", roomController.createroom);

//  Get all rooms
router.get("/getroom", roomController.getroom);

//  Update room by ID
router.put("/updateroom/:id", roomController.updateroom);

//  Delete room by ID
router.delete("/deleteroom/:id", roomController.deleteroom);

module.exports = router;