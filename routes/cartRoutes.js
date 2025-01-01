const express = require("express");
const router = express.Router();

//import midddleware
const authenticate = require("../middleware/authmiddleware");

//import contorller
const cartController = require("../controllers/cartController");

//use route
//add to cart
router.post("/add", authenticate, cartController.addToCart);

//update qty
router.put("/update", authenticate, cartController.updateCart);

//delete cart
router.delete("/remove/:id", authenticate, cartController.deleteCart);

module.exports = router;
