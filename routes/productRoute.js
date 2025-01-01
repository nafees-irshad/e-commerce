const express = require("express");
const router = express.Router();

//improt controllers
const productController = require("../controllers/productControllerl");

//use routes
//create product
router.post("/create", productController.createProduct);
//update product list
router.put("/update/:id", productController.updateProduct);
//get product
router.get("/:id", productController.getProduct);

module.exports = router;
