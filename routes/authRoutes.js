const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { expressjwt: checkJwt } = require("express-jwt");

/*
 * API endpoints relacionados a los artículos.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/articles",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.post("/login", authController.login);
router.post("/register", authController.registerUser);
router.post("/recovery-token", authController.recoveryToken);
router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));
router.patch("/reset-password", authController.resetPassword);

module.exports = router;
