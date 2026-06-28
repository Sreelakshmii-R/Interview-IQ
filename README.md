# 🧠 Interview-IQ — AI Interview Simulator

Interview-IQ is an AI-powered interview practice platform that simulates real interview scenarios, evaluates answers, and provides instant feedback to help users improve their performance.

---

## 🚀 Live Demo
*(Add later after deployment)*  
https://your-live-demo-link.com

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

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Sreelakshmii-R/Interview-IQ.git
cd Interview-IQ
2️⃣ Install dependencies
Frontend
npm install
Backend
cd server
npm install
3️⃣ Setup environment variables

Create .env files:

server/.env
GROQ_API_KEY=your_api_key_here
PORT=5000
frontend .env (if needed)
REACT_APP_API_URL=http://localhost:5000
4️⃣ Run the project
Start backend
cd server
npm start
Start frontend
npm start
📊 Key Modules
Interview Engine → Generates AI-based questions
Evaluation Engine → Scores answers using AI
Report System → Generates feedback + performance score
History System → Stores past interviews
🔐 Security Notes
.env files are excluded using .gitignore
API keys must never be exposed in GitHub commits
🎯 Future Improvements
🎙️ Voice-based interviews
📹 Video interview simulation
🌍 Multi-language support
📱 Mobile-friendly UI improvements
☁️ Deployment (Vercel + Render)
👩‍💻 Author

Sreelakshmii Ramesh
GitHub: Sreelakshmii-R

⭐ If you like this project

Give this repo a ⭐ and feel free to contribute!