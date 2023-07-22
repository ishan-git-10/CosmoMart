import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@route  /api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@route  /api/products/:id
const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404).json({ message: "Product not found" });
});

export { getProducts, getProductByID };
