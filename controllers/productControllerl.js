const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  const data = req.body;
  try {
    const newProducts = await Product.create({ ...data });
    res.status(201).json({
      status: "success",
      message: "product created succesfully",
      newProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

//update product
exports.updateProduct = async (req, res) => {
  const updateFeilds = req.body;
  const { id } = req.params;
  try {
    const [updateRowCount] = await Product.update(updateFeilds, {
      where: { id: id },
    });
    if (updateRowCount === 0) {
      return res.status(404).json({
        status: "failed",
        message: "Product Not Found",
      });
    }
    res.status(201).json({
      status: "Success",
      message: "Product list updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error updating products");
  }
};

//get single product
exports.getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        status: "failed",
        message: "Product not found",
      });
    }
    res.status(201).json({
      status: "success",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

//delet product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.destroy(id);
    res.status(404).json("product deleted succesfully");
    if (!product) {
      return res.status(404).json({
        status: "failed",
        message: "Product not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};
