import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { GlobalContext } from '../Context/Context';


const Home = () => {
const {state , dispatch} = useContext(GlobalContext);
  useEffect(() => {
    const auth = getAuth();
    const unSubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
   console.log("user hai kia ", user)
   dispatch({type: "USER_LOGIN" , payload: user})   
  } 
  else {

  }
});
return  () => unSubscribe();
  },[])
  return (
    <div className='font-poppins'>
      <h1 className='text-3xl font-bold text-center mt-10'>Welcome to the Home Page</h1>
      <p className='text-center mt-4'>This is a simple home page built with React.</p>
      <div className='flex gap-x-4 justify-center mt-6'>
        <button className='bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600'><Link to="/signup">Signup</Link></button>
        <button className='bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600'><Link to="/login">Login</Link></button>
        <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600'>LOGOUT</button>

      </div>   
    </div>
  )
}

export default Home
