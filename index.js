const express = require("express");
const mongoose = require("mongoose");

const productRoute = require("./routes/productRoute");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

// ROUTES
app.use("/api/product/", productRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`DB Connection Successful`))
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));
