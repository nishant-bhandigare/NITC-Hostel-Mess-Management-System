# 🏛️ NITC Hostel Mess Management System

A modern MERN-stack web application for digitizing hostel mess operations at NIT Calicut.

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Team](#team)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Overview

The **NITC Hostel Mess Management System** is a comprehensive full-stack platform designed to digitize and streamline mess operations at NIT Calicut. This system replaces traditional manual workflows with modern digital solutions, enabling efficient management of menus, attendance, feedback, and automated billing.

**Developed as part of CS6103E – Software Systems Lab by Team 19**

### Key Objectives

- **Digital Transformation**: Convert paper-based processes to digital workflows
- **Efficiency**: Automate billing, attendance tracking, and reporting
- **Accessibility**: Web-based platform accessible from any device
- **Security**: Role-based access control with JWT authentication
- **Analytics**: Real-time insights and comprehensive reporting

---

## Features

### 👨‍🎓 Student Features

- View weekly mess menu
- Mark daily attendance and register leaves
- Submit meal feedback with ratings and comments
- View and pay bills online
- Track personal attendance history
- Monitor monthly meal consumption

### 👨‍💼 Manager Features

- Create and publish weekly menus
- View attendance insights and analytics
- Monitor feedback and ratings
- Generate feedback reports (PDF export)
- Track mess-specific statistics
- View consolidated feedback data

### 👨‍💻 Admin Features

- Generate monthly bills for all students
- Manage user roles and permissions
- View system-wide reports and analytics
- Monitor payment records
- Access comprehensive system statistics
- Apply discounts and late fees

---

## Screenshots

### Authentication

<div align="center">

#### Login Page
![Login Page](./screenshots/login.png)

#### Registration Page
![Registration Page](./screenshots/register.png)

</div>

### Student Dashboard

<div align="center">

#### Student Dashboard
![Student Dashboard](./screenshots/student-dashboard.png)

#### Menu View
![Menu View](./screenshots/menu.png)

#### Attendance Tracking
![Attendance](./screenshots/attendance.png)

#### Bills & Payments
![Bills](./screenshots/bills.png)

</div>

### Manager Dashboard

<div align="center">

#### Manager Dashboard
![Manager Dashboard](./screenshots/manager-dashboard.png)

#### Menu Management
![Menu Management](./screenshots/menu-management.png)

#### Feedback Analytics
![Feedback Analytics](./screenshots/feedback-analytics.png)

#### Attendance Insights
![Attendance Insights](./screenshots/attendance-insights.png)

</div>

### Admin Dashboard

<div align="center">

#### Admin Dashboard
![Admin Dashboard](./screenshots/admin-dashboard.png)

#### Bill Generation
![Bill Generation](./screenshots/bill-generation.png)

#### System Reports
![System Reports](./screenshots/system-reports.png)

#### User Role Management
![User Roles](./screenshots/user-roles.png)

</div>

> **Note**: Add your screenshots to the `screenshots/` directory in the project root. Update the paths above to match your actual screenshot filenames.

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI Framework |
| Vite | 5.4 | Build Tool |
| Tailwind CSS | 3.4 | Styling |
| React Router DOM | 6.26 | Routing |
| Axios | 1.13 | HTTP Client |
| Recharts | 3.3 | Data Visualization |
| Lucide React | 0.468 | Icons |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime |
| Express.js | 5.1 | Web Framework |
| MongoDB | 8.19 | Database |
| Mongoose | 8.19 | ODM |
| JWT | 9.0 | Authentication |
| Express Validator | 7.3 | Input Validation |
| bcryptjs | 3.0 | Password Hashing |
| Node Cron | 4.2 | Task Scheduling |

---

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Step-by-Step Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/nishant-bhandigare/NITC-Hostel-Mess-Management-System.git
cd NITC-Hostel-Mess-Management-System
```

#### 2. Install Backend Dependencies

```bash
cd server
npm install
```

#### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## Configuration

### Backend Configuration

Create a `.env` file in the `server` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/nitc-mess
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# JWT Secret (generate a secure random string)
# Generate using: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_super_secret_jwt_key_here
```

### Frontend Configuration

Create a `.env` file in the `client` directory:

```env
# Backend API URL
# For local development:
VITE_SERVER_URL=http://localhost:5000

# For production (Vercel):
# VITE_SERVER_URL=https://your-backend-api.vercel.app
```

### Quick Setup

```bash
# Copy example files (if they exist)
cp server/.env.example server/.env
cp client/.env.example client/.env

# Edit the .env files with your configuration
# Make sure MongoDB is running
# Start the servers
```

---

## Usage

### Development Mode

#### Start Backend Server

```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

### Production Build

#### Build Frontend

```bash
cd client
npm run build
```

The production build will be created in the `dist` directory.

#### Preview Production Build

```bash
npm run preview
```

---

## Project Structure

```
NITC-Hostel-Mess-Management-System/
│
├── client/                    # Frontend React Application
│   ├── src/
│   │   ├── api/              # API service functions
│   │   ├── assets/            # Images and static files
│   │   ├── components/       # Reusable React components
│   │   ├── config/           # Configuration files
│   │   └── pages/            # Page components
│   ├── public/               # Public assets
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Backend Express Application
│   ├── config/               # Database configuration
│   ├── controllers/          # Route controllers
│   ├── cron/                 # Scheduled tasks
│   ├── middleware/           # Custom middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API routes
│   ├── package.json
│   └── server.js             # Entry point
│
├── screenshots/               # Application screenshots
└── README.md
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | User login | Public |
| POST | `/api/auth/logout` | User logout | Private |
| GET | `/api/auth/me` | Get current user | Private |

### Menu Management

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/menu/current/:messId` | Get current week menu | Public |
| GET | `/api/menu/previous/:messId` | Get previous week menu | Public |
| GET | `/api/menu/mess/:messId` | Get all menus for mess | Private |
| POST | `/api/menu` | Create new menu | Manager, Admin |
| PUT | `/api/menu/:id` | Update menu | Manager, Admin |
| PUT | `/api/menu/:id/publish` | Publish menu | Manager, Admin |
| DELETE | `/api/menu/:id` | Delete menu | Manager, Admin |

### Attendance

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/attendance` | Mark attendance | Student |
| POST | `/api/attendance/leave` | Register leave | Student |
| GET | `/api/attendance/my-attendance` | Get user attendance | Student |
| GET | `/api/attendance/monthly/:month/:year` | Get monthly summary | Student |
| GET | `/api/attendance/mess/:messId/:date` | Get mess attendance | Manager, Admin |

### Feedback

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/feedback` | Submit feedback | Student |
| GET | `/api/feedback/my-feedback` | Get user feedback | Student |
| GET | `/api/feedback/statistics` | Get feedback statistics | Manager, Admin |
| GET | `/api/feedback/mess` | Get mess feedbacks | Manager, Admin |

### Bills

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/bills/my-bills` | Get user bills | Student |
| POST | `/api/bills/generate-all` | Generate all bills | Admin |
| PUT | `/api/bills/mark-paid` | Mark bills as paid | Student, Manager, Admin |
| GET | `/api/bills/summary/:messId/:month/:year` | Get billing summary | Manager, Admin |

---

## Team

<div align="center">

### 👨‍💻 Team 19

| Name | Roll Number |
|------|-------------|
| **Nishant Tanaji Bhandigare** | M250923CS |
| **Sikta Roy** | M251045CS |
| **Vengidesan K** | M251103CS |

**Course**: CS6103E – Software Systems Lab  
**Institution**: National Institute of Technology Calicut (NITC)

</div>

---

## Troubleshooting

### Common Issues

#### Cannot connect to backend

**Problem**: Frontend cannot reach the backend API.

**Solutions**:
1. Verify backend server is running on port 5000
2. Check `VITE_SERVER_URL` in `client/.env`
3. Verify CORS configuration in `server/server.js`
4. Check firewall settings

#### MongoDB connection error

**Problem**: Backend cannot connect to MongoDB.

**Solutions**:
1. Verify `MONGO_URI` in `server/.env`
2. Ensure MongoDB is running (if local)
3. Check network connectivity for MongoDB Atlas
4. Verify credentials in connection string

#### Invalid credentials on login

**Problem**: Login fails with "Invalid credentials" error.

**Solutions**:
1. Verify user exists in database
2. Check password hashing (ensure bcrypt is working)
3. Ensure `JWT_SECRET` is set in environment variables
4. Check if user account is active (`isActive: true`)

#### CORS errors

**Problem**: Browser blocks API requests due to CORS policy.

**Solutions**:
1. Add frontend URL to `allowedOrigins` in `server/server.js`
2. Verify `FRONTEND_URL` in `server/.env`
3. Check if credentials are being sent correctly

#### Environment variables not loading

**Problem**: Environment variables are undefined.

**Solutions**:
1. Ensure `.env` files are in correct directories
2. Restart the development server after changing `.env`
3. Verify variable names match exactly (case-sensitive)
4. Check for typos in variable names

---

## License

This project is developed as part of **CS6103E – Software Systems Lab** at **National Institute of Technology Calicut**.

---

<div align="center">

**Made with ❤️ by Team 19 - NIT Calicut**

**⭐ Star this repo if you find it helpful!**

[⬆ Back to Top](#-nitc-hostel-mess-management-system)

</div>
