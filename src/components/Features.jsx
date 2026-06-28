function Features() {
  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Personalized Interviews",
      description:
        "InterviewIQ intelligently analyzes your uploaded resume and the job role you select to generate completely personalized interview questions. Instead of practicing with generic questions, every interview is uniquely tailored to your experience, projects, technical skills, and career goals, making your preparation much more realistic and effective.",
    },
    {
      icon: "🎤",
      title: "Real-Time Voice Interview Practice",
      description:
        "Practice exactly like a real interview by answering every question using your voice. Our speech recognition system converts your spoken responses into text, allowing you to improve fluency, communication, confidence, and verbal delivery while simulating an authentic interview environment.",
    },
    {
      icon: "📊",
      title: "Comprehensive AI Performance Analytics",
      description:
        "After every response, InterviewIQ provides detailed AI-driven feedback on communication skills, technical knowledge, confidence, problem-solving ability, and overall interview performance. It also highlights your strengths, identifies improvement areas, and tracks your progress across multiple interview sessions.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Why Choose{" "}
            <span className="text-purple-600">InterviewIQ?</span>
          </h2>

          <p className="mt-5 text-gray-600 text-lg max-w-3xl mx-auto">
            InterviewIQ combines Generative AI, resume analysis, speech
            recognition, and intelligent performance evaluation to recreate a
            realistic technical interview experience. Practice smarter, gain
            confidence, and receive personalized feedback that helps you improve
            with every interview.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-6">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-8">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;