const { Model, DataTypes } = require("sequelize");

class OrderProduct extends Model {
  static initModel(sequelize) {
    OrderProduct.init(
      {
        amount: {
          type: DataTypes.BIGINT(20),
          allowNull: false,
          defaultValue: 1,
        },
      },
      { sequelize, modelName: "OrderProduct" }
    );

    OrderProduct.associate = (models) => {
      OrderProduct.belongsTo(models.Order, { foreignKey: "orderId" });
      OrderProduct.belongsTo(models.Product, { foreignKey: "productId" });
    };
  }
}

module.exports = OrderProduct;
