const { Order, User, Product, OrderProduct } = require("../models");

async function seedOrders() {
  // Borrar todas las órdenes y productos asociados
  await OrderProduct.destroy({ where: {} });
  await Order.destroy({ where: {} });

  const users = await User.findAll();
  const products = await Product.findAll();

  const ordersData = [
    {
      user: users[0],
      products: [{ product: products[1], amount: 3 }],
      status: "completed",
      address: users[0].address,
      phone: users[0].phone,
      paymentMethod: "credit card",
    },
    {
      user: users[1],
      products: [{ product: products[0], amount: 1 }],
      status: "pending",
      address: users[1].address,
      phone: users[1].phone,
      paymentMethod: "paypal",
    },
    {
      user: users[2],
      products: [{ product: products[4], amount: 2 }],
      status: "cart",
      address: users[2].address,
      phone: users[2].phone,
      paymentMethod: "debit card",
    },
  ];

  for (const orderData of ordersData) {
    const { user, products, ...orderInfo } = orderData;

    const order = await Order.create({
      ...orderInfo,
      userId: user.id,
    });

    for (const { product, amount } of products) {
      await OrderProduct.create({
        orderId: order.id,
        productId: product.id,
        amount,
      });
    }
  }

  console.log("Seed de órdenes completado.");
}

module.exports = seedOrders;
