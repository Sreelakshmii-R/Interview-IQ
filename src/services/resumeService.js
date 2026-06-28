const API = import.meta.env.VITE_API_URL;

export async function analyzeResume(resume, role) {
  const response = await fetch(`${API}/analyze-resume`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resume, role }),
  });

  const text = await response.text();

  let data ;

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(data.message || "Resume analysis failed");
  }
console.log("ENV:", import.meta.env.VITE_API_URL);
  return data;
}