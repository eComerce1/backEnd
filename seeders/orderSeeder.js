const { Order } = require("../models");

const orders = [
  {
    user_id: 1,
    product_id: 2,
    quantity: 3,
    total_price: 150,
    status: "completed",
    order_date: new Date(),
    address: "123 Main St, Springfield",
    phone: "1234567890",
    paymentMethod: "credit card",
  },
  {
    user_id: 2,
    product_id: 1,
    quantity: 1,
    total_price: 50,
    status: "pending",
    order_date: new Date(),
    address: "456 Oak St, Springfield",
    phone: "9876543210",
    paymentMethod: "paypal",
  },
  {
    user_id: 3,
    product_id: 5,
    quantity: 2,
    total_price: 100,
    status: "cart",
    order_date: new Date(),
    address: "789 Pine St, Springfield",
    phone: "5555555555",
    paymentMethod: "debit card",
  },
];

async function seedOrders() {
  await Order.bulkCreate(orders);
}

module.exports = seedOrders;
