# Personal Task Manager

A full-stack MERN Task Management application that helps users organize, track, and manage their daily tasks through a Kanban-style board. The application includes secure JWT authentication, drag-and-drop task management, priority tracking, due dates, activity logs, and MongoDB integration.

# 🔗 Live Demo

# https://personal-task-board.vercel.app

---

## 🚀 Features

- 🔐 JWT Authentication & Authorization
- 👤 User Registration & Login
- 📋 Kanban Board (To Do, Doing, Done)
- 🎯 Drag & Drop Task Management
- ➕ Create Tasks
- ✏️ Edit Tasks
- 🗑️ Delete Tasks
- 🔎 Search Tasks
- 🏷️ Priority Levels (Low, Medium, High)
- 📅 Due Date Tracking
- ⚠️ Overdue Task Detection
- 📜 Activity Log Tracking
- 🔄 Persistent Database Storage
- 📱 Responsive User Interface

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Context API
- Axios
- DnD Kit
- Custom CSS

### Backend
- Node.js
- Express.js
- JWT
- bcryptjs
- Mongoose

### Database
- MongoDB Atlas

### Deployment
- Vercel
- Render

---

## 📦 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/thatguywhocode/Personal-Task-Board.git
cd task-board
```

---

### 2️⃣ Install Frontend Dependencies

```bash
npm install
```

---

### 3️⃣ Install Backend Dependencies

```bash
cd server
npm install
```

---

### 4️⃣ Configure Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 5️⃣ Start Backend Server

```bash
cd server
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

---

### 6️⃣ Start Frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Tasks

```http
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

## 📂 Project Structure

```text
personal-task-manager/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── App.jsx
│
├── server/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── README.md
├── package.json
└── vite.config.js
```

---

## 🔒 Security Features

- JWT Authentication
- Password Hashing with bcrypt
- Protected API Routes
- User-Specific Task Access
- Token Verification Middleware

---

## 🎯 Future Enhancements

- 📌 Recursive Subtasks
- 🔔 Email Notifications
- 🤝 Team Collaboration
- ⚡ Real-Time Updates
- 🤖 AI-Powered Task Suggestions
- 📄 Server-Side Pagination

---

## 📄 License

This project was developed for educational and assessment purposes.
