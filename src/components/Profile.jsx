import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getUserInfo } from '../utils/getUserInfo'
import { db } from '../utils/firebaseconfig'
import { doc, getDoc } from 'firebase/firestore'
import { useGlobalContext } from '../context'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import ProfilePlaceCard from './ProfilePlaceCard'

const Profile = () => {

  const {profileName, setProfileName,profileEmail, setProfileEmail,profilePass, setProfilePass, logout,isLoggedIn, setIsLoggedIn,docSnapState, setDocSnapState} = useGlobalContext()
  const {id} = useParams()


  useEffect(()=>{
    const getAllInfo = async () => {
      const docRef = doc(db, "userInfo", id);
      const docSnap = await getDoc(docRef);
      let userData = docSnap.data()
      userData = {...userData, user_id : id}
      console.log(userData);

      if(JSON.parse(localStorage.getItem('userInfo')) === null || JSON.parse(localStorage.getItem('userInfo')).user_id === id){
        localStorage.setItem('userInfo',JSON.stringify(userData))
      }

      setDocSnapState(docSnap)
      setProfileEmail(docSnap.data().user_email)
      setProfileName(docSnap.data().user_name)
      setProfilePass(docSnap.data().user_pass)
    }


    getAllInfo()

  },[])

  if(!isLoggedIn){
    return <h1 className='mt-10 ml-2 '>Please wait.. if it takes long then Please <Link to={`/login`} className='text-blue-700 underline'>Log in</Link> </h1>
  }
  else{
    return (
      <div className=' h-screen  bg-gradient-to-br from-slate-600 to-teal-900'>
        
      <div className='m-5 p-2 min-h-[20vh] rounded-lg bg-white shadow-md'>
  
          <h1 className='p-5 md:text-5xl text-4xl font-bold font-sans'> {profileName}</h1>
          <h2 className='mx-5 md:text-2xl text-xl'>email : {profileEmail}</h2>
         {(JSON.parse(localStorage.getItem('userInfo')).user_id === id) && <>
          <div className='my-5 flex justify-center'>
          <Link to={`/login`} className='md:hidden w-[90%] bg-gradient-to-br from-red-400 to to-red-500 text-red-900 font-bold shadow-md py-2 rounded-md flex justify-center items-center' onClick={()=>logout()}>Log out</Link>
          </div>
         </>
         }
      </div>
      {(JSON.parse(localStorage.getItem('userInfo')).user_id === id) &&
      <Link to={`/createPlace`}>
        <div className='mx-5 p-2 min-h-[2vh] rounded-lg text-center bg-gradient-to-br from-green-400 to to-green-500 shadow-md'>
          <p className='font-bold text-white'>Add Place</p>
        </div>
      </Link>
      }
  
  
        <div className='flex flex-wrap justify-between'>
          <div className='w-full h-fit md:w-[45%] m-5 p-2 min-h-[20vh] rounded-lg bg-slate-50'>
            <h1 className='font-semibold text-2xl mb-6'>Places Uploaded</h1>
            {docSnapState?.data().places_uploaded && docSnapState?.data().places_uploaded.map((place)=>{
              return (
                  <Link to={`/placeDetail/${place.split('/')[1]}`}>
                    <ProfilePlaceCard place_id = {place.split('/')[1]}/>
                  </Link>
              )
            })}
          </div>
          <div className='w-full h-fit md:w-[45%] m-5 p-2 min-h-[20vh] rounded-lg bg-slate-50'>
            <h1 className='font-semibold text-2xl mb-6'>Places saved</h1>
            {docSnapState?.data().places_saved && docSnapState?.data().places_saved.map((place)=>{
              return (
                  <Link to={`/placeDetail/${place.split('/')[1]}`}>
                    <ProfilePlaceCard place_id = {place.split('/')[1]}/>
                  </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile