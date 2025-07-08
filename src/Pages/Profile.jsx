import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {

    const [User , setUser] = useState([])

    const fetchUser = async() => {
        try {
            let res = await axios.get('http://localhost:5004/get-user');
            console.log(res.data.message);
            setUser(res.data.message)
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        fetchUser()
    },[])

    const deletedUser =  async  (id) => {
        try {
            let res = await axios.delete(`http://localhost:5004/deleted-user/${id}`);
            console.log(res.data)
            fetchUser()
        } catch (error) {
            console.log(res.error)
            
        }
    }

  return (
    <div className='bg-gray-500 h-screen py-20'> 
      <div className='flex justify-center items-center  gap-5 flex-wrap'>
        {User.map((eachUser) => (
            <div key={eachUser._id} className='bg-gray-400 flex-col rounded-md px-4 py-2 capitalize text-xl flex justify-center gap-y-2 items-center'> 
            <p>{eachUser.name}</p>
            <p>{eachUser.email}</p>
            <button onClick={() => deletedUser(eachUser._id)  } className='outline-none py-2 px-3 rounded-lg text-[#fff] bg-red-600 hover:bg-red-700 text-sm font-semibold ' >Delelted User</button>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
