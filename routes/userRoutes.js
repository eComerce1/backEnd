const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

//router.post("/", userController.store);
router.post("/create-admin", userController.createAdmin);
router.delete("/delete-admin/:id", userController.deleteAdmin);

router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

module.exports = router;
