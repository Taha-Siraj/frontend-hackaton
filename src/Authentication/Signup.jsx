import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification  } from "firebase/auth";
import { Link } from 'react-router-dom';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc} from "firebase/firestore";
const Signup = () => {
  
  const [formData , setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const auth = getAuth();
  const db = getFirestore();

 const handleChange = (e) => {
  const {name , value} = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value
  }))
  
 }

const handleSubmit = async( e) => {
  e.preventDefault();
  try{
  const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
    const user = userCredential.user;
     sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log("Verification email sent successfully");
  })
  .catch((error) => {
    console.error("Error sending verification email:", error);
  })
    updateProfile(auth.currentUser, {
       displayName: formData.userName,
       photoURL: "https://rb.gy/q2o66m"
      }).then(() => {
        console.log("Profile updated successfully");
      }).catch((error) => {
        console.log("Error updating profile:", error);
      });
     const role = user.email === "admin@gamil.com" ? "admin" : "user"
    await setDoc(doc(db, "users" , user.uid),{
       email: user.email,
      photoURL: "https://rb.gy/q2o66m",
      role: role,
      userName: formData.userName,  
      uid: user.uid,
      createdAt: new Date().toISOString()
    })
    setFormData({userName: '', email: '', password: ''});
   
}
  catch(error) {
   const errorCode = error.code;

  if (errorCode === "auth/email-already-in-use") {
    alert("❌ Email already in use. Please use a different one.");
  } else if (errorCode === "auth/weak-password") {
    alert("❌ Password should be at least 6 characters.");
  } else if (errorCode === "auth/invalid-email") {
    alert("❌ Please enter a valid email address.");
  } else {
    alert("❌ Something went wrong. Try again.");
  }
  }
}


const style = 'border border-gray-400 outline-none rounded-md px-2 py-2 focus:border-blue-400 focus:border-2 w-full';

  return (
    <div className='h-screen flex justify-center  items-center'>
      <form className='font-poppins flex w-[350px] justify-center items-center flex-col  bg-gray-200 px-6 py-6 gap-y-6 rounded-lg ' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-extrabold text-blue-400'>Signup Form</h1>
        <input type="text"  value={formData.userName} className={style}  placeholder='UserName' onChange={handleChange}  name='userName' />
        <input type="email" value={formData.email} className={style} placeholder='email' onChange={handleChange}  name='email' />
        <input type="password" value={formData.password} className={style}  placeholder='password' onChange={handleChange}  name='password' />
        <p>already have an account <Link to="/login" className='underline text-gray-500'>login</Link> </p>
        <button className= 'active:scale-95 bg-green-400 py-2 px-4 rounded-md'>Signup</button>
      </form>
    </div>
  )
}

export default Signup
