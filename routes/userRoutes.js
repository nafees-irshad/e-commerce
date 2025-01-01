const express = require("express");
const router = express.Router();

//import controller
const userController = require("../controllers/userController");

//import middleware
const authticate = require("../middleware/authmiddleware");

//use routes
router.post("/register", userController.createUser);
router.post("/login", userController.login);

//protective routes
router.put("/update", authticate, userController.updateUser);

module.exports = router;
