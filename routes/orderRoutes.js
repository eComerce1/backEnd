const express = require("express");
const { getLastMonthOrders } = require("../controllers/orderController");

const router = express.Router();

// Ruta para obtener las órdenes del último mes
router.get("/last-month", getLastMonthOrders);

module.exports = router;
