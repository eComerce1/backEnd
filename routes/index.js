const authRoutes = require("./authRoutes");
const ordersRoutes = require("./orderRoutes");
const productsRoutes = require("./productRoutes");
const usersRoutes = require("./userRoutes");
const paymentRoutes = require("./paymentRoutes");
const adminRoutes = require("./adminRoutes");
const categoryRoutes = require("./categoryRoutes");
const devRoutes = require("./devRoutes");

module.exports = (app) => {
  app.use("/products", productsRoutes);
  app.use("/admin", adminRoutes);
  app.use("/users", usersRoutes);
  app.use("/orders", ordersRoutes);
  app.use("/payment", paymentRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/dev", devRoutes);
  app.use("/", authRoutes);
};
