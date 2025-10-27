const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { comparePassword } = require('../utils/hash');

const COOKIE_NAME = process.env.COOKIE_NAME;
const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await pool.query(
      `SELECT u.*, r.name AS role_name 
       FROM users u 
       LEFT JOIN roles r ON u.role_id = r.id 
       WHERE email = ?`,
      [email]
    );
    const user = rows[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    if (user.is_locked) return res.status(403).json({ message: 'Account locked' });

    //  Verify password
    const match = await comparePassword(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    //  Generate JWT
    const payload = { id: user.id, role: user.role_name, role_id: user.role_id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    // Fetch permissions based on role_id
    const [permRows] = await pool.query(
      `SELECT module_name, can_create, can_read, can_update, can_delete 
       FROM role_permissions 
       WHERE role_id = ?`,
      [user.role_id]
    );

    //  Format permissions into structured object
    const permissions = {};
    permRows.forEach((p) => {
      permissions[p.module_name] = {
        create: !!p.can_create,
        read: !!p.can_read,
        update: !!p.can_update,
        delete: !!p.can_delete,
      };
    });

    //  Send cookie and response
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: 'Logged in',
      user: {
        id: user.id,
        name: user.name,
        role: user.role_name,
        permissions, 
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ message: 'Logged out' });
};
