import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const roleOptions = [
  { value: 'tourist', label: 'For Tourists', hint: 'Search, book, and explore nearby attractions.' },
  { value: 'host', label: 'For Hosts', hint: 'Create and manage homestay listings and bookings.' },
  { value: 'guide', label: 'For Local Guides', hint: 'Share local tourism insights and recommendations.' },
  { value: 'admin', label: 'For Admins', hint: 'Moderate users, listings, and platform activity.' }
];

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tourist'
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const completeSignup = (user) => {
    localStorage.setItem('classicStaysUser', JSON.stringify(user));
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    completeSignup({ ...formData, authProvider: 'local' });
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const payload = jwtDecode(credentialResponse.credential);
    completeSignup({
      name: payload.name,
      email: payload.email,
      role: formData.role,
      authProvider: 'google'
    });
  };

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create your Classic Stays account</h2>
        <p>Sign up and choose your role to start collaborating on the platform.</p>

        <label>Full Name</label>
        <input name="name" required value={formData.name} onChange={handleChange} />

        <label>Email</label>
        <input name="email" type="email" required value={formData.email} onChange={handleChange} />

        <label>Password</label>
        <input name="password" type="password" required minLength={6} value={formData.password} onChange={handleChange} />

        <label>Select Role</label>
        <div className="role-grid">
          {roleOptions.map((role) => (
            <button
              key={role.value}
              type="button"
              className={`role-option ${formData.role === role.value ? 'active' : ''}`}
              onClick={() => setFormData((prev) => ({ ...prev, role: role.value }))}
            >
              <strong>{role.label}</strong>
              <span>{role.hint}</span>
            </button>
          ))}
        </div>

        <button className="btn btn-solid" type="submit">
          Sign Up
        </button>

        <div className="or-divider">or</div>
        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {}} useOneTap={false} />

        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </form>
    </section>
  );
}

export default Signup;
