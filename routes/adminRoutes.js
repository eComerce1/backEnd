const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/create-admin", adminController.createAdmin);
router.delete("/delete-admin/:id", adminController.deleteAdmin);

module.exports = router;
