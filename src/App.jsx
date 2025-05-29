import React from 'react';
import { initializeApp } from "firebase/app";

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
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, ullam beatae ea perferendis ab doloribus at modi sequi similique consequatur eum harum? Laboriosam in consectetur praesentium expedita hic ut pariatur.</p>
    </div>
  )
}

export default App
