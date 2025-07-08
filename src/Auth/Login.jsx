import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

const Login = ({ setIsLoginOpen }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.warning('All fields are required');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5004/login', formData);
      toast.success('Login successful!');
      console.log(res.data);
      setIsLoginOpen(false);
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="fixed inset-0 z-[500] bg-black/60 flex items-center justify-center">
      <Toaster className='z-[1000]' richColors position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl relative"
      >
        <button
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black"
          onClick={() => setIsLoginOpen(false)}
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="mb-3 w-full border rounded-lg px-4 py-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="mb-4 w-full border rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
