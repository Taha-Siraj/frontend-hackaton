import React, { useState } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

const SignupModal = ({ setIsSignupOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loader, setLoader] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      toast.warning('All fields are required');
      return;
    }

    try {
        setLoader(true)
        await axios.post('http://localhost:5004/signup', formData);
        toast.success('User Created Successfully');
        setLoader(false)
        setFormData({name : "" , email: "" , password: ""});
        setTimeout(() => setIsSignupOpen(false) , 1000)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center">
      <Toaster richColors position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl relative"
      >
        <button
          className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-black"
          onClick={() => setIsSignupOpen(false)}
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Signup</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          className="mb-3 w-full border rounded-lg px-4 py-2"
        />
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
          className="w-full bg-green-600 hover:bg-green-700 text-white flex justify-center font-bold py-2 px-4 rounded-lg"
        >
         {loader ? <div className='border-y-4 animate-spin duration-200 h-7 w-7 border-blue-600 rounded-full' > </div>  : "Signup"   }
        </button>
      </form>
    </div>
  );
};

export default SignupModal;
