import { useEffect, useState } from 'react';
import { api } from '../services/api';

function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem('classicStaysUser') || 'null');
  const [totalListings, setTotalListings] = useState(0);

  useEffect(() => {
    const loadListings = async () => {
      const data = await api.getHomestays();
      setTotalListings(data.length);
    };
    loadListings();
    window.addEventListener('classicStaysHomestaysUpdated', loadListings);
    return () => window.removeEventListener('classicStaysHomestaysUpdated', loadListings);
  }, []);

  return (
    <section>
      <div className="section-head">
        <h2>Admin Dashboard</h2>
        <p>Welcome {user?.name}. Manage users, content quality, and homestay listings.</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Total Listings</h3>
          <p>{totalListings}</p>
        </div>
        <div className="info-card">
          <h3>Pending Reports</h3>
          <p>3</p>
        </div>
        <div className="info-card">
          <h3>Active Hosts</h3>
          <p>14</p>
        </div>
        <div className="info-card">
          <h3>Guides Onboarded</h3>
          <p>9</p>
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;
