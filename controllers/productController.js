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
      console.log(products);
      console.log(products[index]);

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

    if (!createdProducts) {
      res.status(400).json("An error occured while creating the products");
    }

    res.status(201).json(createdProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addSingleProduct,
  addMultipleProducts,
};
