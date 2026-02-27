import { Link, NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('classicStaysUser') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('classicStaysUser');
    navigate('/login');
  };

  const dashboardMap = {
    admin: '/admin',
    host: '/host',
    tourist: '/tourist',
    guide: '/guide'
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        Classic Stays
      </Link>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/search">Homestays</NavLink>
        {user && dashboardMap[user.role] && <NavLink to={dashboardMap[user.role]}>Dashboard</NavLink>}
      </nav>
      <div className="auth-actions">
        {user ? (
          <>
            <span className="user-chip">{user.name} ({user.role})</span>
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline" to="/login">
              Login
            </Link>
            <Link className="btn btn-solid" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;