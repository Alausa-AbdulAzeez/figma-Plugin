const express = require("express");
const { addSingleProduct } = require("../controllers/productController");

const router = express.Router();

// CREATE A PRODUCT
router.get("/addProduct", addSingleProduct);

module.exports = router;
