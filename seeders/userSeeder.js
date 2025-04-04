const faker = require("@faker-js/faker").fakerES;
const bcrypt = require("bcryptjs");

const User = require("../models/User");

module.exports = async () => {
  try {
    const users = [];

    for (let i = 0; i <= 10; i++) {
      const password = "1234";
      const hashedPassword = await bcrypt.hash(password, 10);

      users.push({
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        username: faker.internet.username(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await User.destroy({ where: {} });
    await User.bulkCreate(users);
    console.log("Seeder de usuarios ejecutado correctamente.");
  } catch (error) {
    console.error("Error al ejecutar el seeder de usuarios:", error);
    throw error;
  }
};
