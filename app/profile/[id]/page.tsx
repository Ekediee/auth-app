import React from 'react'

const ProfileDetail = ({params}: any) => {
  return (
    <div className='flex justify-center items-center'>Profile Detail: {params.id} </div>
  )
}

export default ProfileDetail