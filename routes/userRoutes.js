const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));
router.get("/", userController.index);
router.get("/:id", userController.show);
router.put("/:id", userController.update);
router.delete("/:id", userController.deleteUser);

module.exports = router;
