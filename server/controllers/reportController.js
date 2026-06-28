import { generateWithRetry } from "../services/aiService.js";
import cleanJson from "../utils/cleanJson.js";

export const generateReport = async (req, res) => {
  try {
    const { role, candidateProfile, interviewResults } = req.body;

    if (!candidateProfile || !interviewResults || interviewResults.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing interview data",
      });
    }

    const prompt = `
You are a Senior Google/FAANG Software Engineering Interviewer.

Evaluate the candidate for the role:

${role}

You have access to:

1. Candidate Resume Analysis
2. Complete Interview Questions
3. Candidate Answers

Return STRICT VALID JSON ONLY.

DO NOT use markdown.
DO NOT use \`\`\`.
DO NOT include explanations outside JSON.

Return EXACTLY this structure:

{
  "overallScore": 0,
  "recommendation": "",
  "summary": "",
  "strengths": [],
  "improvements": [],
  "communication": 0,
  "technical": 0,
  "problemSolving": 0,
  "confidence": 0,
  "questionReviews": [
    {
      "question": "",
      "answer": "",
      "score": 0,
      "feedback": "",
      "improvedAnswer": ""
    }
  ]
}

RULES:

- overallScore must be between 0 and 100.
- Communication/Technical/ProblemSolving/Confidence must be between 0 and 10.
- Summary must contain 2-3 detailed paragraphs (minimum 180 words).
- Strengths should contain at least 4 detailed points.
- Improvements should contain at least 4 detailed points.
- Review EVERY interview question individually.
- Use the candidate's actual answer for the "answer" field.
- Give constructive feedback for every answer.
- Write an improved model answer for every question.
- Score every answer between 0 and 10.
- Recommendation must be one of:
  - Strong Hire
  - Hire
  - Maybe
  - No Hire

Candidate Profile:

${JSON.stringify(candidateProfile, null, 2)}

Interview:

${JSON.stringify(interviewResults, null, 2)}
`;

    const groqResponse = await generateWithRetry(prompt);

    const report = cleanJson(groqResponse);

    console.log("========== RAW AI RESPONSE ==========");
console.log(groqResponse);

console.log("========== PARSED REPORT ==========");
console.log(JSON.stringify(report, null, 2));

    return res.json({
      success: true,
      report,
    });

  } catch (err) {

    console.error(err);

    let message = "Unable to generate report.";

    if (
      err.message.includes("429") ||
      err.message.toLowerCase().includes("quota")
    ) {
      message =
        "AI service is currently busy. Please try again in a few minutes.";
    }

    if (err.message.includes("503")) {
      message =
        "AI service is temporarily unavailable. Please try again shortly.";
    }

    res.status(err.status || 500).json({
    success: false,
    message
});
  }
};