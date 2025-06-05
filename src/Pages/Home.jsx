import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='font-poppins'>
      <h1 className='text-3xl font-bold text-center mt-10'>Welcome to the Home Page</h1>
      <p className='text-center mt-4'>This is a simple home page built with React.</p>
      <div className='flex justify-center mt-6'>
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'><Link to="/signup">Signup</Link></button>
      </div>   
    </div>
  )
}

export default Home
