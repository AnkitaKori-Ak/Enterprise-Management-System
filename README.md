
Role-Based Access Control System with Enterprise Management
1. Technologies Used

Frontend: React.js

Backend: Node.js + Express.js

Database: MySQL

Authentication: JWT with HttpOnly Cookies (secure and production-ready)

2. Project Overview

The Role-Based Access Control System (RBAC) is a full-stack web application designed to manage multiple modules such as Users, Roles, Enterprises, Employees, and Products with fine-grained role-based permissions.

Administrators can assign module-level permissions (Create, Read, Update, Delete) to different roles and dynamically control access both in the frontend and backend.

3. Key Features
Authentication and Authorization

Secure login using JWT tokens stored in HttpOnly cookies.

Role-based access middleware on backend routes.

Automatic UI-based permission enforcement so users only see modules they are allowed to access.

4. Admin Capabilities

Full access to all modules.

Manage Enterprises, Employees, Products, and Roles.

Create, edit, or delete users (Admin-only).

Dashboard displaying total counts of all entities.

5. User Role

Restricted module visibility based on assigned role permissions.

Cannot access, create, or manage modules unless permission is explicitly granted.

6. How It Works
Backend (Node.js + Express + MySQL)

Authentication Flow

User logs in with email and password.

A JWT token is generated and stored in an HttpOnly cookie.

Subsequent API requests validate the JWT and decode the user’s role and permissions.

7. Role-Based Middleware

Middleware checks the authenticated user’s role and module permissions.

Unauthorized actions are blocked at both the API and UI layers.

Permission management allows the admin to assign and update module permissions.

8. Frontend (React)

Login UI with secure password handling and optional visibility toggle.

Dynamic Sidebar that displays only the modules a user has read access for.

Permission-based rendering of buttons (Add, Edit, Delete) depending on assigned permissions.

Dashboard that displays entity counts and hides modules for which access is restricted.

9. Environment Configuration

Create a .env file inside the /server directory with the following values:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=rbac_db
JWT_SECRET=your_jwt_secret
COOKIE_NAME=token

10. Security and Non-Functional Highlights

JWT with HttpOnly Cookies: Prevents XSS and CSRF token theft.

BCrypt Password Hashing: Ensures secure credential storage.

RBAC Middleware: Enforces least-privilege access across backend APIs.

Modular Architecture: Each module (Auth, Users, Permissions, etc.) is isolated for scalability and maintainability.

Responsive Design: Built using Tailwind CSS for cross-device compatibility.

11. How to Run the Project
Prerequisites

Node.js and npm installed.

MySQL server running locally.

Backend Setup

Navigate to the server directory.

Install dependencies:

npm install


Create and configure the .env file as described above.

Start the development server:

npm run dev

Frontend Setup

Navigate to the client directory.

Install dependencies:

npm install


Start the frontend:

npm start


The frontend will start on http://localhost:3000 and connect to the backend on http://localhost:5000/api.

12. Conclusion

This project demonstrates a complete role-based enterprise management system with end-to-end authentication, authorization, and modular scalability.
It follows production-ready standards, secure coding practices, and provides a responsive, professional user interface for managing enterprises, users, and modules.
