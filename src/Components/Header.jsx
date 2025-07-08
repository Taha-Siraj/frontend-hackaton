import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ setIsSignupOpen, setIsLoginOpen }) => {
  return (
    <div className="flex justify-center text-white">
      <header className="fixed z-[100] top-5 bg-gray-800/80 backdrop-blur-md shadow-lg px-8 py-2 rounded-2xl flex justify-center items-center gap-x-10 text-xl h-[50px] w-[400px]">
        <Link to="/" className="hover:text-green-400 transition">Home</Link>
        <button onClick={setIsLoginOpen} className="hover:text-green-400 transition">
          Login
        </button>
        <button onClick={setIsSignupOpen} className="hover:text-green-400 transition">
          Signup
        </button>
      </header>
    </div>
  );
};

export default Header;
