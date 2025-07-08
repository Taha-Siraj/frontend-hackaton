import axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import './style.css'
import { IoIosOpen } from 'react-icons/io';
const Signup = () => {
    const [formData , setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [Isshow , setIshow] = useState(false);
  const handleChange = (e) => {
    const {name , value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name , email , password} = formData;
    if(!name || !email || !password ){
      toast.warning("All field Requried")
      return
    }
    try {
      let res = await axios.post("http://localhost:5004/signup",{
        name, 
        email,
        password
      }) 
      toast.success("successfully User Created");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='bg-gray-600 h-screen'>
      <Toaster richColors position='top-center'  />
            <button className='px-4 py-2 rounded-md bg-green-700 text-xl active:scale-95 border' onClick={() => setIshow(!Isshow)} >{Isshow? "Close": "open" }</button>
    <div className='flex justify-center w-full items-center fixed h-screen flex-col gap-2' >

    {Isshow ?
     <form  onSubmit={handleSubmit} id='#signup' className='border-[0.5px] fixed  shadow-2xl bg-gray-900 border-[#dadada6c]  rounded-lg  flex flex-col justify-center w-[300px] px-4 items-center gap-y-3 py-10 capitalize'>
      <input type="text"
      name='name'
      onChange={handleChange} value={formData.name}
      placeholder='name' className='py-3  px-4  w-full outline-none bg-gray-500 rounded-md  placeholder:capitalize' />    
      <input type="email"
      name='email'
      onChange={handleChange} value={formData.email}
      placeholder='email' className='py-3 px-4 border w-full outline-none bg-gray-500  rounded-md  placeholder:capitalize text-lg ' />    
      
      <input 
       name='password'
      onChange={handleChange} value={formData.password}
      type="text" placeholder='password' className='py-3 px-4 border w-full outline-none bg-gray-500 rounded-md  placeholder:capitalize text-lg ' />
      <p className='text-sm text-white'>Already have an account <Link className='underline text-gray-300' to={'/login'} >login</Link></p>     
      <button className='py-2 px-4 text-[#fff] w-full outline-none capitalize  text-xl font-semibold bg-gray-950 rounded-2xl  cursor-pointer m-2' >submit</button>
    </form>    
    :
     null
     }
    </div>
    </div>
  )
}

export default Signup
