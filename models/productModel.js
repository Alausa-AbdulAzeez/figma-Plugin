const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    category: {
      type: String,
      default: "General",
    },
    price: {
      type: String,
      required: [true, "Product price is required"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
