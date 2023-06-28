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

module.exports = {
  addSingleProduct,
};
