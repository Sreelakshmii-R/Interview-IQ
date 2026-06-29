# Interview IQ – AI-Powered Interview Simulator

## 🚀 Project Description

Interview IQ is a full-stack AI-powered interview preparation platform that helps candidates practice technical interviews with personalized feedback.

The application analyzes a candidate's resume using AI, generates role-specific interview questions, evaluates responses, and provides detailed performance reports. It simulates a realistic interview experience while helping users identify strengths and areas for improvement.

---

## ✨ Features

### 📄 AI Resume Analysis

* Upload resume
* AI extracts strengths and weaknesses
* Personalized candidate profile
* Technical skill assessment
* Resume score

### 🎤 AI Interview Generation

* Role-specific interview questions
* Technical & behavioral questions
* Unique questions for every interview session
* Adjustable difficulty

### 🧠 AI Answer Evaluation

* Communication score
* Technical score
* Confidence score
* Strengths & weaknesses
* Personalized feedback

### 📊 Performance Dashboard

* Interview history
* Best score
* Average score
* Performance analytics

### 📑 AI Report Generation

* Overall summary
* Project analysis
* Learning ability
* Improvement suggestions
* Final verdict

### ☁️ Cloud Deployment

* Frontend deployed on Vercel
* Backend deployed on Render
* Supabase database

---

# 🛠 Tech Stack

### Frontend

* React
* Vite
* React Router
* CSS3

### Backend

* Node.js
* Express.js

### Database

* Supabase

### AI

* Groq API
* Llama 3

### Deployment

* Vercel
* Render

### Tools

* Git
* GitHub
* Postman

---

# 🏗 Project Architecture

```text
                User
                  │
                  ▼
        React + Vite Frontend
                  │
          REST API Requests
                  │
                  ▼
          Express.js Backend
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
    Groq AI             Supabase
        │                   │
        └─────────┬─────────┘
                  ▼
          AI Interview Report
```

---

# 📸 Screenshots



### Home Page

```
<img width="1860" height="772" alt="Screenshot 2026-06-29 160956" src="https://github.com/user-attachments/assets/7f2e5076-8020-4d6b-8020-a476346a00d0" />
```

---

### Resume Upload

```
<img width="1767" height="888" alt="image" src="https://github.com/user-attachments/assets/a5c40ef5-0b5a-41f7-815c-cf08e1293552" />
```

---

### Interview Screen

```
<img width="1895" height="908" alt="image" src="https://github.com/user-attachments/assets/d7daa800-d611-4399-8694-430481bdd450" />
```

---

### AI Report

```
<img width="1851" height="876" alt="image" src="https://github.com/user-attachments/assets/2850b7c1-b978-48aa-b71e-3f4638d13a86" />
<img width="1737" height="882" alt="image" src="https://github.com/user-attachments/assets/fa3b660f-0fd4-4214-bc77-b6cbe3cd78da" />
<img width="1752" height="906" alt="image" src="https://github.com/user-attachments/assets/eec5734f-657d-4951-ab21-d19297bd0041" />
<img width="1802" height="810" alt="image" src="https://github.com/user-attachments/assets/74e3fcf3-8fa2-4afd-a1d9-2b986350f188" />

```

---

### Dashboard

```
<img width="1747" height="811" alt="image" src="https://github.com/user-attachments/assets/be8ad63c-588d-4f4d-a39d-8394814425ca" />
```

---

# 🌐 Live Demo

**Frontend**

```
https://interview-iq-chi.vercel.app/
```

**Backend**

```
https://interview-iq-backend-qb8p.onrender.com
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Sreelakshmii-R/Interview-IQ.git
```

Go to the project

```bash
cd Interview-IQ
```

Install frontend dependencies

```bash
npm install
```

Install backend dependencies

```bash
cd server
npm install
```

---

## Environment Variables

Frontend `.env`

```env
VITE_API_URL=your_render_backend_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

Backend `.env`

```env
GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## Run Locally

Frontend

```bash
npm run dev
```

Backend

```bash
cd server
npm start
```

---

# 📁 Project Structure

```text
Interview-IQ/
│
├── src/
│   ├── components/
│   ├── services/
│   ├── lib/
│   ├── assets/
│   └── App.jsx
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# 🎯 Future Enhancements

* User Authentication
* Voice-based Interviews
* AI Follow-up Questions
* PDF Report Download
* Performance Charts
* Interview Difficulty Levels
* Dark Mode
* Multi-language Support

---

# 👨‍💻 Author

**Sreelakshmi Ramesh**

GitHub: `https://github.com/Sreelakshmii-R`

LinkedIn: `https://linkedin.com/in/sreelakshmi62380`

---



