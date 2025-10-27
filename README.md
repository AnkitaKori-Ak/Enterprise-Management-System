# Role-Based Access Control System with Enterprise Management
1.Technologies Used

Frontend: React.js 
Backend: Node.js + Express.js
Database: MySQL
Auth: JWT with HttpOnly Cookies (secure & production-ready)

2.Project Overview

The Role-Based Access Control System (RBAC) is a full-stack web application designed to manage multiple modules such as Users, Roles, Enterprises, Employees, and Products with fine-grained role-based permissions.

Administrators can assign module-level permissions (Create, Read, Update, Delete) to different roles and dynamically control access both in the frontend and backend.

3.Key Features
Authentication & Authorization

Secure login using JWT tokens stored in HttpOnly cookies.

Role-based access middleware on backend routes.

Automatic UI-based permission enforcement — users only see what they’re allowed to access.

4. Admin Capabilities

Full access to all modules.

Manage Enterprises, Employees, Products, and Roles.

Create, edit, or delete users (Admin-only).

Dashboard displaying total counts of all entities.

5.User Role

Restricted module visibility based on assigned role permissions.

Cannot access, create, or manage modules unless granted permission.

6.How It Works
Backend (Node.js + Express + MySQL)

Authentication Flow

User logs in with email & password.

JWT token is generated and stored in an HttpOnly cookie.

Subsequent API requests validate the JWT and decode the role & permissions.

7.Role-Based Middleware

Middleware checks the authenticated user’s role & module permissions.

Unauthorized actions are blocked at the API layer and UI Layer.

Permission Management

8.Frontend (React)

Login UI — simple and secure form with password visibility toggle.

Dynamic Sidebar — only displays tabs the user has read access for.

Permission-Based UI Rendering — buttons for Add/Edit/Delete only appear if allowed.

Dashboard — dynamic cards show module counts, hidden if user lacks permission.

9.Create a .env file inside /server:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=rbac_db
JWT_SECRET=your_jwt_secret
COOKIE_NAME=token

10.Security & Non-Functional Highlights

JWT with HttpOnly Cookie: Prevents XSS/CSRF token theft.

BCrypt password hashing: Secure user credential storage.

RBAC middleware: Enforces least-privilege access across backend APIs.

Modular architecture: Each module is isolated for scalability and maintainability.

Responsive UI: Built with Tailwind for adaptive layouts.

11.Conclusion

This project demonstrates a complete role-based enterprise management system with end-to-end authentication, authorization, and modular scalability.
It follows production-ready standards, secure coding practices, and a responsive UI for smooth usability.

