const { User, Admin, Order, Product, OrderProduct } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // Search for the user in the User table by email or username
    let user = await User.findOne({ where: { email: identifier } });
    if (!user) {
      // If not found in User, search in the Admin table
      user = await Admin.findOne({ where: { email: identifier } });
      if (!user) {
        return res.status(400).json({
          msg: "Oops, looks like that combination is not quite right!",
        });
      }
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ msg: "Oops, looks like that combination is not quite right!" });
    }

    // Generate the JWT token
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10h", // Token expiration time
    });

    // Fetch the user's active cart
    const order = await Order.findOne({
      where: { userId: user.id, status: "cart" },
    });
    var cartData = null;
    if (order) {
      const orderProducts = await OrderProduct.findAll({
        where: { orderId: order.id },
        include: [
          {
            model: Product,
            required: true,
          },
        ],
      });
      // Construct the cart response
      var cartData =
        orderProducts.length > 0
          ? {
              id: order.id,
              products: orderProducts.map((orderProduct) => ({
                product: orderProduct.product,
                amount: orderProduct.amount,
              })),
            }
          : null;
    }

    // Return user data, role, and cart
    return res.status(200).json({
      msg: "Login successful",
      token: token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user instanceof Admin ? "admin" : "user",
      },
      cart: cartData,
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
