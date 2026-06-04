# 🎤 AI Mock Interview Platform

An AI-powered mock interview platform that helps candidates prepare for technical interviews through realistic interview simulations, voice interaction, coding challenges, and detailed AI-generated feedback.

## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based Authentication
- Protected Routes
- Persistent Login Sessions

### 📄 Resume Analysis
- Upload Resume (PDF)
- Resume Text Extraction
- Personalized Interview Questions Based on Resume

### 🤖 AI Interviewer
- AI-generated interview questions using Gemini AI
- Role-specific interview flow
- Dynamic follow-up questions
- Behavioral and Technical Questions

### 🎙️ Voice Interaction
- AI-generated voice using Murf AI
- Speech-to-Text support
- Conversational interview experience

### 💻 Coding Challenges
- Live coding questions
- Monaco Code Editor
- Code evaluation and scoring
- Multiple programming language support

### 📊 Feedback System
- AI-generated interview feedback
- Overall interview score
- Communication Skills Score
- Technical Knowledge Score
- Problem Solving Score
- Code Quality Score
- Confidence Score
- Strengths & Improvement Areas

### 📚 Interview History
- View previous interviews
- Review feedback reports
- Delete interview records
- Clear interview history

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- React Hot Toast
- React Icons
- Monaco Editor
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

## AI Services
- Gemini AI
- Murf AI
- AssemblyAI

---

# 📂 Project Structure

```bash
AI-Mock-Interview/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── context/
│   │   ├── constants/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Environment Variables

## Backend (.env)

Create a `.env` file inside the server folder.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

MURF_API_KEY=your_murf_api_key

ASSEMBLYAI_API_KEY=your_assemblyai_api_key
```

## Frontend (.env)

Create a `.env` file inside the client folder.

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/ai-mock-interview.git
```

```bash
cd ai-mock-interview
```

---

## Backend Setup

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start server:

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:5000
```

---

## Frontend Setup

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 📈 Workflow

```text
User Login
      ↓
Upload Resume
      ↓
Select Interview Role
      ↓
Start AI Interview
      ↓
Answer Questions
      ↓
Complete Coding Tasks
      ↓
Generate Feedback
      ↓
View Score Report
      ↓
Track History
```

---

# 🎯 Interview Roles

- Frontend Developer
- Backend Developer
- Full Stack Developer
- React Developer
- Java Developer
- Python Developer
- Data Analyst
- DevOps Engineer

---

# 📸 Screenshots

## Login Page

<img width="1488" height="827" alt="image" src="https://github.com/user-attachments/assets/eb3e11b1-b7ca-49e0-a7d5-f82bb5009625" />

## Dashboard

<img width="1406" height="908" alt="image" src="https://github.com/user-attachments/assets/12eff46d-7c06-4f51-86ff-67410e06cdad" />


## Interview Setup

<img width="1417" height="763" alt="image" src="https://github.com/user-attachments/assets/d3a73e4f-4bf8-4527-90d2-9876fe42ba37" />


## Interview Session

<img width="1523" height="788" alt="image" src="https://github.com/user-attachments/assets/3b22e02b-99a6-4d80-9637-1bbbad71d058" />
<img width="1412" height="759" alt="image" src="https://github.com/user-attachments/assets/9135559d-7e68-436b-884f-e0f1e858bc24" />


## Feedback Report

<img width="1392" height="836" alt="image" src="https://github.com/user-attachments/assets/29d8b57a-00e9-46c2-a699-a290e81830c8" />

---

# 🔮 Future Enhancements

- Video Interview Support
- AI Avatar Interviewer
- Multiple Resume Management
- Company-Specific Interview Preparation
- Interview Performance Analytics
- Leaderboard System
- Export Feedback as PDF
- Dark Mode

---

# 👨‍💻 Author

**Om Prakash Karri**

- GitHub: https://github.com/OMPRAKASHKARRI
- LinkedIn: https://www.linkedin.com

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
