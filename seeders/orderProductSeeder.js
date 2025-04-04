const { OrderProduct, Order, Product } = require("../models");

module.exports = async () => {
  try {
    const order = await Order.findOne();
    const product = await Product.findOne();

    if (!order || !product) {
      console.log(
        "No se encontró la orden o el producto, no se puede crear el registro."
      );
      return;
    }

    const createdOrderProducts = await OrderProduct.bulkCreate([
      {
        orderId: order.id,
        productId: product.id,
        amount: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderId: order.id,
        productId: product.id,
        amount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    console.log("OrderProducts creados:", createdOrderProducts);
  } catch (error) {
    console.error("Error al crear OrderProducts:", error);
  }
};
