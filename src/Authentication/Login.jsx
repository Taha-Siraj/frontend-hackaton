import React, { useContext } from 'react';
import { GlobalContext } from '../Context/Context';

const Login = () => {

   const { state, dispatch } = useContext(GlobalContext);


    const style = 'text-black  rounded-md outline-none py-2 px-5 '
  return (
    <div>
     <div className='bg-gray-700 h-screen text-xl font-mono text-white capitalize'>
        <h1 className='text-center text-3xl font-semibold'>Login Form</h1>
        <input type="email" className={style} placeholder='email' />
        <input type="password" className={style} placeholder='password' />
        <button className={`${style} bg-green-700 `}>Login</button>
     </div>
    </div>
  )
}

export default Login
