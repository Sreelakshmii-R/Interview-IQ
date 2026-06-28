import { useEffect, useState } from "react";
import {
  getInterviewHistory,
  deleteInterview,
  clearInterviewHistory,
} from "../services/interviewHistoryService";
import { getCurrentUser } from "../services/authService";

export default function InterviewHistory({
  onHistoryLoaded,
  onViewReport,
  onBack,
}) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const user = await getCurrentUser();

        if (!user) return;

        const interviews = await getInterviewHistory(user.id);

        setHistory(interviews);
        console.log("Interview history loaded:", interviews);

        onHistoryLoaded?.(interviews);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [onHistoryLoaded]);

  const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Delete this interview?"
  );

  if (!confirmed) return;

  try {
    await deleteInterview(id);

    setHistory((prev) =>
      prev.filter((item) => item.id !== id)
    );
  } catch (err) {
    console.error(err);
    alert("Failed to delete interview.");
  }
};

const handleClearAll = async () => {
  const user = await getCurrentUser();

  if (!user) return;

  const confirmed = window.confirm(
    "Delete ALL interview history?"
  );

  if (!confirmed) return;

  try {
    await clearInterviewHistory(user.id);

    setHistory([]);
  } catch (err) {
    console.error(err);
    alert("Failed to clear history.");
  }
};

  if (loading) {
    return (
      <p className="text-center text-gray-500">
        Loading interview history...
      </p>
    );
  }

  
  return (
    <div className="max-w-4xl mx-auto mt-8">

      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-100 transition"
      >
        ← Back to Home
      </button>

      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Interview History
        </h2>

        <button
          onClick={handleClearAll}
          className="rounded-lg bg-red-500 px-4 py-2 text-white shadow hover:bg-red-600 transition"
        >
          🗑️ Clear All
        </button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-5"
          >
            <h3 className="text-xl font-semibold">
              {item.role}
            </h3>

            <p className="text-gray-600 text-sm">
              {new Date(item.created_at).toLocaleDateString()}
            </p>

            <p className="mt-2 font-bold text-blue-600">
              {item.report?.overallScore}/100
            </p>

            <p className="mt-1 text-green-600">
              {item.report?.recommendation}
            </p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => onViewReport(item.report)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
              >
                View Report
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="rounded-lg border border-red-500 px-4 py-2 text-red-500 hover:bg-red-50 transition"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}