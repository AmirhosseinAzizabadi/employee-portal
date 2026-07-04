# EditLabMedia - Talent Recruitment & HR Management System

> A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to streamline HR recruitment workflows and manage candidate profiles.

## 🚀 Overview
EditLabMedia provides a robust platform for managing job applications. Candidates can submit their profiles, upload resumes, and track their application status, while HR admins can manage the database and review applicants through a secured dashboard.

## 🛠️ Tech Stack
- **Frontend:** React.js, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, RESTful APIs
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens), Bcrypt.js
- **Security:** Helmet, CORS, Environment Variables

## ✨ Key Features
- **Candidate Portal:** Secure registration, profile management, and multi-file uploads (Resume/PDF).
- **Automated Communication:** Automated email notifications for successful application submissions using Nodemailer.
- **Admin Dashboard:** Role-based access control (RBAC), applicant filtering, and profile management.
- **Data Integrity:** Password hashing with Bcrypt and JWT-based session security.

## ⚙️ Deployment & Setup
1. Clone the repository: `git clone https://github.com/AmirhosseinAzizabadi/EditLabMedia.git`
2. Install dependencies:
   - Run `npm install` inside the `backend` folder.
   - Run `npm install` inside the `frontend` folder.
3. Configure the `.env` file in the `backend` directory (use `.env.example` as a template).
4. Start the development servers:
   - Backend: `npm run dev`
   - Frontend: `npm start`

## 🛡️ Security
This project uses `.gitignore` to prevent sensitive environment variables and dependencies from being committed to the repository. Ensure you provide your own `.env` file locally.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.