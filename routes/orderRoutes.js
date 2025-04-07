const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  updateOrderStatus,
  getLastTenOrders,
  getOrdersLastMonth,
  getUserOrders,
} = require("../controllers/orderController");

const { expressjwt: checkJwt } = require("express-jwt");

const router = express.Router();

//router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

router.get("/cart", getCart);
router.post("/cart", addToCart);
router.delete("/cart/:productId", removeFromCart);
router.delete("/clear", clearCart);
router.get("/user/:id", getUserOrders);

router.put("/:orderId/status", updateOrderStatus);

router.get("/last-month", getOrdersLastMonth);
router.get("/last-ten", getLastTenOrders);

module.exports = router;
