import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // ✅ logout ke liye signOut bhi import
import { GlobalContext } from '../Context/Context';

const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [ userData , setUserData] = useState("");
  // ✅ Global state access

  const navigate = useNavigate(); // ✅ Redirect ke liye

  // ✅ Firebase Auth Listener (Check user login state)
  useEffect(() => {
    const auth = getAuth();

    // ✅ Auth state change listener (automatically detects login/logout)
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // ✅ User logged in => dispatch global login
        dispatch({ type: "USER_LOGIN", payload: user });
        console.log("User is logged in:", user);
        setUserData(user); // ✅ Set user data in local state
      } else {
        // ❌ User is not logged in (optional handling)
        console.log("No user logged in");
      }
    });

    // ✅ Cleanup listener on component unmount
    return () => unSubscribe();
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // ✅ Firebase logout
      dispatch({ type: "USER_LOGOUT" }); // ✅ Dispatch logout to context
      navigate("/login"); // ✅ Redirect to login
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
          onClick={handleLogout}
        >
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
