import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Authentication/Login'
import Signup from '../Authentication/Signup'
import Home from '../Pages/Home'

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={ <Login/>} />
      <Route path='/signup' element={ <Signup/>} />
    </Routes>
  )
}

export default CustomRoutes
