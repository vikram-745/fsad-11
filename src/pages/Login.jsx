import { useMemo, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('tourist');
  const [name, setName] = useState('');
  const redirectPath = useMemo(() => location.state?.from?.pathname || '/', [location.state]);

  const proceed = (user) => {
    localStorage.setItem('classicStaysUser', JSON.stringify(user));
    const route = user.role === 'admin' ? '/admin' : user.role === 'host' ? '/host' : user.role === 'guide' ? '/guide' : '/tourist';
    navigate(redirectPath === '/login' ? route : redirectPath);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    proceed({
      name: name || email.split('@')[0],
      email,
      role,
      authProvider: 'local'
    });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const payload = jwtDecode(credentialResponse.credential);
    proceed({
      name: payload.name,
      email: payload.email,
      role,
      authProvider: 'google'
    });
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login to Classic Stays</h2>
        <p>Access your dashboard as Admin, Host, Tourist, or Local Guide.</p>

        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Optional for local login" />

        <label>Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />

        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="tourist">Tourist</option>
          <option value="host">Homestay Host</option>
          <option value="guide">Local Guide</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-solid" type="submit">
          Login
        </button>

        <div className="or-divider">or</div>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {}} useOneTap={false} />

        <small>
          New here? <Link to="/signup">Create account</Link>
        </small>
      </form>
    </section>
  );
}

export default Login;