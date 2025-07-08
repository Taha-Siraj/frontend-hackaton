import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import Home from '../Pages/Home'
import Profile from '../Pages/Profile'

const CustomRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/Signup' element={<Signup/>} />
      </Routes>
    </div>
  )
}

export default CustomRoutes
