const { Admin } = require("../models");
const bcrypt = require("bcrypt");

module.exports = async () => {
  // Borrar admin anterior si existe
  await Admin.destroy({ where: {} });

  const password = "1234";
  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    firstname: "Admin",
    lastname: "Principal",
    email: "admin@example.com",
    password: hashedPassword,
  });

  console.log(
    "Admin user created with email: admin@example.com and password: 1234"
  );
};
