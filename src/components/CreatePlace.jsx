import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const CreatePlace = () => {

  const {isLoggedIn, setIsLoggedIn,createCordX, setCreateCordX, createCordY, setCreateCordY,createCordZ, setCreateCordZ, createDesc, setCreateDesc, createServerLoc, setCreateServerLoc, createImg, setCreateImg, uploadPlaceDetails,createUploadProgress} = useGlobalContext()

  if(!isLoggedIn){
    return <h1 className='mt-10 ml-2 '>Please wait.. if it takes long then Please <Link to={`/login`} className='text-blue-700 underline'>Log in</Link> </h1>
  }
  else{
  return (
    <div className='flex items-center justify-center h-screen'>
      <form className='bg-white flex justify-center items-center px-2 flex-wrap min-h-[80vh] min-w-[80%] m-2 shadow-sm rounded-lg md:-my-3'>
        <div>
          <label>Enter Co-Ordinates : </label><br/>
            <input required type='number' placeholder='x' className='w-20 border-2 p-1 my-2 text-center rounded-md' onChange={(e)=>setCreateCordX(e.target.value)}/>
            <input required type='number' placeholder='y' className='w-20 border-2 p-1 mx-2 text-center rounded-md' onChange={(e)=>setCreateCordY(e.target.value)}/>
            <input required type='number' placeholder='z' className='w-20 border-2 p-1 my-2 text-center rounded-md' onChange={(e)=>setCreateCordZ(e.target.value)}/><br/>

          <label>Enter Description : </label><br/>
          <input required type='text' className='w-72 border-2 p-1 my-2 rounded-md' onChange={(e)=>setCreateDesc(e.target.value)}/><br/>
          <label>Server location : </label><br/>
          <input required type='text' className='w-72 border-2 p-1 my-2 rounded-md' onChange={(e)=>setCreateServerLoc(e.target.value)}/><br/>
          <label>Upload Imgae : </label><br/>
          <input required type='file' placeholder='Upload Image' accept='image/*' className='w-72 border-2 p-1 my-2 rounded-md' onChange={(e)=>setCreateImg(e.target.files[0])}/><br/><br/>
          {createUploadProgress !== undefined && <h1>{createUploadProgress}</h1>} 
        </div>

        <div className='w-full flex justify-center'>
          {
            createCordX !== undefined  && createCordY !== undefined && createCordZ !== undefined && createDesc !== undefined && createServerLoc !== undefined && createImg !== undefined ?
          <button type='submit' className='w-72 bg-green-500 font-bold text-white py-3 text-lg rounded-md' onClick={(e)=>uploadPlaceDetails(e)}>Upload Location</button> : 
          <button type='submit' className='w-72 bg-green-300 font-bold text-green-200 py-3 text-lg rounded-md' >Upload Location</button>
          }
        </div>
      </form>
    </div>
  )
}
}
export default CreatePlace