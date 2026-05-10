const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../prisma/client");
const validator = require("validator");

const signup = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      role,
    } = req.body;

    // Trim values
    name = name?.trim();
    email = email?.trim();
    password = password?.trim();
    role = role?.trim();

    // Validation
    if (
      !name ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters",
      });
    }

    // Check existing user
    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      "secretkey",
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "User created successfully",
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Trim values
    email = email?.trim();
    password = password?.trim();

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      "secretkey",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  signup,
  login,
};