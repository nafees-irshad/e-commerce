const express = require("express");
const app = express();
require("dotenv").config();
//middlware for parsing
app.use(express.json());

//import routes
//user routes
const userRoutes = require("./routes/userRoutes");
//product routes
const productRoutes = require("./routes/productRoute");
//wishlist routes
const wishlistRoutes = require("./routes/wishlistRoute");
//cart routes
const cartRoutes = require("./routes/cartRoutes");
//order routes
const orderRoutes = require("./routes/orderRoutes");

//use routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT;

//start the server
app.listen(PORT, () => {
  console.log(`Server is runng at ${PORT}`);
});
