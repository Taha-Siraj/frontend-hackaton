import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { IoIosOpen } from 'react-icons/io';
import './style.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [Isshow, setIshow] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      toast.warning('All fields are required');
      return;
    }
    try {
      await axios.post('http://localhost:5004/signup', {
        name,
        email,
        password,
      });
      toast.success('Successfully User Created');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-700 via-gray-800 to-black flex flex-col items-center justify-center p-4">
      <Toaster richColors position="top-center" />

      <button
        className="mb-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white text-lg rounded-xl shadow-md transition-all duration-200 active:scale-95"
        onClick={() => setIshow(!Isshow)}
      >
        {Isshow ? 'Close' : 'Open'} Signup
      </button>

      {Isshow && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl border border-gray-300 flex flex-col gap-4 animate__animated animate__fadeIn"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Create Account
          </h2>

          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Name"
            className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:capitalize"
          />

          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:capitalize"
          />

          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
            className="py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:capitalize"
          />

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 underline hover:text-green-800">
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="mt-2 py-3 px-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-200"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default Signup;
