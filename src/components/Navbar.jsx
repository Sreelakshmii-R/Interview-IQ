function Navbar({ scrollToSection }) {
  return (
    <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">
        Interview<span className="text-purple-600">IQ</span>
      </h1>

      <button
        onClick={() => scrollToSection("roles")}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 transition"
      >
        Get Started
      </button>
    </nav>
  )
}

export default Navbar