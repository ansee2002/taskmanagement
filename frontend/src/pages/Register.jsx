import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      toast.success('Registration successful');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 shadow-md rounded w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4 text-center font-bold">Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} required className="mb-3 p-2 w-full border rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="mb-3 p-2 w-full border rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="mb-3 p-2 w-full border rounded" />
        <button type="submit" className="bg-green-500 w-full text-white py-2 rounded">Register</button>
        <p className="text-sm mt-3 text-center">Already have an account? <a href="/" className="text-blue-500">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
