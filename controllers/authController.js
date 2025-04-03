const { User, Admin } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ msg: "Email/Username and password are required" });
    }

    // Buscar en la tabla User por email o username
    let user =
      (await User.findOne({ where: { email: identifier } })) ||
      (await User.findOne({ where: { username: identifier } }));
    if (!user) {
      // Si no se encuentra en User, buscar en la tabla Admin
      user =
        (await Admin.findOne({ where: { email: identifier } })) ||
        (await Admin.findOne({ where: { username: identifier } }));
      if (!user) {
        return res.status(400).json({
          msg: "Oops, looks like that combination is not quite right!",
        });
      }
    }

    // Comparar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ msg: "Oops, looks like that combination is not quite right!" });
    }

    // Generar el JWT token
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Establece un tiempo de expiración para el token
    });

    // Devolver los datos del usuario y su rol (user o admin)
    return res.status(200).json({
      msg: "Login successful",
      token: token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user instanceof Admin ? "admin" : "user", // Determinar el rol
      },
    });
  } catch (error) {
    console.log("Error in login:", error);
    return res.status(500).json({ msg: error.message });
  }
}

async function registerUser(req, res) {
  try {
    const { firstname, lastname, username, email, password, phone, address } =
      req.body;

    // Check if all required fields are provided
    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !phone ||
      !address
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if the email or username already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "Email is already registered." });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ msg: "Username is already taken." });
    }

    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword, // Store the hashed password
      phone,
      address,
    });

    return res.status(201).json({
      msg: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({ msg: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Delete the user
    await user.destroy();

    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
}

console.log("createUser function:", typeof createUser);

module.exports = {
  login,
  registerUser,
  deleteUser,
};
