import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';

const Signup = () => {
  
  const [formData , setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const auth = getAuth();

 const handleChange = (e) => {
  const {name , value} = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value
  }))

 }

const handleSubmit = ( e) => {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, formData.email, formData.password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("user", user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error", error)
  });
}

const style = 'border border-gray-400 outline-none rounded-md px-2 py-2 focus:border-blue-400 focus:border-2 w-full';

  return (
    <div className='h-screen flex justify-center  items-center'>
      <form className='font-poppins flex w-[350px] justify-center items-center flex-col  bg-gray-200 px-6 py-6 gap-y-6 rounded-lg ' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-extrabold text-blue-400'>Signup Form</h1>
        <input type="text"  className={style}  placeholder='UserName' onChange={handleChange}  name='userName' />
        <input type="email"  className={style} placeholder='email' onChange={handleChange}  name='email' />
        <input type="password" className={style}  placeholder='password' onChange={handleChange}  name='password' />
        <p>already have an account <Link to="/login" className='underline text-gray-500'>login</Link> </p>
        <button className= 'active:scale-95 bg-green-400 py-2 px-4 rounded-md'>Signup</button>
      </form>
    </div>
  )
}

export default Signup
