'use client'
import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from 'next/link'
import { useAppContext } from '@/context/ContextProvider'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';

const SignIn = () => {
  const {signin, setSignIn, handleLoginSubmit} = useAppContext()
  const router = useRouter()

  const handleEmail = (e: any) => {
    setSignIn({...signin, email: e.target.value})
  }
  const handlePassword = (e: any) => {
    setSignIn({...signin, password: e.target.value})
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      if(signin.email.includes('@')){
        const response = await axios.post('/api/users/signin', signin)
        
        if(response.data.status === 400){
          toast.error(response.data.message)
        }

        if(response.data.status === 300){
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
      <div className='flex flex-col justify-center items-center w-96'>
        <div className="flex justify-center items-center rounded-full text-4xl p-2 bg-purple-700 text-white">
          <LockOutlinedIcon />
        </div>
        <p className='text-2xl text-black'>Sign In</p>
        <Box component='form' onSubmit={handleSubmit} className='flex flex-col mt-3 w-full'>
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
            label="Remember me"
            id='checkbox'
          />
          <Button
            id='button'
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='w-full'
            // onClick={handleLoginSubmit}
          >
            Sign In
          </Button>
          <Toaster 
            toastOptions={{
              className: 'text-white',
              success: {
                style: {
                  background: 'green',
                  color: 'whitesmoke'
                },
              },
              error: {
                style: {
                  background: 'red',
                  color: 'whitesmoke'
                },
              },
              duration: 10000
            }}
            // containerStyle={{
            //   position: 'relative',
            // }}
          />
          <div className='flex justify-between'>
            <p className='text-sm underline text-blue-500'><Link href='/reset-password'>Forgot Password</Link></p>
            <p className='text-sm underline text-blue-500'><Link href='/signup'>Don't have account? Sign up</Link></p>
          </div>
        </Box>
      </div>
    </div>
  )
}

export default SignIn