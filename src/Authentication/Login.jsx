import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
  

  const [formData , setFormData] = useState({
    email: "",
    password: ""
  })
  const auth = getAuth();
  const navigate = useNavigate()
  

  const handleChange = (e) => {
    const {name , value} = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value
  }))
  }
  const handleSubmit =  (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("User logged in successfully:", user);
    setFormData({email: "", password: ""});
    navigate("/")
  })
  .catch((error) => {
    console.error("Error logging in:", error);
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }
  const style = 'border border-gray-400 outline-none rounded-md px-2 py-2 focus:border-blue-400 focus:border-2 w-full';

  return (
    <div>

       <div className='h-screen flex justify-center  items-center'>
      <form className='font-poppins flex w-[350px] justify-center items-center flex-col  bg-gray-200 px-6 py-6 gap-y-6 rounded-lg ' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-extrabold text-blue-400'>Login Form</h1>
        <input type="email" value={formData.email}  className={style} placeholder='email' onChange={handleChange}  name='email' />
        <input type="password" value={formData.password} className={style}  placeholder='password' onChange={handleChange}  name='password' />
        <p>if You don`t have an account<Link to="/signup" className='underline text-gray-500'>Signup</Link> </p>
        <button className= 'active:scale-95 bg-green-400 py-2 px-4 rounded-md'>LOGIN</button>
      </form>
    </div>
    </div>
  )
}

export default Login
