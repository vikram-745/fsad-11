import { Link } from 'react-router-dom';
import { recommendations } from '../services/api';

function TouristDashboard() {
  const user = JSON.parse(localStorage.getItem('classicStaysUser') || 'null');

  return (
    <section>
      <div className="section-head">
        <h2>Tourist Dashboard</h2>
        <p>Welcome {user?.name}. Track your stays and get personalized destination ideas.</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Upcoming Trips</h3>
          <p>2</p>
        </div>
        <div className="info-card">
          <h3>Saved Stays</h3>
          <p>5</p>
        </div>
      </div>

      <h3>Recommended for You</h3>
      <ul>
        {recommendations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <Link className="btn btn-solid" to="/search">
        Find More Homestays
      </Link>
    </section>
  );
}

export default TouristDashboard;