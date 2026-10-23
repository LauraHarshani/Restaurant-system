const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../lib/prisma.ts');

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== 'string' ||
      !email.trim() ||
      typeof password !== 'string' ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      });
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error('JWT_SECRET is not configured.');

      return res.status(500).json({
        success: false,
        message: 'Authentication is not configured.',
      });
    }

    // Find the account using the shared Prisma client.
    const admin = await prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    // Do not allow non-admin accounts to use this endpoint.
    if (!admin || admin.role !== 'ADMIN') {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Compare the submitted password with the stored bcrypt hash.
    const passwordMatches = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        role: admin.role,
      },
      jwtSecret,
      {
        algorithm: 'HS256',
        expiresIn: '1h',
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);

    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred during login.',
    });
  }
};

//admin registration
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, setupSecret } = req.body || {};

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof email !== 'string' ||
      !email.trim() ||
      typeof password !== 'string' ||
      password.length < 8 ||
      typeof setupSecret !== 'string' ||
      !setupSecret
    ) {
      return res.status(400).json({
        success: false,
        message: 'Valid name, email, password, and setup secret are required.',
      });
    }

    if (!process.env.ADMIN_SETUP_SECRET) {
      return res.status(403).json({
        success: false,
        message: 'Admin registration is disabled.',
      });
    }

    if (setupSecret !== process.env.ADMIN_SETUP_SECRET) {
      return res.status(403).json({
        success: false,
        message: 'Admin registration is not authorized.',
      });
    }

    // Allow only the initial administrator to be registered.
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' },
    });

    if (adminCount > 0) {
      return res.status(403).json({
        success: false,
        message: 'An administrator already exists. Registration is closed.',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Administrator account created successfully.',
      admin,
    });
  } catch (error) {
    console.error('Admin registration error:', error);

    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred during registration.',
    });
  }
};


module.exports = {
  loginAdmin,
  registerAdmin
};
