import React, { useContext, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { GlobalContext } from '../Context/Context.jsx';
import { Link } from 'react-router-dom';

const Signup = () => {
 const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
 })    

 const {state , diapatch} = useContext(GlobalContext);

 const handdleForm = (e) => {
    const {name , value} = e.target;
    setFormData((prev) => ({
       ...prev,
       [name]: value 
    }))

 }
const auth = getAuth();
const handleSignup = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("user Created" , user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

    return (
    <div id='signup'>
    <form onSubmit={handleSignup}>
        <input 
        type="text"
        name='userName'
        placeholder='User Name'
        onChange={handdleForm}
/>
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
<p>Already have an Account <Link to="/login"> login </Link> </p>
<button>Signup</button>

    </form>
    </div>
  )
}

export default Signup
