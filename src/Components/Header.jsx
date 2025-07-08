import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-center border-l-gray-950 text-white'>
     <header className='fixed z-50 flex justify-center items-center gap-x-10 text-xl rounded-2xl  h-[50px] w-[400px] '>
    <Link to={'/'} >Home</Link>    
    <Link to={'/login'} >Login</Link>    
    <Link to={'/signup'} > Signup</Link>    
    </header>
    </div>
  )
}

export default Header
