import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to="/login" >login</Link>
      <Link to="/Signup" >Signup</Link>
    </div>
  )
}

export default Home
