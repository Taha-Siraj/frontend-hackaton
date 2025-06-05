import React, { useContext, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GlobalContext } from '../Context/Context'; 
import { Link, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";

const Login = () => {
  const { state, dispatch } = useContext(GlobalContext); 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const auth = getAuth();
  const navigate = useNavigate();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const adminCredentials = {
    email: "admin@example.com", 
    password: "adminpassword123" 
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Check if the logged-in user is the hardcoded admin
      if (user.email === adminCredentials.email && formData.password === adminCredentials.password) {
        dispatch({ type: "ADMIN_LOGIN", payload: user });
        console.log(user, "Admin Login Successful");
        // navigate('/admin-dashboard'); // Example: Redirect admin to their dashboard
      } else {
        dispatch({ type: "USER_LOGIN", payload: user });
        console.log(user, "User Login Successful");
        // navigate('/dashboard'); // Example: Redirect regular user to their dashboard
      }
    } catch (err) {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.error("Login Error:", errorCode, errorMessage);
      if (errorCode === 'auth/user-not-found' || 
          errorCode === 'auth/wrong-password' || 
          errorCode === 'auth/invalid-credential') {
        setError("Invalid email or password.");
      } else if (errorCode === 'auth/too-many-requests') {
        setError("Access temporarily disabled due to too many failed login attempts. Please reset your password or try again later.");
      }
      else {
        setError("An error occurred during login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from("#loginform", {
      x: -300,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from("#boxes", {
      x: 300,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.5");
  }, []);

  return (
    <div className='login h-screen flex flex-col md:flex-row justify-center items-center gap-x-0 md:gap-x-[100px] lg:gap-x-[180px] px-6 md:px-10 py-10 bg-gray-900'> {/* Added a background color for better visibility */}
      <form 
        id='loginform' 
        className='bg-slate-800 bg-opacity-50 bg-clip-padding backdrop-filter backdrop-blur-lg shadow-xl px-8 py-10 h-auto md:h-auto w-full max-w-md text-white capitalize rounded-lg flex flex-col justify-center gap-y-6' 
        onSubmit={loginUser}
      >
        <h1 className='text-3xl md:text-4xl text-center font-mono font-extrabold capitalize'>Login Form</h1>
        
        <input
          type="email"
          name='email'
          value={formData.email}
          placeholder='Email'
          className='border w-full border-blue-400 rounded-md px-3 py-3 text-black outline-none focus:border-blue-600 placeholder-gray-500'
          onChange={handleForm}
          disabled={loading}
        />

        <input
          type="password"
          name='password'
          value={formData.password}
          placeholder='Password'
          className='border border-blue-400 rounded-md text-black px-3 py-3 outline-none w-full focus:border-blue-600 placeholder-gray-500'
          onChange={handleForm}
          disabled={loading}
        />

        {error && <p className='text-red-400 text-sm text-center normal-case'>{error}</p>} 

        <p className='text-[16px] md:text-[18px] text-center normal-case'>
          Don't have an account? <Link to="/signup" className='text-lg md:text-xl underline text-blue-300 hover:text-blue-100 font-mono'>Signup</Link>
        </p>
        <button 
          type='submit' 
          className='px-5 py-3 bg-[#043384] hover:bg-blue-700 rounded-md text-xl transition-colors duration-300 disabled:opacity-50 flex justify-center items-center'
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : 'Login'}
        </button>
      </form>

      <div id='boxes' className='hidden md:grid grid-cols-3 gap-4 mt-10 md:mt-0'>
        {[...Array(9)].map((_, i) => (
          <div key={i} className='box h-[80px] w-[80px] lg:h-[120px] lg:w-[120px] bg-gray-700 bg-opacity-50 rounded-lg shadow-md'></div>
        ))}
      </div>
    </div>
  );
}

export default Login;