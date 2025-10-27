const bcrypt = require('bcrypt');
const pool = require('../config/db');

async function seedAdmin() {
  try {
    const email = 'admin@example.com';
    const password = 'Admin@123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.query(
      'UPDATE users SET password = ? WHERE email = ?',
      [hashedPassword, email]
    );
    
    console.log('✅ Admin password updated successfully');
    console.log('Email:', email);
    console.log('Password:', password);
    
    process.exit(0);
  } catch (error) {
    console.error(' Error:', error);
    process.exit(1);
  }
}

seedAdmin();