const express = require("express");
const router = express.Router();

//import middleware
const authenticate = require("../middleware/authmiddleware");

//import routes
const wishlistController = require("../controllers/wishlistController");

//use routes
//add/remove items to wishlist
router.post("/add", authenticate, wishlistController.createWishlist);
//view wishlist
router.get("/view", authenticate, wishlistController.viewWishlist);
//delete wishlist
router.delete("/", authenticate, wishlistController.emptyWishlist);

module.exports = router;
