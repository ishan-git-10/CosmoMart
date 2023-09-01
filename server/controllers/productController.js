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
  } else {
    res.status(404).json("Product not found");
  }
});

//@route  /api/products/search/:searchitems
const getSearchProducts = asyncHandler(async (req, res) => {
  let searchElement = req.params.searchitems.replace(/ /g, "");
  const products = await Product.find({});
  const searched = products.filter((product) => {
    return (
      product.name
        .toLocaleLowerCase()
        .replace(/ /g, "")
        .includes(searchElement.toLocaleLowerCase()) ||
      product.description
        .toLocaleLowerCase()
        .replace(/ /g, "")
        .includes(searchElement.toLocaleLowerCase()) ||
      product.brand
        .toLocaleLowerCase()
        .replace(/ /g, "")
        .includes(searchElement.toLocaleLowerCase()) ||
      product.category
        .toLocaleLowerCase()
        .replace(/ /g, "")
        .includes(searchElement.toLocaleLowerCase())
    );
  });
  if (searched.length != 0) {
    return res.json(searched);
  } else {
    res.status(404).json("No Results Found");
  }
});

// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = new Product({
    user: req.user._id,
    name,
    image,
    description,
    brand,
    category,
    price,
    countInStock,
  });

  const createdProduct = await product.save();
  res.json(createdProduct);
});

// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json("Product not found");
  }
});

// @route   PUT /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json("Product Deleted");
  } else {
    res.status(404).json("Product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400).json("Product already reviewed");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    }
  } else {
    res.status(404).json("Product not found");
  }
});

export {
  getProducts,
  getProductByID,
  getSearchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
