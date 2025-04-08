const express = require("express");
const {
  index,
  createCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/", index);
router.post("/create", createCategory);
router.put("/edit/:id", editCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
