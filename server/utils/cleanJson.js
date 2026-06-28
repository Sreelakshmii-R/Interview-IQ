const cleanJson = (text) => {
  try {
    // Convert to string
    let cleaned = String(text);

    // Remove markdown fences
    cleaned = cleaned.replace(/```json/gi, "");
    cleaned = cleaned.replace(/```/g, "");

    // Extract only the JSON object
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("No valid JSON object found.");
    }

    cleaned = cleaned.substring(start, end + 1);

    // Remove invalid control characters
    cleaned = cleaned
  .replace(/\r/g, " ")
  .replace(/\n/g, " ")
  .replace(/\t/g, " ");

    // Collapse multiple spaces
    cleaned = cleaned.replace(/\s+/g, " ");

    return JSON.parse(cleaned);

  } catch (err) {
    console.error("========== INVALID AI RESPONSE ==========");
    console.error(text);
    console.error("========================================");
    throw err;
  }
};

export default cleanJson;