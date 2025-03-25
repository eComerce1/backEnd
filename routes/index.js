const authRoutes = require("./authRoutes");
const ordersRoutes = require("./orderRoutes");
const productsRoutes = require("./productRoutes");
const usersRoutes = require("./userRoutes");

module.exports = (app) => {
  app.use("/", authRoutes);
  app.use("/users", usersRoutes);
  app.use("/products", productsRoutes);
  app.use("/orders", ordersRoutes);
};
