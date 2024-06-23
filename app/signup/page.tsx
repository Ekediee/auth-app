'use client'
import React, {useState} from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link'
import { useAppContext } from '@/context/ContextProvider'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const SignUp = () => {
  const router = useRouter()
  const {user, setUser } = useAppContext()

  const handleUserName = (e: any) => {
      setUser({...user, username: e.target.value})
  }
  const handleFirstName = (e: any) => {
      setUser({...user, first_name: e.target.value})
  }
  const handleLastName = (e: any) => {
      setUser({...user, last_name: e.target.value})
  }
  const handleEmail = (e: any) => {
      setUser({...user, email: e.target.value})
  }
  const handlePassword = (e: any) => {
      setUser({...user, password: e.target.value})
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      if(user.email.includes('@')){
        const response = await axios.post('/api/users/signup', user)
        
        if(response.data.status === 400){
          toast.error(response.data.message)
        }

        if(response.data.status === 500){
          toast.error(response.data.message)
        }

        if(response.data.success === true){
          toast.success(response.data.message)
          router.push('/profile')
        }

      }else{
        toast.error('Please enter a valid email address')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
    // localStorage.setItem('first_name', user.first_name)
  }

  return (
    <div className='flex min-h-screen justify-center items-center'>
      <Box component='form' onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-96'>
        <div className="flex justify-center items-center rounded-full text-4xl p-2 bg-purple-700 text-white">
          <LockOutlinedIcon />
        </div>
        <p className='text-2xl text-black'>Sign Up</p>
        <div className='flex flex-col mt-3 w-full'>
          
          <TextField
            margin="normal"
            required
            id="username"
            label="Username Name"
            name="username"
            // value={user.first_name}
            className='w-full'
            onChange={handleUserName}
          />
          <div className='flex justify-between'>

            <TextField
              margin="normal"
              required
              id="first"
              label="First Name"
              name="firs_name"
              // value={user.first_name}
              className='w-[184px]'
              onChange={handleFirstName}
            />
            <TextField
              margin="normal"
              required
              name="last_name"
              label="Last Name"
              id="last"
              className='w-[184px]'
              onChange={handleLastName}
            />
          </div>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleEmail}
          />
          <TextField
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className='w-full'
            onChange={handlePassword}
          />
          <FormControlLabel
            control={<Checkbox id='check' value="remember" color="primary" />}
            label="I want to receive updates"
            id='checkbox'
            className='text-black'
          />
          <Button
            id='button'
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='w-full'
            // onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Toaster 
            toastOptions={{
              className: 'text-white',
              error: {
                style: {
                  background: 'red',
                  color: 'whitesmoke'
                },
              },
              success: {
                style: {
                  background: 'green',
                  color: 'whitesmoke'
                },
              },
            }}
            // containerStyle={{
            //   position: 'relative',
            // }}
          />
          <div className='flex justify-end'>
            <p className='text-sm underline text-blue-500'><Link href='/signin'>Already have an account? Sign in</Link></p>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default SignUp