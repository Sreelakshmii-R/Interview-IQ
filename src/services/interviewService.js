const API = "http://localhost:5000/api";

export async function generateQuestions(profile, role) {
  const response = await fetch(`${API}/interview/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profile, role }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Interview generation failed");
  }

  return data;
}