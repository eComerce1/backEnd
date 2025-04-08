const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/", userController.index);
router.get("/:id", userController.show);
router.put("/:id", userController.update);

router.delete("/:id", userController.deleteUser);
router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

module.exports = router;
