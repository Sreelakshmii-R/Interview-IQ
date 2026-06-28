function RoleSelector({ selectedRole, setSelectedRole }) {
  const roles = [
    { name: "Software Engineer", icon: "💻" },
    { name: "Frontend Developer", icon: "🎨" },
    { name: "Data Analyst", icon: "📊" },
  ]

  return (
    <section id="roles" className="max-w-4xl mx-auto px-6 py-20">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

        <h2 className="text-3xl font-bold mb-6">
          Choose Your Role
        </h2>

        <p className="mb-8 text-gray-500">
          Selected: {selectedRole || "None"}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <div
              key={role.name}
              onClick={() => setSelectedRole(role.name)}
              className={`cursor-pointer p-6 rounded-2xl border transition shadow-sm hover:shadow-lg hover:scale-[1.02] ${
                selectedRole === role.name
                  ? "border-purple-500 bg-purple-50"
                  : "bg-white"
              }`}
            >
              <div className="text-3xl">{role.icon}</div>
              <p className="font-semibold mt-2">{role.name}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default RoleSelector