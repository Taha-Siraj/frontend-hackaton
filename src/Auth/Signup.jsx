import axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
const Signup = () => {
    const [formData , setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const {name , value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    }

    useEffect(() => {
      const fetchuser = async () => {
        try {
          let  res = await axios.get('http://localhost:5004/get-user');
          console.log(res.data)
        } catch (error) {
          console.log(error)
        }
      }
      fetchuser()
    },[])
  const handleSubmit = async (e) => {
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
    <div>
      <Toaster richColors position='top-center'  />
    <div className='flex justify-center w-full capitalize items-center fixed h-screen ' >
      <div className='flex flex-col justify-center items-center gap-y-3 py-10 capitalize'>
      <input type="text"
      name='name'
      onChange={handleChange} value={formData.name}
      placeholder='name' className='py-2 px-4 border ' />    
      <input type="text"
      name='email'
      onChange={handleChange} value={formData.email}
      placeholder='email' className='py-2 px-4 border ' />    
      
      <input 
       name='password'
      onChange={handleChange} value={formData.password}
      type="text" placeholder='password' className='py-2 px-4 border ' />
      <p>Already have an account <Link to={'/login'} >login</Link></p>     
      <button onClick={handleSubmit} className='py-2 px-4 border rounded-lg bg-gray-500 cursor-pointer m-2' >submit</button>
    </div>
    </div>
    </div>
  )
}

export default Signup
