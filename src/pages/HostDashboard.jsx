import { useEffect, useState } from 'react';
import { api } from '../services/api';

function HostDashboard() {
  const user = JSON.parse(localStorage.getItem('classicStaysUser') || 'null');
  const [myListings, setMyListings] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    price: '',
    image: ''
  });

  const loadMyListings = async () => {
    if (!user?.email) return;
    const listings = await api.getHostHomestays(user.email);
    setMyListings(listings);
  };

  useEffect(() => {
    loadMyListings();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.addHomestay(
      {
        ...formData,
        image:
          formData.image ||
          'https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&w=1200&q=80'
      },
      user?.email
    );
    setFormData({
      name: '',
      location: '',
      description: '',
      price: '',
      image: ''
    });
    loadMyListings();
  };

  return (
    <section>
      <div className="section-head">
        <h2>Host Dashboard</h2>
        <p>Welcome {user?.name}. Manage your homestays and booking requests.</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Active Bookings</h3>
          <p>6</p>
        </div>
        <div className="info-card">
          <h3>Pending Requests</h3>
          <p>2</p>
        </div>
      </div>

      <h3>Your Listings</h3>
      <form className="auth-card" onSubmit={handleSubmit}>
        <h3>Add New Homestay</h3>
        <input
          name="name"
          placeholder="Homestay Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          min="1"
          placeholder="Price per night"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button className="btn btn-solid" type="submit">
          Add Homestay
        </button>
      </form>
      <ul>
        {myListings.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}/night
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HostDashboard;
