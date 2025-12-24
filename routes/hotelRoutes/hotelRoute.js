const express = require("express");
const router = express.Router();
const hotelcontroller = require("../../hotelController/hotelController");

// Create hotel
router.post("/createhotel", hotelcontroller.createhotel);

// Get all hotel
router.get("/gethotel", hotelcontroller.gethotel);

// Update hotel
router.put("/updatehotel/:id", hotelcontroller.updatehotel);

// Delete hotel
router.delete("/deletehotel/:id", hotelcontroller.deletehotel);

module.exports = router;