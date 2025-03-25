const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Ej: hack_academy_db
  process.env.DB_USERNAME, // Ej: root
  process.env.DB_PASSWORD, // Ej: root
  {
    host: process.env.DB_HOST, // Ej: 127.0.0.1
    dialect: process.env.DB_CONNECTION, // Ej: mysql
    logging: false, // Para que no aparezcan mensajes en consola.
  }
);

const Product = require("./Product");

Product.initModel(sequelize);

/*
 * Luego de definir los modelos, se pueden establecer relaciones entre los
 * mismos (usando métodos como belongsTo, hasMany y belongsToMany)...
 */

module.exports = {
  sequelize,
  Product,
};

const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const Category = require("./Category");
const Admin = require("./Admin");

User.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);
Category.initModel(sequelize);
Admin.initModel(sequelize);

User.hasMany(Order);
Order.hasMany(Product);
Order.belongsTo(User);
Product.hasMany(Order);
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
