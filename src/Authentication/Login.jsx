import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {

   const [formData, setFormData] = useState({
      email: "",
      password: "",
   }) 

  const auth = getAuth();

  const handdleForm = (e) => {
    const {name , value} = e.target;
    setFormData((prev) => ({
       ...prev,
       [name]: value 
    }))

 }

  const loginUser = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, formData.email, formData.password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user, "user login")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error, "error")
  });

  }
  return (
    <div>
        <form onSubmit={loginUser}>
        <input 
        type="email"
        name='email'
        placeholder='Email'
        onChange={handdleForm}
/>
        <input 
        type="password"
        name='password'
        placeholder='password'
        onChange={handdleForm}
/>
<button>Login</button>

    </form>
    </div>
  )
}

export default Login
