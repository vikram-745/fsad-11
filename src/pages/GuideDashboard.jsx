import { guideTips } from '../services/api';

function GuideDashboard() {
  const user = JSON.parse(localStorage.getItem('classicStaysUser') || 'null');

  return (
    <section>
      <div className="section-head">
        <h2>Local Guide Dashboard</h2>
        <p>Welcome {user?.name}. Share local tourism insights with travelers.</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Published Tips</h3>
          <p>{guideTips.length}</p>
        </div>
        <div className="info-card">
          <h3>Tourist Queries</h3>
          <p>7</p>
        </div>
      </div>

      <h3>Top Local Insights</h3>
      <ul>
        {guideTips.map((tip) => (
          <li key={tip.title}>
            <strong>{tip.title}</strong> - {tip.note}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default GuideDashboard;