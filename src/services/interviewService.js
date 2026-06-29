const API = import.meta.env.VITE_API_URL;

export async function generateQuestions(profile, role) {
  const response = await fetch(`${API}/api/interview/generate`, {
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