function Hero({ scrollToSection }) {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">

      <div className="inline-block bg-white px-4 py-2 rounded-full shadow-sm mb-6">
        ✨ AI-Powered Interview Practice
      </div>

      <h1 className="text-6xl font-bold leading-tight">
        Ace Your Next
        <br />
        <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Interview with AI
        </span>
      </h1>

      <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto">
        Practice interviews, get feedback, and improve skills with AI.
      </p>

      <div className="mt-10 flex justify-center gap-4 flex-wrap">

        <button
          onClick={() => scrollToSection("roles")}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition"
        >
          Start Interview
        </button>

        <button
          onClick={() => scrollToSection("features")}
          className="bg-white px-8 py-4 rounded-2xl shadow-md hover:shadow-lg transition"
        >
          Learn More
        </button>

      </div>
    </section>
  )
}

export default Hero