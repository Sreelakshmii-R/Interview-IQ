import { useRef, useState } from "react";

function Interview({
  questions,
  selectedRole,
  candidateProfile,
  onInterviewComplete,
  onExit,
}) {
  const recognitionRef = useRef(null);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  
  const [listening, setListening] = useState(false);
  
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  

  // -----------------------------
  // Start / Stop Speech
  // -----------------------------
  const toggleSpeech = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported.");
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }

      setAnswer(transcript);
    };

    recognition.start();

    recognitionRef.current = recognition;
    setListening(true);
  };

  // -----------------------------
  // Submit Answer
  // -----------------------------
  const submitAnswer = () => {
  if (!answer.trim()) {
    alert("Please answer the question.");
    return;
  }

  const updatedAnswers = [...answers];

  updatedAnswers[currentQuestion] = {
    question: questions[currentQuestion],
    answer,
  };

  setAnswers(updatedAnswers);

  setSubmitted(true);
};

  // -----------------------------
  // Next Question
  // -----------------------------
  const nextQuestion = async () => {
    setSubmitted(false);
  if (!answers[currentQuestion]) {
    alert("Please submit your answer first.");
    return;
  }

  if (currentQuestion === questions.length - 1) {
    await onInterviewComplete(answers);
    return;
  }

  setCurrentQuestion((prev) => prev + 1);
  setAnswer("");
};

  // -----------------------------
  // Interview Finished
  // -----------------------------
  console.log("onExit =", onExit);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-[#F8F6F2] p-8">

      <div className="text-center mb-8">

        <h1 className="text-3xl font-bold">
          Interview Mode
        </h1>

        <p className="text-gray-600 mt-2">
          Role: {selectedRole}
        </p>

        <p className="text-gray-600 mt-2">
          Profile: {candidateProfile?.level || "junior"}
        </p>

      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-xl font-semibold">
          Question {currentQuestion + 1}
        </h2>

        <p className="mt-4 text-lg">
          {questions[currentQuestion].question}
        </p>

      </div>

      <div className="text-center mt-8">

        <button
          onClick={toggleSpeech}
          className={`px-8 py-3 rounded-xl text-white ${
            listening
              ? "bg-red-500"
              : "bg-purple-600"
          }`}
        >
          {listening
            ? "Stop Speaking"
            : "Start Speaking"}
        </button>

      </div>

      <div className="max-w-3xl mx-auto mt-8">

        <textarea
          rows={8}
          value={answer}
          readOnly
          className="w-full rounded-xl border p-4"
          placeholder="Your answer will appear here..."
        />

      </div>

      <div className="flex justify-center gap-4 mt-8">

        <button
          onClick={submitAnswer}
          disabled={submitted}
          className={`px-5 py-2 rounded-lg text-white transition ${
            submitted
              ? "bg-green-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitted ? "✓ Submitted" : "Submit Answer"}
        </button>

        <button
          onClick={nextQuestion}
          className={`px-6 py-2 rounded-lg text-white ${
            currentQuestion === questions.length - 1
              ? "bg-blue-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {currentQuestion === questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
        </button>

      </div>

    
      <div className="text-center mt-10">

        <button
          onClick={onExit}
          className="text-purple-600"
        >
          Back Home
        </button>

      </div>

    </div>
  );
}

export default Interview;