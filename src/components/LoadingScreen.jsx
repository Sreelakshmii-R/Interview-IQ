function LoadingScreen({ message, progress }) {
  return (
    <div className="min-h-screen bg-[#F8F6F2] flex flex-col justify-center items-center">

      <div className="bg-white shadow-2xl rounded-3xl p-12 w-[650px] text-center">

        <div className="text-7xl animate-pulse">
          🤖
        </div>

        <h1 className="text-4xl font-bold mt-6">
          InterviewIQ AI
        </h1>

        <p className="text-gray-600 mt-3">
          {message}
        </p>

        {/* Progress Bar */}

        <div className="mt-10 w-full bg-gray-200 rounded-full h-4 overflow-hidden">

          <div
            className="bg-gradient-to-r from-purple-600 to-pink-500 h-4 transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="mt-2 text-sm text-gray-500">
          {progress}% Complete
        </p>

      </div>

    </div>
  );
}

export default LoadingScreen;