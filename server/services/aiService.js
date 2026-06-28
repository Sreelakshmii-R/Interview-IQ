/* global process */
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

// Create Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Default model
const MODEL = process.env.AI_MODEL || "llama-3.3-70b-versatile";

/**
 * System prompt for interview behavior
 */
const SYSTEM_PROMPT = `
You are a professional technical interviewer conducting a real job interview.

RULES:
- Ask questions in a conversational spoken interview style
- Do NOT format like exam questions or assignments
- Do NOT ask "Design a system..." in academic wording
- Instead ask how the candidate would approach or implement something
- Keep questions realistic, practical, and job-focused
- Adapt difficulty based on experience level

GOOD STYLE:
- "How would you..."
- "Can you explain your approach to..."
- "What would you do if..."
- "Tell me about how you built..."

BAD STYLE (NEVER USE):
- "Design a system..."
- "Explain the architecture of..."
- "Write a program to..."
- textbook/theory questions

You are interviewing for a software engineering role.
`;

/**
 * Main AI function with retry logic
 */
export async function generateWithRetry(prompt) {
  const retries = 3;

  for (let i = 0; i < retries; i++) {
    try {
      const completion = await groq.chat.completions.create({
        model: MODEL,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      return completion.choices[0].message.content;
    } catch (err) {
      console.error("Groq Error:", err?.response?.data || err);

      if (i < retries - 1) {
        console.log(`Retrying Groq request... (${i + 1})`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        continue;
      }

      throw new Error("AI service failed after multiple retries", {
        cause: err,
      });
    }
  }
}