const sequelize = require("../config/db");
const Orders = require("../models/orderModel");
const OrderdProducts = require("../models/orderdProductsModel");
const Product = require("../models/productModel");
const { Op } = require("sequelize");

exports.orders = async (req, res) => {
  //Generate OrderId
  function generateRandomId() {
    const prefix = "CH#";
    const randomNumber = Math.floor(10000 + Math.random() * 9000);
    const now = new Date();
    const time = now.toTimeString().slice(0, 8).replace(/:/g, "");

    return `${prefix}${randomNumber}-${time}`;
  }
  const orderId = generateRandomId();
  // console.log(orderId);
  const { products, customer, shippingAdress } = req.body;
  // console.log(req.body);
  const t = await sequelize.transaction();

  try {
    //validate productids must be an array
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ error: "'Products array is required and must not be empty." });
    }
    //validate customer details
    if (!customer || !shippingAdress) {
      return res.status(400).json({ error: "customer details are required" });
    }

    // Input validation for products
    if (
      !products.every(
        (item) =>
          typeof item === "object" &&
          Number.isInteger(item.productId) &&
          Number.isInteger(item.qty) &&
          item.qty > 0
      )
    ) {
      return res.status(400).json({
        error:
          "'Products must be an array of objects with productId, qty (positive integer) as properties.'",
      });
    }
    const productIds = products.map((p) => p.productId);
    // console.log(productIds);
    //check product from Product model
    const availableProducts = await Product.findAll({
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
      transaction: t,
    });

    //create new orderd product
    const orderdProducts = products.map((product) => ({
      userId: req.user.id,
      productId: product.productId,
      name: availableProducts.find((p) => p.id === product.productId).name,
      price: availableProducts.find((p) => p.id === product.productId).price,
      qty: product.qty,
    }));
    await OrderdProducts.bulkCreate(orderdProducts, { transaction: t });
    // console.log(orderdProducts);
    const customerDetails = await Orders.create(
      {
        userId: req.user.id,
        customer,
        orderId,
        shippingAdress,
      },
      { transaction: t }
    );
    await t.commit();
    res.status(201).json({
      status: "success",
      orderdProducts,
      customerDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("error submitting order");
  }
};

//change status
exports.changeStatus = async (req, res) => {
  const { id } = req.params;
  const updateFeilds = req.body;
  try {
    const [updateRowCount] = await Orders.update(updateFeilds, {
      where: { id },
    });
    //if no row updated
    if (updateRowCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }
    res.status(201).json({
      status: "success",
      message: "Order updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error updating status" });
  }
};

//view orders
exports.allOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll();
    if (!orders) {
      return res.status(404).json({ error: "no order found" });
    }

    res.status(201).json({
      status: "success",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error viewing orders" });
  }
};

//view order by id
exports.viewOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Orders.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: "order not found" });
    }
    res.status(201).json({
      status: "success",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error getting order" });
  }
};

//delete order
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Orders.destroy({
      where: { id },
    });
    if (!order) {
      return res.status(404).json({ error: "order not found" });
    }
    res.status(201).json({
      status: "success",
      message: "order deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("error deleting order");
  }
};
