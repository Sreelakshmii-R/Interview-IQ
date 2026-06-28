export function generateQuestions(role) {
  const pool = {
    "Software Engineer": [
      "Explain a project you built.",
      "What is an API?",
      "Explain time complexity.",
      "What is system design?"
    ],

    "Frontend Developer": [
      "What is React?",
      "Explain useState and useEffect.",
      "What is virtual DOM?",
      "How does browser rendering work?"
    ],

    "Data Analyst": [
      "What is data cleaning?",
      "Explain SQL joins.",
      "How do you handle missing data?",
      "What is data visualization?"
    ]
  }

  const questions = pool[role] || [
    "Tell me about yourself.",
    "Why did you choose this field?"
  ]

  // random 4 questions
  return questions.sort(() => Math.random() - 0.5).slice(0, 4)
}