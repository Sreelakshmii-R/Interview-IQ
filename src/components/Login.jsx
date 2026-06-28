import { useState } from "react";
import { signIn, signUp } from "../services/authService";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        await signUp(email, password);
        alert("Account created successfully! Please log in.");
        setIsSignup(false);
      } else {
        await signIn(email, password);
        onLogin();
      }
    } catch (err) {
      alert(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex justify-center items-center">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-[420px]">

        <h1 className="text-3xl font-bold text-center">
          InterviewIQ
        </h1>

        <p className="text-center text-gray-500 mt-2">
          {isSignup ? "Create your account" : "Welcome back"}
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl p-3 mt-8"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-xl p-3 mt-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl"
        >
          {loading
            ? "Please wait..."
            : isSignup
            ? "Sign Up"
            : "Login"}
        </button>

        <p
          className="mt-6 text-center text-purple-600 cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "Create an account"}
        </p>

      </div>

    </div>
  );
}

export default Login;