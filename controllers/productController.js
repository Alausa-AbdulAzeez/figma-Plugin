const Product = require("../models/productModel");

// CREATE SINGLE PRODUCT
const addSingleProduct = async (req, res) => {
  try {
    const { image, category, title, price } = await req.body;

    // Validate Imamge, title and pric fields
    if (!image || !title || !price) {
      res
        .status(500)
        .json(
          "Please make sure the Imagee, Title and Price field's aren't empty"
        );
    }

    // CREATE PRODUCT AFTER SUCCESSFULLY VALIDATING
    const product = await Product.create({
      image,
      title,
      category,
      price,
    });

    // CHECKS IF PRODUCT WAS SUCCESSFULLY CREATED
    if (!product) {
      res.status(400).json("Could not create product");
    }
    // RETURN PRODUCT AFTER SUCCESSFUL VALIDATION
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

// CREATE MULTIPLE PRODUCTS
const addMultipleProducts = async (req, res) => {
  try {
    const products = await req.body;

    // CHECK IF THE DATA PASSED IS AN ARRAY OR AN EMPTY ARRAY
    if (!Array.isArray(products) || products.length === 0) {
      res.status(400).send("Invalid datatype. Kindly pass an array datatype");
    }

    for (let index = 0; index < products.length; index++) {
      const { image, title, price } = products[index];

      // Validate image, title, and price fields
      if (!image || !title || !price) {
        res
          .status(400)
          .send(
            `Invalid product detected. Please check the image, title, and price fields. Kindly check the product at index ${[
              index,
            ]} in the array`
          );
        return;
      }
    }

    const createdProducts = await Product.create(products);

    // CHECK IF THE PRODUCTS WERE SECCESSFULLY ADDED TO THE DB
    if (!createdProducts) {
      res.status(400).json("An error occured while creating the products");
    }

    res.status(201).json("Products have been added successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addSingleProduct,
  addMultipleProducts,
};

// GET PAGINATED PRODUCTS
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const cacheKey = `products-page:${page}-limit:${limit}`;

    // Check the cache
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log("Serving products from cache");
      return res.json(cachedData);
    }

    // Fetch data from MongoDB and paginate
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const products = await Product.find().skip(skip).limit(parseInt(limit));

    // VALIDATE PRODUCTS
    if (!products) {
      res.status(400).json("An error occured while fetching the products");
    }

    // Store data in the cache
    cache.set(cacheKey, products);

    res.status(200).json(products);
  } catch (error) {
    console.error("Failed to fetch products", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
