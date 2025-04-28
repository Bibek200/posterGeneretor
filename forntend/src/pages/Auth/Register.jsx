import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (error) {
      alert(error.response.data.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} className="input" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="input" required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="input" required />
        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
}

export default Register;
