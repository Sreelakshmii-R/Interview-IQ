export const evaluationPrompt = (question, answer) => `
You are an expert technical interviewer.

Evaluate the candidate's answer.

Question:
${question}

Answer:
${answer}

Return ONLY valid JSON.

{
  "communication": 8,
  "technical": 7,
  "confidence": 8,
  "strengths": [
    "Point 1",
    "Point 2"
  ],
  "improvements": [
    "Point 1",
    "Point 2"
  ]
}

Do not include markdown.
Do not include \`\`\`json.
`;