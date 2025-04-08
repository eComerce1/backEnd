const { Category } = require("../models");

async function index(req, res) {
  try {
    const categories = await Category.findAll();
    return res.json({ categories });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

async function createCategory(req, res) {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });

    return res.status(201).json({
      msg: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error in createCategory:", error);
    return res.status(500).json({ msg: error.message });
  }
}

async function editCategory(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await Category.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedCategory = await Category.findOne({ where: { id: id } });
      return res
        .status(200)
        .json({ msg: "Category edited successfully", post: updatedCategory });
    }
    return res.status(404).json({ message: "Categoría no encontrada" });
  } catch (error) {
    console.error("Error al actualizar la categoría", error);
    return res.status(500).send(error.message);
  }
}

/*   if (parseInt(req.auth.sub) !== parseInt(id)) {
  return res.status(403).json({ message: "Unauthorized" });
} */
async function deleteCategory(req, res) {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.destroy();

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  index,
  createCategory,
  editCategory,
  deleteCategory,
};
