const express = require("express");
const {
  index,
  createCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { expressjwt: checkJwt } = require("express-jwt");
const router = express.Router();

router.get("/", index);
router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));
router.post("/create", createCategory);
router.put("/edit/:id", editCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
