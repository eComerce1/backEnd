const { Admin } = require("../models");
const bcrypt = require("bcrypt");

module.exports = async () => {
  await Admin.destroy({ where: {} });

  const password = "1234";
  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    firstname: "Admin",
    lastname: "Principal",
    email: "admin@example.com",
    password: hashedPassword,
  });

  console.log("Admin seeder ran succesfully.");
};
