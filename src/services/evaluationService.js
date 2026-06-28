const API = import.meta.env.VITE_API_URL;

export async function evaluateAnswer(payload) {
  const response = await fetch(`${API}/interview/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Evaluation failed");
  }

  return data;
}