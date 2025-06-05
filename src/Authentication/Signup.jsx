import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getFirestore } from 'firebase/firestore';

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const auth = getAuth();
  const db = getFirestore();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { userName, email, password } = formData;

    if (!userName || !email || !password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        userName,
        email: user.email,
        createdAt: serverTimestamp(),
        role: 'user',
      });

      setFormData({ userName: '', email: '', password: '' });
      navigate('/login');

    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already in use.');
      } else if (err.code === 'auth/weak-password') {
        setError('The password is too weak.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address.');
      } else {
        setError('Failed to create account. Please try again.');
      }
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create New Account</h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label htmlFor="userName" className="text-sm text-gray-600">User Name</label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-center text-red-600 bg-red-100 p-3 rounded-lg shadow">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition disabled:opacity-70"
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
