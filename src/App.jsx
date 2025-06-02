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
      <CustomRoutes/>
    </div>
  )
}

export default App
