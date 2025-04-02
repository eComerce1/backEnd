const authRoutes = require("./authRoutes");
const ordersRoutes = require("./orderRoutes");
const productsRoutes = require("./productRoutes");
const usersRoutes = require("./userRoutes");
const paymentRoutes = require("./paymentRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/users", usersRoutes);
  app.use("/products", productsRoutes);
  //app.use("/orders", ordersRoutes);
  app.use("/payment", paymentRoutes);
};
