# Shorelume Tech - System Architecture & Project Blueprint

This document outlines the complete system architecture, database schema design, API specification, folder structures, deployment strategy, and development roadmap for the **Shorelume Tech** educational platform.

## User Review Required

> [!IMPORTANT]
> **File Storage on Render:** The backend is planned for deployment on Render, which has an ephemeral file system. Any files (such as user resumes uploaded via Multer) saved locally on the Render server will be lost upon server restart or redeploy. 
> **Recommendation:** We should use a cloud storage provider (like AWS S3 or Cloudinary) in conjunction with Multer to permanently store files. Please confirm if this approach is acceptable.

> [!NOTE]
> **Payment Gateway:** The requirements mention "Payment Management" and "Payment Status." While we have designed the architecture to track payments, we will need to integrate a payment gateway (e.g., Razorpay, Stripe) during the implementation phase. 

---

## 1. System Architecture

The platform will be built on a decoupled, scalable **MERN** stack architecture:

*   **Client Tier (Frontend):** React.js SPA built with Vite for fast HMR and optimized builds. Styled using Tailwind CSS. Routing is handled by React Router DOM, and state management/form handling uses React Hook Form.
*   **Application Tier (Backend):** Node.js and Express.js RESTful API handling business logic, routing, authentication, file processing (Multer), Excel generation (ExcelJS), and email dispatching (Nodemailer).
*   **Data Tier (Database):** MongoDB Atlas (cloud-hosted NoSQL database) accessed via Mongoose ODM.
*   **Security layer:** JWT (JSON Web Tokens) used for stateless authentication. Passwords hashed via bcrypt.

---

## 2. Database Schema Design

The database will consist of the following primary collections.

### `User`
*   `_id`: ObjectId
*   `name`: String
*   `email`: String (Unique)
*   `password`: String (Hashed)
*   `phone`: String
*   `college`: String
*   `role`: String (Enum: `User`, `Admin`) - *Default: User*
*   `createdAt` / `updatedAt`: Timestamps

### `Course`
*   `_id`: ObjectId
*   `title`: String
*   `category`: String (Enum: AI, Data Science, ML, Full Stack, etc.)
*   `description`: String
*   `price`: Number
*   `thumbnailUrl`: String
*   `createdAt` / `updatedAt`: Timestamps

### `Registration`
*   `_id`: ObjectId
*   `userId`: ObjectId (Ref: User)
*   `courseId`: ObjectId (Ref: Course)
*   `paymentStatus`: String (Enum: `Pending`, `Completed`, `Failed`)
*   `registrationDate`: Date - *Default: Date.now()*

### `Internship`
*   `_id`: ObjectId
*   `title`: String
*   `description`: String
*   `duration`: String
*   `requirements`: Array of Strings
*   `createdAt` / `updatedAt`: Timestamps

### `InternshipApplication`
*   `_id`: ObjectId
*   `userId`: ObjectId (Ref: User)
*   `internshipId`: ObjectId (Ref: Internship)
*   `resumeUrl`: String
*   `status`: String (Enum: `Applied`, `Reviewed`, `Accepted`, `Rejected`)
*   `appliedDate`: Date - *Default: Date.now()*

---

## 3. API Endpoint List

### Authentication
*   `POST /api/auth/register` - Register a new user
*   `POST /api/auth/login` - Authenticate user & return JWT
*   `GET /api/auth/me` - Get current logged-in user profile

### Users (Protected)
*   `GET /api/users` - Get all users (Admin only)
*   `GET /api/users/:id` - Get specific user
*   `PUT /api/users/profile` - Update own profile

### Courses
*   `GET /api/courses` - Get all courses (Public)
*   `GET /api/courses/:id` - Get course details (Public)
*   `POST /api/courses` - Create new course (Admin only)
*   `PUT /api/courses/:id` - Update course (Admin only)
*   `DELETE /api/courses/:id` - Delete course (Admin only)

### Registrations (Protected)
*   `POST /api/registrations` - Register for a course
*   `GET /api/registrations/my-registrations` - Get logged-in user's registrations
*   `GET /api/registrations` - Get all registrations (Admin only)
*   `GET /api/registrations/export` - Export all registrations to ExcelJS (Admin only)

### Internships
*   `GET /api/internships` - Get all internships (Public)
*   `POST /api/internships` - Create internship (Admin only)
*   `PUT /api/internships/:id` - Update internship (Admin only)
*   `DELETE /api/internships/:id` - Delete internship (Admin only)

### Internship Applications (Protected)
*   `POST /api/applications` - Apply for internship (Expects multipart/form-data for Resume via Multer)
*   `GET /api/applications/my-applications` - Get logged-in user's applications
*   `GET /api/applications` - Get all applications (Admin only)
*   `PUT /api/applications/:id/status` - Update application status (Admin only)

---

## 4. Frontend Folder Structure

