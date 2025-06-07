import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; 
import { GlobalContext } from '../Context/Context';

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [ userData , setUserData] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = getAuth();
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setUserData(user);
      } else {
        console.log("No user logged in");
      }
    });
    return () => unSubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); 
      dispatch({ type: "USER_LOGOUT" });
      navigate("/login");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className='font-poppins'>
      <h1 className='text-3xl font-bold text-center mt-10'>Welcome to the Home Page</h1>
      <p className='text-center mt-4'>This is a simple home page built with React.</p>
      <div className='flex gap-x-4 justify-center mt-6'>
        <button className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600'>
          <Link to="/signup">Signup</Link>
        </button>
        <button className='bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600'>
          <Link to="/login">Login</Link>
        </button>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          onClick={handleLogout}>
          LOGOUT
        </button>
      
      </div>
        <div className='flex justify-center items-center flex-col gap-y-4 py-7 '>
       <img src={userData.photoURL} className='rounded-full h-[60px] w-[60px] object-cover' alt=""   />
      <h1 className='text-xl'>{userData.displayName}</h1>
       <p>{userData.email}</p>
    </div>
    </div>
  );
};

export default Home;
