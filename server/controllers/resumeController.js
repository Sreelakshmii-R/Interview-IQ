import { generateWithRetry } from "../services/aiService.js";
import cleanJson from "../utils/cleanJson.js";



export const analyzeResume = async (req, res) => {
  try {
    const { resume, role } = req.body;

    if (!resume || !role) {
      return res.status(400).json({
        success: false,
        message: "Resume and role are required",
      });
    }

    const trimmedResume = resume.slice(0, 8000);

    
    const prompt = `
You are a senior FAANG interviewer.

You MUST generate a VERY DETAILED evaluation report.
Analyze this resume for role: ${role}

Resume:
${trimmedResume}

STRICT RULES:
- Each field MUST be 100–150 words minimum
- Do NOT write short or generic sentences
- You MUST include specific technical references (React, Node.js, MongoDB etc if present)
- You MUST explain WHY you gave each judgment
- No field can be less than 4–6 sentences

Return STRICT JSON ONLY:

{
  "overallSummary": "",
  "strengths": [],
  "weaknesses": [],
  "technicalSkillsAnalysis": "",
  "communicationSkillsAnalysis": "",
  "problemSolvingAnalysis": "",
  "projectAnalysis": "",
  "learningAbility": "",
  "improvementSuggestions": [],
  "finalVerdict": "",
  "scoreOutOf100": ""
}


`;

    const groqResponse = await generateWithRetry(prompt);

    if (!groqResponse) {
      throw new Error("Empty response from AI");
    }

    let profile;

    try {
      profile = cleanJson(groqResponse);
    } catch (error) {
      console.log("JSON PARSE FAILED:", groqResponse);

      throw new Error("AI returned invalid JSON", {
        cause: error,
      });
    }

    return res.json({
      success: true,
      data: profile,
    });

  } catch (err) {
    console.error("RESUME ANALYSIS ERROR:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Resume analysis failed",
    });
  }
};