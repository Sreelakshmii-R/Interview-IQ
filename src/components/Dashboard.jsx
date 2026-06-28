import { useMemo } from "react";

function Card({ title, value, icon }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition">

      <div className="text-4xl mb-3">
        {icon}
      </div>

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-purple-600 mt-2">
        {value}
      </h2>

    </div>
  );
}

export default function Dashboard({ history = [] }) {
  const stats = useMemo(() => {
  if (!history || history.length === 0) {
    return {
      total: 0,
      average: 0,
      best: 0,
      role: "-"
    };
  }

  const validHistory = history.filter(i => i?.report);

  const scores = validHistory.map(
    i => i.report?.overallScore || 0
  );

  const best = scores.length ? Math.max(...scores) : 0;

  const bestInterview = validHistory.find(
    i => (i.report?.overallScore || 0) === best
  );

  return {
    total: validHistory.length,
    average: scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0,
    best,
    role: bestInterview?.role || "-"
  };
}, [history]);

  return (
  <>
    <h2 className="text-3xl font-bold mb-8">
      📊 Your Dashboard
    </h2>

    <div className="grid md:grid-cols-4 gap-6">

      <Card
        title="Interviews"
        value={stats.total}
        icon="🎤"
      />

      <Card
        title="Average"
        value={`${stats.average}/100`}
        icon="📈"
      />

      <Card
        title="Best Score"
        value={`${stats.best}/100`}
        icon="🏆"
      />

      <Card
        title="Best Role"
        value={stats.role}
        icon="💼"
      />

    </div>
  </>
);
}