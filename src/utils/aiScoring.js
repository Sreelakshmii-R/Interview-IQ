export function evaluateAnswer(answer = "") {
  const text = answer.toLowerCase().trim()

  let score = 0
  let feedback = []

  if (!text || text.length < 10) {
    return {
      score: 0,
      feedback: "No proper answer detected. Please speak more clearly."
    }
  }

  // ---------------------------
  // 1. LENGTH QUALITY
  // ---------------------------
  if (text.length < 40) {
    score += 1
    feedback.push("Answer is too short")
  } else if (text.length < 120) {
    score += 3
    feedback.push("Moderate explanation")
  } else {
    score += 4
    feedback.push("Good detailed explanation")
  }

  // ---------------------------
  // 2. STRUCTURE (VERY IMPORTANT)
  // ---------------------------
  const hasStructure =
    text.includes("first") ||
    text.includes("second") ||
    text.includes("then") ||
    text.includes("because") ||
    text.includes("for example")

  if (hasStructure) {
    score += 3
    feedback.push("Good structured answer")
  }

  // ---------------------------
  // 3. CONFIDENCE LEVEL
  // ---------------------------
  const unsureWords = ["maybe", "i think", "not sure", "probably"]

  const confident = !unsureWords.some(word => text.includes(word))

  if (confident) {
    score += 2
  } else {
    score -= 1
    feedback.push("Try to sound more confident")
  }

  // ---------------------------
  // 4. TECH RELEVANCE
  // ---------------------------
  const techWords = [
    "system", "api", "database", "react",
    "algorithm", "frontend", "backend", "javascript"
  ]

  let techCount = 0
  techWords.forEach(word => {
    if (text.includes(word)) techCount++
  })

  score += techCount

  if (techCount > 0) {
    feedback.push("Good technical relevance")
  } else {
    feedback.push("Try adding technical terms or examples")
  }

  // ---------------------------
  // FINAL NORMALIZATION
  // ---------------------------
  if (score > 10) score = 10
  if (score < 0) score = 0

  return {
    score,
    feedback: feedback.join(". ")
  }
}