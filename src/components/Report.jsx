

const ScoreBar = ({ label, value = 0 }) => {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{label}</span>
        <span>{value}/10</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-purple-600 to-pink-500 h-3 rounded-full"
          style={{ width: `${value * 10}%` }}
        />
      </div>
    </div>
  );
};



function Report({ report = {}, onBackHome , onViewReplay }) {

  console.log("REPORT RECEIVED:", report);

  if (!report) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading report...</p>
    </div>
  );
}
  // SAFE FALLBACKS (IMPORTANT)
const strengths = report.strengths || [];

const improvements = report.improvements || [];

const summary = report.summary || "No summary available";

const score = report.overallScore || 0;

const verdict = report.recommendation || "N/A";

const communication = report.communication || 5;

const technical = report.technical || 5;

const problemSolving = report.problemSolving || 5;

const confidence = report.confidence || 5;
  return (
    <div className="min-h-screen bg-[#F8F6F2] py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <h1 className="text-4xl font-bold">
            🎉 Interview Completed
          </h1>

          <p className="text-gray-500 mt-3">
            Your AI Interview Report
          </p>

          {/* SCORE */}
          <div className="mt-10 flex justify-center">
            <div className="w-44 h-44 rounded-full border-[12px] border-purple-600 flex items-center justify-center">
              <div>
                <div className="text-5xl font-bold">
                  {score}
                </div>
                <div className="text-gray-500">/100</div>
              </div>
            </div>
          </div>

          {/* VERDICT */}
          <div className="mt-8">
            <span className="px-6 py-3 rounded-full bg-green-100 text-green-700 font-semibold">
              {verdict}
            </span>
          </div>
        </div>

        {/* SKILL SCORES */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mt-8">
          <h2 className="text-2xl font-bold mb-8">
            Skill Evaluation
          </h2>

          <ScoreBar label="Communication" value={communication} />
          <ScoreBar label="Technical Skills" value={technical} />
          <ScoreBar label="Problem Solving" value={problemSolving} />
          <ScoreBar label="Confidence" value={confidence} />
        </div>

        {/* STRENGTHS */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            💪 Strengths
          </h2>

          {strengths.length > 0 ? (
            <ul className="space-y-3">
              {strengths.map((item, index) => (
                <li key={index} className="bg-green-50 p-4 rounded-xl">
                  ✅ {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No strengths available</p>
          )}
        </div>

        {/* IMPROVEMENTS */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            📈 Areas to Improve
          </h2>

          {improvements.length > 0 ? (
            <ul className="space-y-3">
              {improvements.map((item, index) => (
                <li key={index} className="bg-red-50 p-4 rounded-xl">
                  • {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No improvements available</p>
          )}
        </div>

        {/* SUMMARY */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mt-8">
          <h2 className="text-2xl font-bold mb-6">
            AI Summary
          </h2>

          <p className="text-gray-700 leading-8">
            {summary}
          </p>
        </div>

        {onViewReplay && (
          <button
            onClick={onViewReplay}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-6"
          >
            View Interview Replay
          </button>
        )}

        {/* BACK BUTTON */}
        {onBackHome && (
          <div className="text-center mt-10">
            <button
              onClick={onBackHome}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl"
            >
              Back Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Report;