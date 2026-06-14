# Shorelume Tech - Advanced Learning & Tech Internships Platform

Shorelume Tech is an educational and internship management web application. The platform enables students to master in-demand industry skills through practical courses, apply for hands-on production internships, and track their application lifecycle. Admins can manage courses, review internship applications, and export records for auditing.

---

## 🏗️ Project Architecture

The application is structured as a full-stack **MERN** stack application:
*   **Frontend**: React.js SPA built with Vite, styled with Tailwind CSS, using Lucide React for iconography.
*   **Backend**: Node.js and Express.js REST API with database models compiled using Mongoose ODM.
*   **Database**: MongoDB Atlas cloud-hosted database.
*   **CI/CD**: GitHub Actions workflow verifying production builds and triggering deployments automatically.

---

## 📁 Repository Structure

```text
Shorelume/
├── .github/workflows/deploy.yml   # GitHub Actions CI/CD pipeline
├── backend/                       # Express server codebase
│   ├── src/
│   │   ├── config/                # Database connection configuration
│   │   ├── controllers/           # API handlers (auth, courses, internships, etc.)
│   │   ├── middleware/            # JWT authentication and Multer file upload
│   │   ├── models/                # Mongoose database schemas
│   │   ├── routes/                # REST endpoints routing
│   │   └── app.js                 # Express server configuration
│   └── package.json
├── frontend/                      # React frontend codebase
│   ├── src/
│   │   ├── components/            # Shared layouts, footers, navbars
│   │   ├── config/                # Dynamic API endpoint resolution (Axios)
│   │   ├── pages/                 # Marketing landing, User & Admin dashboards
│   │   └── main.jsx               # Entrypoint
│   └── package.json
├── package.json                   # Root orchestrator scripts
└── README.md                      # Project documentation
```

---

## 💻 Local Development

### Prerequisites
*   Node.js (v18 or higher recommended)
*   MongoDB Instance (Local or Cloud Atlas)

### Setup & Run
1.  **Clone the Repository**:
    ```bash
    git clone <your-repository-url>
    cd Shorelume
    ```
2.  **Install Dependencies** (Installs frontend and backend packages concurrently):
    ```bash
    npm run install-all
    ```
3.  **Setup Environment Variables**:
    *   Create a `.env` file inside the `backend/` directory:
        ```env
        PORT=5000
        MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shorelume
        JWT_SECRET=your_jwt_secret_key
        ```
4.  **Start Development Servers** (Runs React Vite client on port `5173` and Express backend on port `5000` concurrently):
    ```bash
    npm run dev
    ```

---

## 📦 Production Build & Testing

To bundle the application and test the production configuration locally:

1.  **Build the Frontend**:
    ```bash
    npm run build
    ```
    This compiles the React assets into `frontend/dist/`. The backend is pre-configured to automatically serve these compiled static files in a production environment.
2.  **Start Production Server**:
    ```bash
    # For Windows:
    $env:NODE_ENV="production"; npm start

    # For macOS/Linux:
    NODE_ENV=production npm start
    ```
    Open `http://localhost:5000` to access the production-ready website.

---

## 🚀 Cloud Deployment Guide

The codebase is optimized for a **Unified Single-Server Deployment** on **Render** (free-tier friendly and avoids CORS configuration overhead).

### Step 1: Configure MongoDB Atlas access
Because Render servers use dynamic IPs, you must allow connection access in MongoDB:
1.  Navigate to your MongoDB Atlas dashboard -> **Network Access**.
2.  Click **Add IP Address** and whitelist **Allow Access From Anywhere** (`0.0.0.0/0`).

### Step 2: Create a Web Service on Render
1.  Log in to [Render](https://render.com/) and create a new **Web Service**.
2.  Connect your GitHub repository containing this codebase.
3.  Configure these deployment settings:
    *   **Runtime**: `Node`
    *   **Build Command**: `npm run build`
    *   **Start Command**: `npm start`
    *   **Instance Type**: `Free`
4.  Add the following **Environment Variables** in the Advanced settings:
    *   `NODE_ENV` = `production`
    *   `MONGODB_URI` = `mongodb+srv://<username>:<password>@cluster.mongodb.net/shorelume`
    *   `JWT_SECRET` = (Provide a secure random text key)

---

## ⚙️ GitHub Actions CI/CD Integration

To ensure stable deploys and run automatic tests:
1.  **Disable Auto-Deploy on Render**: In your Render Web Service settings, toggle **Auto-Deploy** to **No**.
2.  **Get Deploy Hook URL**: Copy the webhook link under the **Deploy Hook** section in Render.
3.  **Add Secret to GitHub**:
    *   Go to your GitHub repository page -> **Settings** -> **Secrets and variables** -> **Actions**.
    *   Add a new repository secret:
        *   **Name**: `RENDER_DEPLOY_HOOK`
        *   **Value**: Paste the Render webhook URL.
Now, on every push to the `main` branch, GitHub Actions will compile the build first. If it builds successfully, it sends a secure request to Render to redeploy the live site.
