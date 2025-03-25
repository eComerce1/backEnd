const { Model, Datatypes } = require("sequelize");

class Product extends Model {
  static initModel(sequelize) {
    Product.init({
      id: {
        type: Datatypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Datatypes.STRING,
      },
      price: {
        type: Datatypes.FLOAT,
      },
      image: {
        type: Datatypes.STRING,
      },
      description: {
        type: Datatypes.STRING,
      },
      stock: {
        type: Datatypes.INT,
      },
    });

    return Product;
  }
}

module.exports = Product;
