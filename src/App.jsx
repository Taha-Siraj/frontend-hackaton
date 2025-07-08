import React from 'react'
import Signup from './Auth/Signup'
import Login from './Auth/Login'
import Header from './Components/Header'
import CustomRoutes from './routes/CustomRoutes'

const App = () => {
  return (
    <div>
      <Header/>
      <CustomRoutes/>
    </div>
  )
}

export default App
