const API = import.meta.env.VITE_API_URL;

export async function generateReport(role, profile, interviewResults) {
  const response = await fetch(`${API}/api/report/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role,
      
      candidateProfile: profile,
  
      interviewResults,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.report;
}