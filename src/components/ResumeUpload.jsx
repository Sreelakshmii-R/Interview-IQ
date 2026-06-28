function ResumeUpload() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Upload Your Resume
        </h2>

        <div className="border-2 border-dashed p-10 rounded-2xl">
          <p>Drag & Drop Resume</p>
          <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-xl">
            Choose File
          </button>
        </div>
      </div>
    </section>
  )
}

export default ResumeUpload