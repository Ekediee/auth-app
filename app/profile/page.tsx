'use client'
import React, {useEffect} from 'react'
import Button from '@mui/material/Button'
import {useRouter} from 'next/navigation'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'


const UserProfile = () => {
  const router = useRouter()

  const detail = async () => {
    const response = await axios.get('/api/users/detail')
    console.log(response.data)
    return response.data
  }

  const goSignIn = ()=>{
    router.push('/signin')
  }

  useEffect(() => {
    if(detail().status === 400){
      toast.success('Session expired! Login to continue.')
      goSignIn()
    }

  })

  const logout = async () => {
      try {
        await axios.get('/api/users/logout')
        toast.success('Logged out successfully')
        router.push('/signin')
      } catch(error: any){
        toast.error(error.message)
      }
  }

  return (
    <div className='min-h-screen'>
        <div className='flex justify-center items-center p-4 text-black'>User Profile</div>
        <div className='flex justify-center items-center'>
          <Button
            onClick={logout}
            id='button'
            type='submit'
            variant='contained'
            className='w-28'
          >
            Logout
          </Button>
        </div>
    </div>
  )
}

export default UserProfile