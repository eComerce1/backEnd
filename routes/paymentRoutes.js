const express = require("express");
const {
  createPreference,
  webhookHandler,
} = require("../controllers/paymentController");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");

router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));
router.post("/create-preference", createPreference);
router.post("/webhook", webhookHandler);

module.exports = router;
