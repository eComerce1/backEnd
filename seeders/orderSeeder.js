const { Order, User, Product, OrderProduct } = require("../models");
const { subYears, subMonths } = require("date-fns");

module.exports = async () => {
  // Clear previous orders and related products
  await OrderProduct.destroy({ where: {} });
  await Order.destroy({ where: {} });

  const users = await User.findAll();
  const products = await Product.findAll();

  if (users.length === 0 || products.length === 0) {
    console.log("No users or products found. Seed those first.");
    return;
  }

  const statuses = ["completed", "pending", "cart"];
  const paymentMethods = [
    "credit card",
    "paypal",
    "debit card",
    "bank transfer",
  ];

  const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const getRandomDate = (startDate, endDate) => {
    const randomTime =
      startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime);
  };

  const now = new Date();
  const oneMonthAgo = subMonths(now, 1);
  const twoYearsAgo = subYears(now, 2);

  // Orders for user@hotmail.com
  const userHotmail = await User.findOne({
    where: { email: "user@hotmail.com" },
  });

  if (!userHotmail) {
    console.log("Usuario específico no encontrado.");
    return;
  }

  const statusesForHotmail = ["cart", "completed", "pending"];
  const orderProducts = [];
  const usedIndexes = new Set();

  while (orderProducts.length < 2) {
    const productIndex = Math.floor(Math.random() * products.length);
    if (!usedIndexes.has(productIndex)) {
      usedIndexes.add(productIndex);
      orderProducts.push({
        product: products[productIndex],
        amount: Math.floor(Math.random() * 5) + 1,
      });
    }
  }

  for (let i = 0; i < 3; i++) {
    const order = await Order.create({
      userId: userHotmail.id,
      status: statusesForHotmail[i],
      address: userHotmail.address,
      phone: userHotmail.phone,
      paymentMethod: randomElement(paymentMethods),
      createdAt: getRandomDate(oneMonthAgo, now),
    });

    for (const { product, amount } of orderProducts) {
      await OrderProduct.create({
        orderId: order.id,
        productId: product.id,
        amount,
      });
    }
  }

  // Random orders for random users
  for (let i = 0; i < 20; i++) {
    const user = randomElement(users);
    const numProducts = Math.floor(Math.random() * 3) + 1;
    const orderProducts = [];
    const usedIndexes = new Set();

    while (orderProducts.length < numProducts) {
      const productIndex = Math.floor(Math.random() * products.length);
      if (!usedIndexes.has(productIndex)) {
        usedIndexes.add(productIndex);
        orderProducts.push({
          product: products[productIndex],
          amount: Math.floor(Math.random() * 5) + 1,
        });
      }
    }

    // Ensure at least 10 orders are within the last month
    const createdAt =
      i < 10
        ? getRandomDate(oneMonthAgo, now) // Last month
        : getRandomDate(twoYearsAgo, now); // Last 2 years

    const order = await Order.create({
      userId: user.id,
      status: randomElement(statuses),
      address: user.address,
      phone: user.phone,
      paymentMethod: randomElement(paymentMethods),
      createdAt,
    });

    for (const { product, amount } of orderProducts) {
      await OrderProduct.create({
        orderId: order.id,
        productId: product.id,
        amount,
      });
    }
  }

  console.log("Orders seeder ran successfully.");
};