```text
frontend/
├── public/                 # Static assets (favicon, manifest, etc.)
├── src/
│   ├── assets/             # Images, SVGs, and global CSS
│   ├── components/
│   │   ├── common/         # Reusable UI (Navbar, Footer, Button, Modal)
│   │   ├── forms/          # Form components (Inputs, Selects)
│   │   └── layout/         # Wrappers (MainLayout, DashboardLayout)
│   ├── config/             # Environment configs, axios instances
│   ├── context/            # React Context (AuthContext)
│   ├── hooks/              # Custom hooks (useAuth, useFetch)
│   ├── pages/
│   │   ├── public/         # Home, About, Courses, Contact, Login, Signup, etc.
│   │   ├── user/           # Dashboard, Profile, MyRegistrations, MyApplications
│   │   └── admin/          # Admin Dashboard, ManageUsers, ManageCourses, etc.
│   ├── routes/             # App Router, Protected Routes, Admin Routes
│   ├── services/           # API call definitions (authService, courseService)
│   ├── utils/              # Helper functions (formatDate, validators)
│   ├── App.jsx             # Main App component
│   └── main.jsx            # Entry point
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── package.json
```

---

## 5. Backend Folder Structure

```text
backend/
├── src/
│   ├── config/             # DB connection (db.js), environment variables loader
│   ├── controllers/        # Route controllers (authController, courseController, etc.)
│   ├── middlewares/        # Custom middlewares (authMiddleware, adminMiddleware, uploadMiddleware)
│   ├── models/             # Mongoose schemas (User, Course, Registration, etc.)
│   ├── routes/             # Express API routes (authRoutes, courseRoutes, etc.)
│   ├── services/           # Business logic (emailService.js, excelService.js)
│   ├── utils/              # Error handlers (AppError, catchAsync)
│   ├── app.js              # Express app initialization & global middlewares
│   └── server.js           # Server entry point & DB connection execution
├── uploads/                # Temporary directory for Multer file uploads
├── .env                    # Environment variables (DB URI, JWT Secret)
└── package.json
```

---

## 6. Deployment Architecture

*   **Frontend (Vercel):** Connected directly to the GitHub repository. Vercel will automatically build the Vite app and deploy it on its global CDN edge network. Environment variables (API base URL) will be configured in the Vercel dashboard.
*   **Backend (Render):** Deployed as a Web Service on Render. Linked to the GitHub repository to trigger deployments on push. Will use the standard `npm start` (pointing to `node src/server.js`) command.
*   **Database (MongoDB Atlas):** Fully managed cloud database. Network access will be configured to allow connections from the Render backend.

---

## 7. Development Roadmap

*   **Phase 1: Project Setup & Architecture (Current)**
    *   Initialize repositories, configure Vite, Tailwind, Express, and MongoDB.
*   **Phase 2: Backend Core (Authentication & User Management)**
    *   Set up Models, JWT Authentication, bcrypt hashing, and User profiles.
*   **Phase 3: Frontend Foundations & Public Pages**
    *   Develop UI components, Home, About, Courses, Contact, Login, and Signup pages.
*   **Phase 4: Course & Registration Flow**
    *   Build Course management APIs, Registration flow, and User/Admin dashboards for courses.
*   **Phase 5: Internship Module & File Uploads**
    *   Implement Internship listings, application API with Multer resume uploads, and tracking.
*   **Phase 6: Advanced Features & Refinement**
    *   Build the ExcelJS export functionality for admins, Nodemailer email notifications, and Payment status management.
*   **Phase 7: Testing & Deployment**
    *   End-to-end testing, error handling, final polishing, and deployment to Vercel, Render, and MongoDB Atlas.

---

## 8. Recommended Package List

### Frontend (`package.json`)
*   `react`, `react-dom` - Core framework
*   `react-router-dom` - Client-side routing
*   `axios` - HTTP requests
*   `react-hook-form` - Form state and validation
*   `yup` or `zod` - Schema validation for forms
*   `tailwindcss`, `postcss`, `autoprefixer` - Styling
*   `lucide-react` - Modern, lightweight SVG icons
*   `react-hot-toast` or `sonner` - Beautiful toast notifications
*   `framer-motion` - Animations (for a premium look and feel)

### Backend (`package.json`)
*   `express` - Web framework
*   `mongoose` - MongoDB object modeling
*   `dotenv` - Environment variable management
*   `cors` - Cross-Origin Resource Sharing
*   `helmet` - Security headers
*   `morgan` - HTTP request logger
*   `jsonwebtoken` - JWT generation and verification
*   `bcryptjs` - Password hashing
*   `multer` - Multipart/form-data handling (file uploads)
*   `exceljs` - Generate robust Excel files
*   `nodemailer` - Send transactional emails
*   `cloudinary` - (Recommended) Cloud file storage integration for resumes/images
