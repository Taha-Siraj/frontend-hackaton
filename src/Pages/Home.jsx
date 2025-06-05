import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  
  const btn = "border borer-blue-400 bg-green-500 text-white px-4 py-2 rounded-md m-10"
  return (

    <div>
      <Link to="/login" className={btn}  >login</Link>
      <Link to="/Signup" className={btn} >Signup</Link>
    </div>
  )
}

export default Home
