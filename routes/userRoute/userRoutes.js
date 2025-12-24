const express = require("express");
const router = express.Router();
const usercontroller = require("../../controller/userController");

// Create user
router.post("/user", usercontroller.getuser);

// Get all users
router.get("/user", usercontroller.getalluser);

// Get user by ID
router.get("/user/:id", usercontroller.getbyid);

// Update user
router.put("/user/:id", usercontroller.updateuser);

// Delete user
router.delete("/user/:id", usercontroller.deleteuser);

module.exports = router;