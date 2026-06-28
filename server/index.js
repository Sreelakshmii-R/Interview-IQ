/* global process */

import express from "express"
import cors from "cors"
import axios from "axios"
import resumeRoutes from "./routes/resumeRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/evaluation", evaluationRoutes);
app.use("/api/report", reportRoutes);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

app.post("/evaluate-answer", async (req, res) => {
  try {
    const { question, answer } = req.body

    const prompt = `
You are an expert technical interviewer.

Evaluate this interview answer.

Question: ${question}

Answer: ${answer}

Return ONLY JSON in this format:
{
  "communication": number out of 10,
  "technical": number out of 10,
  "confidence": number out of 10,
  "strengths": ["..."],
  "improvements": ["..."],
  "feedback": "short summary"
}
`

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    )

    const text = response.data.candidates[0].content.parts[0].text

    const jsonStart = text.indexOf("{")
    const jsonEnd = text.lastIndexOf("}") + 1

    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd))

    res.json(parsed)

  } catch (err) {
    res.status(500).json({
      error: "Gemini evaluation failed",
      details: err.message
    })
  }
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})