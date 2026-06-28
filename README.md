# 🧠 Interview-IQ — AI Interview Simulator

Interview-IQ is an AI-powered interview practice platform that simulates real interview scenarios, evaluates answers, and provides instant feedback to help users improve their performance.

---



## ✨ Features

- 🎤 AI-generated interview questions based on role
- 📄 Resume-based personalized interview flow
- 🧠 AI-powered answer evaluation
- 📊 Instant performance reports with scoring
- 📁 Interview history tracking
- 🔁 Replay previous interviews
- 🔐 Authentication using Supabase

---

## 🏗️ Tech Stack

### Frontend
- React.js
- JavaScript (ES6+)
- CSS

### Backend
- Node.js
- Express.js

### AI Integration
- Groq / LLM API (for question generation & evaluation)

### Database & Auth
- Supabase

---

## 📁 Project Structure


Interview-IQ/
│
├── server/ # Backend (Express)
│ ├── controllers/
│ ├── routes/
│ ├── services/
│ ├── prompts/
│ └── index.js
│
├── src/ # Frontend (React)
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx
│
├── package.json
└── README.md


---

⚙️ Setup Instructions
1. Clone the repo
git clone https://github.com/Sreelakshmii-R/Interview-IQ.git
cd Interview-IQ
2. Install dependencies
Backend setup
cd server
npm install
3. Create environment variables
Backend .env

Create this file:

server/.env

Add:

GROQ_API_KEY=your_api_key_here
PORT=5000
Frontend .env (optional)

Create this file in root:

.env

Add:

REACT_APP_API_URL=http://localhost:5000
4. Run backend server
cd server
npm start
5. Run frontend app

Open a new terminal:

cd ..
npm install
npm start
▶️ Final Running Setup

You must run both together:

🖥️ Backend → server terminal
🌐 Frontend → main project terminal

⚠️ QUICK REMINDER
- .env file MUST be inside server/
- Never push .env to GitHub
- If frontend .env not needed, you can skip it

📊 Key Modules
- Interview Engine → Generates AI-based questions
- Evaluation Engine → Scores answers using AI
- Report System → Generates feedback + performance score
- History System → Stores past interviews

🔐 Security Notes
- Environment variables are excluded using .gitignore
- API keys are never committed to GitHub
- Secure backend API handling implemented

🎯 Future Improvements
- 🎙️ Voice-based interviews
- 📹 Video interview simulation
- 🌍 Multi-language support
- 📱 Mobile-friendly UI improvements
- ☁️ Deployment (Vercel + Render)
- 👩‍💻 Author

Sreelakshmii Ramesh
GitHub: Sreelakshmii-R

⭐ If you like this project

Give this repo a ⭐ and feel free to contribute!