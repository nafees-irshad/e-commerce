const express = require("express");
const router = express.Router();

//import middlewares
const authenticate = require("../middleware/authmiddleware");

//import controllers
const orderController = require("../controllers/orderController");

//use routes

//create order
router.post("/create-order", authenticate, orderController.orders);

//update order
router.put("/update/:id", authenticate, orderController.changeStatus);

//view all orders
router.get("/", authenticate, orderController.allOrders);

//view order
router.get("/:id", authenticate, orderController.viewOrder);

//delete order
router.delete("/:id", authenticate, orderController.deleteOrder);

module.exports = router;
