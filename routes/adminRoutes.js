const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { expressjwt: checkJwt } = require("express-jwt");

router.post("/create-admin", adminController.createAdmin);
router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));
router.delete("/delete-admin/:id", adminController.deleteAdmin);
router.get("/", adminController.index);
router.put("/:id", adminController.update);

module.exports = router;
