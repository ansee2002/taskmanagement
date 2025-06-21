import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 shadow-md rounded w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 text-center font-bold">Login</h2>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="mb-3 p-2 w-full border rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="mb-3 p-2 w-full border rounded" />
        <button type="submit" className="bg-blue-500 w-full text-white py-2 rounded">Login</button>
        <p className="text-sm mt-3 text-center">Don't have an account? <a href="/register" className="text-blue-500">Register</a></p>
      </form>
    </div>
  );
};

export default Login;
