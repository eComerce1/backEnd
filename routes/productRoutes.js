const express = require("express");
const { index, show } = require("../controllers/productController");

const router = express.Router();

router.get("/", index);
router.get("/:name", show);

module.exports = router;
