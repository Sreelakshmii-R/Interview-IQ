function InterviewReplay({ report, onBack }) {
  const reviews = report?.questionReviews || [];

  return (
    <div className="min-h-screen bg-[#F8F6F2] py-10 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10">
          🎥 Interview Replay
        </h1>

        {reviews.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="font-bold text-xl mb-4">
              Question {index + 1}
            </h2>

            <p className="mb-5">
              <strong>Question:</strong>
              <br />
              {item.question}
            </p>

            <p className="mb-5">
              <strong>Your Answer:</strong>
              <br />
              {item.answer}
            </p>

            <p className="mb-5">
              <strong>AI Feedback:</strong>
              <br />
              {item.feedback}
            </p>

            <p className="mb-5">
              <strong>Improved Answer:</strong>
              <br />
              {item.improvedAnswer}
            </p>

            <div className="text-right">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
                Score: {item.score}/10
              </span>
            </div>
          </div>
        ))}

        <div className="text-center">
          <button
            onClick={onBack}
            className="bg-purple-600 text-white px-8 py-3 rounded-xl"
          >
            Back to Report
          </button>
        </div>

      </div>
    </div>
  );
}

export default InterviewReplay;