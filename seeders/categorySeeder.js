const { sequelize, Category } = require("../models");

const categoriesData = [
  { name: "Earbuds" },
  { name: "Headphones" },
  { name: "Speakers" },
  { name: "Accessories" },
];

module.exports = async () => {
  try {
    await sequelize.sync();
    await Category.destroy({ where: {} });
    await Category.bulkCreate(categoriesData, { ignoreDuplicates: true });

    console.log("Categorías creadas correctamente.");
  } catch (error) {
    console.error("Error al crear las categorías:", error);
  }
};
