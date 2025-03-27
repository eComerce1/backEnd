const { Sequelize } = require("sequelize");

const dbConnectionString = process.env.DB_CONNECTION_STRING;

const sequelize = new Sequelize(dbConnectionString, {
  dialectModule: require("pg"),
  logging: false,
});

const Product = require("./Product");
const User = require("./User");
const Order = require("./Order");
const Category = require("./Category");
const Admin = require("./Admin");
const OrderProduct = require("./OrderProduct");

Product.initModel(sequelize);
OrderProduct.initModel(sequelize);
User.initModel(sequelize);
Order.initModel(sequelize);
Category.initModel(sequelize);
Admin.initModel(sequelize);

User.hasMany(Order);
Order.belongsTo(User);
// We use belongsToMany instead of hasMany because an order can have multiple products,
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });
// and each product can belong to multiple orders. To properly represent this many-to-many
// relationship and store additional information (like quantity), we use an intermediate
// table (OrderProduct). This allows us to track how many units of each product are
// associated with a specific order.
Product.belongsTo(Category);
Category.hasMany(Product);

module.exports = {
  sequelize,
  User,
  Product,
  Order,
  Category,
  Admin,
};
