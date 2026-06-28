import { generateWithRetry } from "../services/aiService.js";
import cleanJson from "../utils/cleanJson.js";

export const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, profile, sessionId } = req.body;

    if (!role || !profile) {
      return res.status(400).json({
        success: false,
        message: "Role and profile are required",
      });
    }

    console.log("SESSION ID:", sessionId);

    // 🔥 MAIN PROMPT (FIXED FOR VARIATION)
    const prompt = `
You are an expert FAANG interviewer.

This is a NEW interview session.
SESSION ID: ${sessionId}

You MUST generate completely UNIQUE interview questions every time.

Role: ${role}
Candidate Level: ${profile?.level || "junior"}

IMPORTANT RULES:
- Generate ONLY 2 questions.
- NEVER repeat question patterns from previous interviews
- Make every question different in structure and focus
- Simulate a real interviewer experience
- Avoid generic repeated questions like "What is React?"

You MUST mix these categories:
1. Coding / Problem Solving
2. Debugging Scenario
3. System Design (simple for juniors)
4. Behavioral Questions
5. Real-world Application
6. Optimization / Performance
7. API / Backend Concepts (if relevant)
8. Logic / Thinking Questions

Return ONLY valid JSON:

{
  "questions": [
    {
      "type": "technical | behavioral | problem-solving | system-design",
      "difficulty": "easy | medium | hard",
      "question": ""
    }
  ]
}

Generate 2 UNIQUE question.
Do not repeat formats.
`;

    // 🔥 AI CALL
    const response = await generateWithRetry(prompt);

    if (!response) {
      throw new Error("Empty response from AI");
    }

    console.log("RAW AI RESPONSE:", response);

    // 🔥 CLEAN JSON
    const questions = cleanJson(response);

    return res.json({
      success: true,
      data: questions,
    });

  } catch (err) {
    console.error("INTERVIEW ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Failed to generate interview questions",
    });
  }
};