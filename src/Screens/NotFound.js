import React from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='flex-cols gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6'>
      <img className='w-full h-96  object-contain' src='/Images/head.jpg' alt='notfound' />
      <h1 className='lg:text-4xl font-bold'>Page Not Found</h1>
      <p className='font-medium text-border leading-6'>
        The page you are looking for might have been removed had its name changed or is temporarily unavailable.
      </p>
      <Link to="/" className='bg-subMain transitions flex-rows gap-4 text-white font-medium py-3 hover:text-main px-4 rounded-md'>
        <BiHomeAlt /> Back Home
      </Link>
    </div>
  )
}

export default NotFound