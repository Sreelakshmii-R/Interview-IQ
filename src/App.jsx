import { useEffect, useState } from "react";
import RoleSelector from "./components/RoleSelector"
import Interview from "./components/Interview"
import pdfToText from "react-pdftotext"
import { analyzeResume } from "./services/resumeService";
import Features from "./components/Features";
import Report from "./components/Report";
import { generateReport } from "./services/reportService";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./components/Login.jsx";
import { getCurrentUser } from "./services/authService";
import { saveInterview } from "./services/interviewHistoryService";
import InterviewReplay from "./components/InterviewReplay";
import InterviewHistory from "./components/InterviewHistory";
import Dashboard from "./components/Dashboard";
import { getInterviewHistory } from "./services/interviewHistoryService";
import { BrowserRouter } from "react-router-dom";
import { signOut } from "./services/authService";



function App() {
  const [selectedRole, setSelectedRole] = useState("")
  const [startInterview, setStartInterview] = useState(false)
  const [resumeFile, setResumeFile] = useState(null)
  const [skills, setSkills] = useState([])
  const [resumeText, setResumeText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [candidateProfile, setCandidateProfile] = useState(null);
  const [report, setReport] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);
  const [showReplay, setShowReplay] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  
  useEffect(() => {
  console.log("HISTORY STATE:", history);
}, [history]);

  useEffect(() => {
  async function loadUser() {
    const currentUser = await getCurrentUser();
    setUser(currentUser);

    // 🔥 ADD THIS
    if (currentUser) {
      const interviews = await getInterviewHistory(currentUser.id);
      setHistory(interviews);
    }
  }

  loadUser();
}, []);

  const handleLogout = async () => {
    try {
      await signOut();

      // Clear local state
      setUser(null);
      setStartInterview(false);
      setShowHistory(false);
      setShowReport(false);
      setShowReplay(false);
      setHistory([]);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleResumeUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  setResumeFile(file);

  try {
    const text = await pdfToText(file);

    setResumeText(text);

    const commonSkills = [
      "Python", "JavaScript", "React", "Node.js", "Express.js",
      "Flask", "SQLite", "Supabase", "Git", "GitHub",
      "HTML", "CSS", "Bootstrap", "OpenCV", "SVM", "C++"
    ];

    const foundSkills = commonSkills.filter(skill =>
      text.toLowerCase().includes(skill.toLowerCase())
    );

    setSkills(foundSkills);

  } catch (error) {
    console.error("PDF reading failed", error);
  }
};
  
 

 const handleStartInterview = async () => {
  try {
    setLoading(true);

    setProgress(10);
    setLoadingMessage("Reading your resume...");

    if (!selectedRole) {
      alert("Please select a role.");
      setLoading(false);
      return;
    }

    if (!resumeText) {
      alert("Please upload your resume.");
      setLoading(false);
      return;
    }

    setLoadingMessage("🤖 AI is analyzing your resume...");

    // 🔥 Step 1: analyze resume
    const profileRes = await analyzeResume(resumeText, selectedRole);

    const profileData = profileRes.data;

    setCandidateProfile(profileData);

    setProgress(50);

    setLoadingMessage("🧠 AI is generating interview questions...");

    // 🔥 Step 2: generate session ID ONCE
    const sessionId = Date.now();

    // 🔥 Step 3: call backend directly (IMPORTANT FIX)
    const res = await fetch("http://localhost:5000/api/interview/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: selectedRole,
        profile: profileData,
        sessionId,
      }),
    });

    const interview = await res.json();

    if (!interview.success) {
      throw new Error("Failed to generate questions");
    }

    setQuestions(interview.data.questions);

    setProgress(100);
    setLoadingMessage("Almost ready...");

    setTimeout(() => {
      setLoading(false);
      setStartInterview(true);
    }, 800);

  } catch (err) {
    console.error(err);
    setLoading(false);
    alert(err.message);
  }
};
 
  const handleInterviewComplete = async (interviewResults) => {
  try {
    // 1. Generate final report from AI
    const finalReport = await generateReport(
      selectedRole,
      candidateProfile,
      interviewResults
    );

    // 2. Get current logged-in user
    const currentUser = await getCurrentUser();

    // 3. Save interview to Supabase
    await saveInterview(
      currentUser.id,
      selectedRole,
      finalReport
    );
    console.log("SAVED SUCCESSFULLY");

    // 4. Refresh interview history (THIS FIXES DASHBOARD ISSUE)
    const interviews = await getInterviewHistory(currentUser.id);
    setHistory(interviews);

    

    console.log("FINAL REPORT:", finalReport);

    // 5. Show report UI
    setReport(finalReport);
    setShowReport(true);

    // 6. Exit interview mode
    setStartInterview(false);

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



const handleBackHome = () => {
  setShowReplay(false);
  setShowReport(false);
  setStartInterview(false);

  setQuestions([]);
  setCandidateProfile(null);
  setReport(null);

  setResumeFile(null);
  setResumeText("");
  setSkills([]);

  setSelectedRole("");
};

  

if (startInterview) {
  return (
    <Interview
      questions={questions}
      selectedRole={selectedRole}
      candidateProfile={candidateProfile}
      onInterviewComplete={handleInterviewComplete}
      onExit={handleBackHome}
    />
  );
}

  

  if (loading) {
    return (
        <LoadingScreen
            message={loadingMessage}
            progress={progress}
        />
    );
  }

  if (!user) {
  return (
    <Login
      onLogin={async () => {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }}
    />
  );
}



  return (

    <BrowserRouter>
    <div className="min-h-screen bg-[#F8F6F2] text-gray-800">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">
          Interview<span className="text-purple-600">IQ</span>
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (showHistory) {
                setShowHistory(false);
              } else {
                document.getElementById("roles")?.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition"
          >
            Get Started
          </button>

          <button
            onClick={handleLogout}
            className="border border-red-500 text-red-500 px-5 py-2 rounded-full hover:bg-red-50 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN SWITCH */}
      {showReplay ? (
        <InterviewReplay
          report={report}
          onBack={() => setShowReplay(false)}
        />
      ) : showReport ? (
        <Report
          report={report}
          onBackHome={handleBackHome}
          onViewReplay={() => setShowReplay(true)}
        />
      ) : showHistory ? (
        <InterviewHistory
          onBack={() => setShowHistory(false)}
          onHistoryLoaded={setHistory}
          onViewReport={(savedReport) => {
            setReport(savedReport);
            setShowReport(true);
          }}
        />
      ) : !startInterview ? (
        <>
          {/* Hero Section */}
          <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
            <div className="text-center">

              <div className="inline-block bg-white px-4 py-2 rounded-full shadow-sm mb-6">
                ✨ AI-Powered Interview Practice
              </div>

              <h1 className="text-6xl font-bold leading-tight">
                Ace Your Next
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Interview with AI
                </span>
              </h1>

              <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto">
                Upload your resume, practice personalized interviews,
                receive instant AI feedback.
              </p>

              <div className="mt-10 flex justify-center gap-4 flex-wrap">

                <button
                  onClick={handleStartInterview}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition"
                >
                  Start Interview
                </button>

                <button
                  onClick={() => {
                    document.getElementById("features")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="bg-white border border-gray-300 px-8 py-4 rounded-2xl hover:bg-gray-50 transition"
                >
                  Learn More
                </button>

              </div>
              
            </div>
          </section>

          
      

          

          {/* Upload Card */}
          <section className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-3xl p-16 min-h-[350px] text-center flex flex-col items-center justify-center shadow-2xl">

              <div className="text-5xl mb-4">📄</div>

              <h3 className="text-xl font-semibold">
                Drag & Drop Resume
              </h3>

              <p className="text-gray-500 mt-2">
                PDF, DOC, DOCX supported
              </p>

              <label className="mt-6 inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-xl cursor-pointer hover:scale-105 transition">
                Choose File

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>

              {resumeFile && (
                <div className="mt-6">
                  <p className="text-green-600 font-semibold">
                    ✅ Resume Uploaded Successfully
                  </p>

                  <p className="text-gray-700 mt-2">
                    {resumeFile.name}
                  </p>

                  {skills.length > 0 && (
                    <p className="mt-2 text-purple-600">
                      Skills: {skills.join(", ")}
                    </p>
                  )}
                </div>
              )}

            </div>
          </section>

          {/* Role Selector */}
          <section id="roles">
            <RoleSelector
              selectedRole={selectedRole}
              setSelectedRole={setSelectedRole}
            />
          </section>

          {/* Start Button */}
          <div className="text-center py-16">
            <button
              onClick={handleStartInterview}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-4 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              Start Interview
            </button>
          </div>

          {/* Dashboard */}
          <div className="max-w-6xl mx-auto px-6 py-10">
            <Dashboard history={history} />
          </div>

          {/* Interview History Card */}
          <div className="max-w-6xl mx-auto px-6 pb-12">
            <div
              onClick={() => setShowHistory(true)}
              className="group cursor-pointer rounded-2xl border border-purple-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-purple-500 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">

                <div className="flex items-start gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 text-3xl">
                    📜
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Interview History
                    </h3>

                    <p className="mt-2 text-gray-500">
                      View your previous interviews, AI reports, and replay sessions.
                    </p>
                  </div>

                </div>

                <span className="text-2xl font-bold text-purple-500 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </div>
            </div>
          </div>

          {/* Features */}
          <section id="features">
            <Features />
          </section>

         
        
         </>
           
  
            
      
      ) : (
        <Interview
          questions={questions}
          selectedRole={selectedRole}
          candidateProfile={candidateProfile}
          onInterviewComplete={handleInterviewComplete}
          onExit={handleBackHome}
        />
      )}
    </div>
  </BrowserRouter>
);
}

export default App