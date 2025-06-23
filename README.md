# 💬 Feedback Tool

This is a full-stack feedback application built with **React (frontend)** and **FastAPI (backend)**, allowing managers and employees to securely exchange structured feedback.

---

## 🚀 Features

### 🧑‍💼 Manager
- View all team members
- Submit feedback for employees
- View feedback history per employee

### 👩‍💻 Employee
- View feedback received from manager
- Submit feedback to manager
- Feedback includes sentiment and comments

---

## 🛠 Tech Stack

| Layer        | Technology         |
|--------------|--------------------|
| Frontend     | React, Axios       |
| Backend      | FastAPI, SQLite    |
| Auth         | JWT Authentication |
| ORM          | SQLAlchemy         |
| Container    | Docker             |

---

## ⚙️ Setup Instructions

### 🔧 Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate     # or source venv/bin/activate (Linux/macOS)
pip install -r requirements.txt
uvicorn main:app --reload

👉 Swagger UI available at: http://localhost:8000/docs


🌐 Frontend
cd feedback-tool-frontend
npm install
npm start
👉 React app runs on: http://localhost:3000

🐳 Docker Setup
To run the backend with Docker:

bash
Copy code
cd backend
docker build -t feedback-backend .
docker run -p 8000:8000 feedback-backend


🔐 Login Credentials (Seeded)
Manager
Email: manager@example.com

Password: manager

Employee
Email: employee@example.com

Password: employee

📁 Folder Structure

feedback-tool/
├── backend/
│   ├── main.py
│   ├── auth.py
│   ├── models.py
│   ├── routes/
│   ├── schemas.py
│   ├── database.py
│   └── Dockerfile
├── feedback-tool-frontend/
│   ├── src/
│   └── package.json
