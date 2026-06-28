export const buildReportPrompt = (role, profile, interviewResults) => `
You are an expert technical interviewer.

Candidate Profile:
${JSON.stringify(profile, null, 2)}

Target Role:
${role}

Interview Results:
${JSON.stringify(interviewResults, null, 2)}

Analyze the candidate's entire interview.

Return ONLY valid JSON.

{
  "overallScore": number,
  "communication": number,
  "technical": number,
  "confidence": number,
  "problemSolving": number,
  "strengths": [
    "...",
    "...",
    "..."
  ],
  "improvements": [
    "...",
    "...",
    "..."
  ],
  "recommendation": "Recommended | Maybe | Not Recommended",
  "summary": "Short paragraph summarizing the interview."
}
`;