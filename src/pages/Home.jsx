import { Link } from 'react-router-dom';

function Home() {
  return (
    <section>
      <div className="hero">
        <div>
          <h1>Discover Authentic Travel with Classic Stays</h1>
          <p>
            Connect with trusted hosts, explore handpicked homestays, and uncover nearby attractions guided by local
            experts.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-solid" to="/search">
              Explore Homestays
            </Link>
            <Link className="btn btn-outline" to="/signup">
              Join Platform
            </Link>
          </div>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>For Tourists</h3>
          <p>Search, compare, and book unique stays. Get nearby sightseeing recommendations instantly.</p>
        </div>
        <div className="info-card">
          <h3>For Hosts</h3>
          <p>List your homestay, manage bookings, and communicate with guests from one dashboard.</p>
        </div>
        <div className="info-card">
          <h3>For Local Guides</h3>
          <p>Share local insights and tourism suggestions to make every trip memorable.</p>
        </div>
        <div className="info-card">
          <h3>For Admins</h3>
          <p>Oversee listings, users, and engagement to keep platform quality and trust high.</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
