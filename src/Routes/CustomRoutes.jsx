import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { GlobalContext } from '../Context/Context';
import Admin from '../Pages/Admin';
import User from '../Pages/User';

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
    
    </>
  )
}

export default CustomRoutes
