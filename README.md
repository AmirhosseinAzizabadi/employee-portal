# 🚀 Full-Stack MERN Job Portal & HR Management System

A robust, enterprise-grade web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) designed to modernize talent recruitment workflows, streamline candidate tracking, and empower human resource teams with secure, data-driven tools.

---

## ✨ Key Features

* **🧑‍💻 Candidate Portal:** Seamless user registration, interactive profile dashboard, and secure resume/file management.
* **🏢 HR & Admin Dashboard:** Role-Based Access Control (RBAC), advanced applicant filtering, and centralized applicant tracking.
* **📬 Automated Communication:** Smart, automated email notifications via **Nodemailer** for application confirmations and status updates.
* **🛡️ Enterprise Security:** Protected endpoints using **JWT (JSON Web Tokens)**, robust password hashing via **Bcrypt.js**, and strict environment configuration.

---

## 🛠️ Tech Stack & Architecture

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React.js, React Router, Axios, Tailwind CSS |
| **Backend** | Node.js, Express.js, RESTful APIs |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT, Bcrypt.js |
| **Utilities** | Nodemailer, Multer (File Uploads), CORS, dotenv |

---

## 📦 Installation & Quick Start

Follow these steps to set up and run the project locally on your machine:

### 1. Clone the repository:

    git clone [https://github.com/AmirhosseinAzizabadi/employee-portal.git](https://github.com/AmirhosseinAzizabadi/employee-portal.git)
    cd employee-portal

### 2. Backend Setup:

    cd backend
    npm install

*(Note: Create a `.env` file in the `backend` directory using `.env.example` as a template and add your `MONGO_URI` and `JWT_SECRET`.)*

Run the backend server:

    npm run dev

### 3. Frontend Setup:
Open a new terminal tab/window and run:

    cd frontend
    npm install
    npm start

---

## 📁 Project Structure

    employee-portal/
    ├── backend/
    │   ├── middleware/        # JWT Authentication & file upload interceptors
    │   ├── models/            # Mongoose schemas (User, Job, Application)
    │   ├── routes/            # RESTful API endpoint definitions
    │   ├── uploads/           # Storage directory for resumes and attachments
    │   ├── utils/             # Helper tools (sendEmail, error dispatchers)
    │   ├── .env.example       # Template for required environment variables
    │   └── server.js          # Main application entry point & DB connection
    │
    └── frontend/
        ├── public/            # Static HTML, icons, and manifest files
        ├── src/
        │   ├── components/    # Reusable UI components (Navbar, Sidebar, Cards)
        │   ├── context/       # Global React context providers (Auth/Theme)
        │   ├── pages/         # Core application views (Dashboard, Login, Register)
        │   ├── services/      # Centralized Axios HTTP communication layer
        │   └── App.js         # Master React router & layout wrapper
        └── package.json       # Frontend dependencies and build configurations

---

## 🛡️ Security
This project uses `.gitignore` to prevent sensitive environment variables (`.env`) and heavy dependencies (`node_modules`) from being committed to the repository. Ensure you configure your own local `.env` file before running the backend.

---

## 👨‍💻 Author & License
Designed and Developed by **Amirhossein Azizabadi**  
Licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.