import React, { useState } from 'react';
import Signup from './Auth/Signup'; 
import Login from './Auth/Login'; 
import Header from './Components/Header';
import CustomRoutes from './routes/CustomRoutes';

const App = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };
  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };
  
  return (
    <div>
      <Header setIsSignupOpen={openSignup} setIsLoginOpen={openLogin} />
      <CustomRoutes />
      {isSignupOpen && <Signup setIsSignupOpen={setIsSignupOpen} />}
      {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} />}
    </div>
  );
};

export default App;
