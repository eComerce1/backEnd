const express = require("express");
const router = express.Router();
const { updateOrderStatus } = require("../controllers/orderController");

router.put("/:orderId/status", updateOrderStatus);

module.exports = router;
