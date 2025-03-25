const express = require("express");
const router = express.Router();
//const productController = require("../controllers/productController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/", productController.index);

module.exports = router;
