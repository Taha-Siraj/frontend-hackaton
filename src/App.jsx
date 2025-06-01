import React from 'react';
import { initializeApp } from "firebase/app";
import CustomRoutes from './Routes/CustomRoutes';
import Signup from './Authentication/Signup';
import Login from "./Authentication/Login";
const App = () => {

  const firebaseConfig = {
  apiKey: "AIzaSyBrFJDzzi732TgegwWHw8RloeIT74FBmhY",
  authDomain: "frontend-hackaton-project.firebaseapp.com",
  projectId: "frontend-hackaton-project",
  storageBucket: "frontend-hackaton-project.firebasestorage.app",
  messagingSenderId: "619352439548",
  appId: "1:619352439548:web:55ff17dc30e1f1454bf579"
  };
 const app = initializeApp(firebaseConfig);

  return (
    <div>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur nam soluta perferendis quidem, nihil quisquam quo rem labore enim cupiditate. Quisquam blanditiis perspiciatis magnam odit, reiciendis deleniti vel fuga aperiam?</p>
      {/* <CustomRoutes/> */}
      <Login/>
      <Signup/>
    </div>
  )
}

export default App
