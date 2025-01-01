const WishList = require("../models/wishlistModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

//add to wishlist
exports.createWishlist = async (req, res) => {
  const { productId, action } = req.body;
  //   console.log("productId", productId);
  const userId = req.user.id;
  //   console.log(userId);
  try {
    //fetch product
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    if (action === "add") {
      await WishList.create({
        userId,
        productId,
        productName: product.name,
        price: product.price,
      });
    }
    if (action === "remove") {
      await WishList.destroy({ where: { productId } });
    }
    const updatedWishlist = await WishList.findAll({ where: { userId } });
    res.status(201).json(updatedWishlist);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal error");
  }
};

//get wishlist
exports.viewWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    //fetch userId from toen
    const wishlist = await WishList.findAll({ where: { userId } });
    if (!wishlist) {
      return res.status(404).json({
        message: "No item found",
      });
    }
    res.status(201).json({
      status: "Success",
      wishlist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Interna Server Error");
  }
};

//delete wihslist
exports.emptyWishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    const wishlist = await WishList.destroy({ where: { userId } });
    if (!wishlist) {
      return res.status(404).json({
        message: "No wishlist found",
      });
    }
    res.status(404).json({
      message: "wishlist empty sccessful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};
