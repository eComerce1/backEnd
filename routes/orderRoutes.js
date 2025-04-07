const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateOrderStatus,
  updateOrderAddress,
  getLastTenOrders,
  getOrdersLastMonth,
  getUserOrders,
} = require("../controllers/orderController");

const { expressjwt: checkJwt } = require("express-jwt");

const router = express.Router();

router.put("/:orderId/status", updateOrderStatus);

router.get("/last-month", getOrdersLastMonth);
router.get("/last-ten", getLastTenOrders);

router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

router.get("/cart", getCart);
router.post("/cart", addToCart);
router.delete("/cart/:productId", removeFromCart);
router.post("/update-address", updateOrderAddress);
router.delete("/clear", clearCart);
router.get("/orders", getUserOrders);

module.exports = router;
