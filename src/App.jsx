import React, { useState } from 'react';
import Signup from './Auth/Signup'; // Modal
import Login from './Auth/Login';   // Modal
import Header from './Components/Header';
import CustomRoutes from './routes/CustomRoutes';

const App = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // ✅ Optional: ensure only one modal shows at a time
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

      {/* Signup Modal */}
      {isSignupOpen && <Signup setIsSignupOpen={setIsSignupOpen} />}

      {/* Login Modal */}
      {isLoginOpen && <Login setIsLoginOpen={setIsLoginOpen} />}
    </div>
  );
};

export default App;
