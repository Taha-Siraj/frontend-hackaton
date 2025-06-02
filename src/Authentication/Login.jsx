import React, { useContext, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GlobalContext } from '../Context/Context';
import { Link } from 'react-router-dom';
const Login = () => {


 const {state , diapatch} = useContext(GlobalContext);
 const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

  const auth = getAuth();
  const handdleForm = (e) => {
    const {name , value} = e.target;
    setFormData((prev) => ({
       ...prev,
       [name]: value 
    }));
 }
 const admin ={
  email: "admin@gmail.com",
  password: "admin123"
 }
  const loginUser = (e) => {
    e.preventDefault()
    if(!formData.email || !formData.password){
      console.log("All field Reuried");
      return;
    }
    if(formData.email == admin.email || formData.password  == admin.password){
    signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
    const user = userCredential.user;
    dispatch({isAdmin: "ADMIN_LOGIN" , payload: user})
    console.log(user, "Admin Login")
  })
   .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error, "error")
  });
    }
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
        className='border border-blue-400 rounded-md px-2 py-3 focus:outline-red-400'
        onChange={handdleForm}
/>
        <input 
        type="password"
        name='password'
        placeholder='password'
        onChange={handdleForm}
/>
<p>you dont have an Account <Link to="/signup"> Signup </Link> </p>
<button>Login</button>

    </form>
    </div>
  )
}

export default Login
