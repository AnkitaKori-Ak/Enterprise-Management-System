const bcrypt = require('bcrypt');
async function hashPassword(pwd) { return bcrypt.hash(pwd, 10); }
async function comparePassword(pwd, hash) { return bcrypt.compare(pwd, hash); }
module.exports = { hashPassword, comparePassword };
