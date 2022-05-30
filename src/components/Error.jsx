import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Error = () => {
    const{errorMsg} = useGlobalContext()
    console.log('error msg:',errorMsg.message)


  return (
      <div className='flex justify-center'>
        <div className='bg-white mt-14 w-[90%]  h-[200px] p-2  rounded-md'>
            <h1 className='text-3xl'>
                {errorMsg.message}
            </h1>
            <h2>Please <Link to={`/login`} className='text-blue-700 underline'>Log in</Link> or <Link to={`/login`} className='text-blue-700 underline'>Sign Up</Link> again</h2>
        </div>
      </div>
  )
}

export default Error