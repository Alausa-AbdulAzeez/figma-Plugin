const express = require("express");
const {
  addSingleProduct,
  addMultipleProducts,
  getAllProducts,
  uploadFile,
} = require("../controllers/productController");

const router = express.Router();
const multer = require("multer");

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// CREATE A PRODUCT
router.post("/addProduct", addSingleProduct);

// CREATE MULTIPLE PRODUCTS
router.post("/addMultipleProducts", addMultipleProducts);

// UPLOAD FILE
router.post("/upload", upload.single("jsonFile"), uploadFile);

// CREATE MULTIPLE PRODUCTS
router.get("/products", getAllProducts);

// PRODUCT SEARCH
router.get("/productSearch", getAllProducts);

module.exports = router;
