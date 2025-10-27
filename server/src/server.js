require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const rolesRoutes = require('./routes/roles.routes');
const usersRoutes = require('./routes/users.routes');
const permissionsRoutes = require('./routes/permissions.routes');
const enterpriseRoutes = require('./routes/enterprise.routes');
const employeeRoutes = require('./routes/employee.routes');
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.get('/', (_, res) => res.json({ message: 'RBAC backend running' }));

app.use('/api/auth', authRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/permissions', permissionsRoutes);
app.use('/api/enterprises', enterpriseRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
