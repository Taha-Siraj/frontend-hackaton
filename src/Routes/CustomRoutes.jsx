import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { GlobalContext } from '../Context/Context';
import Admin from '../Pages/Admin';
import User from '../Pages/User';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import Home from '../Pages/Home';

const CustomRoutes = () => {
  const {state , dispach} = useContext(GlobalContext);
  if (state.isLogin) {
  if (state.isAdmin) {
    return <Admin />;
  } else {
    return <User />;
  }
}

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>} ></Route>
      <Route path='/login' element={<Login/>} ></Route>
      <Route path='/signup' element={<Signup/>} ></Route>
     </Routes>
    </>
  )
}

export default CustomRoutes
