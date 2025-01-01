const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

//add to cart
exports.addToCart = async (req, res) => {
  const { productId, qty } = req.body;
  try {
    //fetch user id
    const userId = req.user.id;

    // Check if the product already exists in the user's cart
    const existingCartItem = await Cart.findOne({
      where: { userId, productId },
    });
    if (existingCartItem) {
      // If the product already exists in the cart, do nothing or return a message
      return res.status(400).json({
        status: "error",
        message: "Product already in cart",
      });
    }

    //fetch product
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product of of stock",
      });
    }
    //create new cart object
    const newCart = new Cart({
      userId,
      productId,
      productName: product.name,
      price: product.price,
      qty,
    });
    await newCart.save();
    res.status(201).json({
      status: "success",
      message: "Added to cart successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "error adding to cart",
    });
  }
};

//update cart - increase or decrease qty
exports.updateCart = async (req, res) => {
  const { productId, action } = req.body;
  try {
    // fetch user id
    const userId = req.user.id;

    // Check if the product in cart
    const existingCartItem = await Cart.findOne({
      where: { userId, productId },
    });
    if (!existingCartItem) {
      return res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }
    if (action === "add") {
      existingCartItem.qty += 1;
      await existingCartItem.save();
    }
    if (action === "remove") {
      existingCartItem.qty -= 1;
      await existingCartItem.save();
      if (existingCartItem.qty === 0) {
        await existingCartItem.destroy();
      }
    }
    res.status(200).json({
      status: "success",
      message: "cart updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("error updating cart");
  }
};

//delete cart
exports.deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    const removeCart = await Cart.destroy({
      where: { id },
    });
    if (!removeCart) {
      return res.status(400).json({
        status: "cart not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "cart removed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("error deleting cart");
  }
};
