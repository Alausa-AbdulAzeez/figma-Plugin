const express = require("express");
const {
  addSingleProduct,
  addMultipleProducts,
} = require("../controllers/productController");

const router = express.Router();

// CREATE A PRODUCT
router.post("/addProduct", addSingleProduct);

// CREATE MULTIPLE PRODUCTS
router.post("/addMultipleProducts", addMultipleProducts);

// CREATE MULTIPLE PRODUCTS
router.get("/products", addMultipleProducts);

module.exports = router;
