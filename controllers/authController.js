const { User, Admin, Order, Product, OrderProduct } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { identifier, password, cart } = req.body;
    if (!identifier || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    // Try to find the user in the User table first
    let user = await User.findOne({ where: { email: identifier } });

    // If not found, try to find in the Admin table
    let isAdmin = false;
    if (!user) {
      user = await Admin.findOne({ where: { email: identifier } });
      if (!user) {
        return res.status(400).json({
          msg: "Oops, looks like that combination is not quite right!",
        });
      }
      isAdmin = true;
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        msg: "Oops, looks like that combination is not quite right!",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    // If user is admin, skip cart handling
    if (isAdmin) {
      return res.status(200).json({
        msg: "Login successful",
        token,
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          address: user.address,
          role: "admin",
        },
        cart: null,
      });
    }

    // Cart handling for regular users
    let order = await Order.findOne({
      where: { userId: user.id, status: "cart" },
    });

    // If cart is provided in the request, update or create cart
    if (cart && Array.isArray(cart) && cart.length > 0) {
      if (!order) {
        // Create new cart
        order = await Order.create({
          address: user.address,
          phone: user.phone,
          paymentMethod: "pending",
          userId: user.id,
          status: "cart",
        });
      }

      // Add or update products in the cart
      for (const cartItem of cart) {
        const { id, amount } = cartItem;

        const product = await Product.findByPk(id);
        if (!product) continue; // Skip if product doesn't exist

        const availableStock = product.stock;

        const existingProduct = await OrderProduct.findOne({
          where: { orderId: order.id, productId: id },
        });

        if (existingProduct) {
          const currentAmount = parseInt(existingProduct.amount, 10) || 0;
          existingProduct.amount = Math.min(
            currentAmount + amount,
            availableStock
          );
          await existingProduct.save();
        } else {
          await OrderProduct.create({
            orderId: order.id,
            productId: id,
            amount: Math.min(amount, availableStock),
          });
        }
      }
    }

    // Fetch and return the updated cart if it exists
    let cartData = null;
    if (order) {
      const orderProducts = await OrderProduct.findAll({
        where: { orderId: order.id },
        include: [{ model: Product, required: true }],
      });

      if (orderProducts.length > 0) {
        cartData = {
          id: order.id,
          products: orderProducts.map((op) => ({
            product: op.product,
            amount: op.amount,
          })),
        };
      }
    }

    // Return user data and cart
    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        role: "user",
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
