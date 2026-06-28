export const evaluateAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Question and answer are required",
      });
    }

    const wordCount = answer.trim().split(/\s+/).length;

    let communication = 5;
    let technical = 5;
    let confidence = 5;

    if (wordCount > 40) communication += 2;
    if (wordCount > 80) communication += 1;

    const technicalWords = [
      "react",
      "node",
      "express",
      "api",
      "database",
      "javascript",
      "python",
      "sql",
      "algorithm",
      "project",
      "github",
      "mongodb",
      "html",
      "css"
    ];

    const matches = technicalWords.filter(word =>
      answer.toLowerCase().includes(word)
    ).length;

    technical += Math.min(matches, 5);

    if (
      answer.toLowerCase().includes("i built") ||
      answer.toLowerCase().includes("i developed") ||
      answer.toLowerCase().includes("i created")
    ) {
      confidence += 2;
    }

    communication = Math.min(communication, 10);
    technical = Math.min(technical, 10);
    confidence = Math.min(confidence, 10);

    return res.json({
      success: true,
      data: {
        communication,
        technical,
        confidence,
        strengths: [
          "Clear explanation",
          "Relevant answer",
          "Good communication"
        ],
        improvements: [
          "Use more technical terminology",
          "Add real project examples",
          "Be more concise"
        ]
      }
    });

  } catch (err) {

    console.error(err);

    let message = "Unable to analyze resume.";

    if (
        err.message.includes("429") ||
        err.message.includes("quota")
    ) {
        message =
            "AI service is currently busy. Please try again in a few minutes.";
    }

    if (
        err.message.includes("503")
    ) {
        message =
            "AI service is temporarily unavailable. Please try again shortly.";
    }

    res.status(err.status || 500).json({
    success: false,
    message
});

}
};