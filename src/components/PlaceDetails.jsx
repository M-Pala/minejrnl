import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import places_img from '../images/places_img.jpg'
import { db } from '../utils/firebaseconfig'
import { doc,getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'
import { useGlobalContext } from '../context'
import UserButton from './UserButton'
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs'

const PlaceDetails = () => {

  const {place_Id} = useParams()

  const {isLoggedIn} = useGlobalContext()

  const [imageURL, setImageURL] = useState()
  const [coordsX, setCoordsX] = useState()
  const [coordsY, setCoordsY] = useState()
  const [coordsZ, setCoordsZ] = useState()
  const [createdAt, setCreatedAt] = useState()
  const [createdBy, setCreatedBy] = useState()
  const [description, setDescription] = useState()
  const [serverLocation, setServerLocation] = useState()
  const [savedBy, setSavedBy] = useState([])
  const [homeCardSavedBy, setHomeCardSavedBy] = useState([])
  const [homeCardSaved, setHomeCardSaved] = useState(false)

  let create_date = String(new Date(createdAt?.seconds*1000))
  const user_id = JSON.parse(localStorage.getItem('userInfo')).user_id


  
  
  useEffect(()=>{
    const getPlaceInfo = async (place_Id) => {
      
      const docRef = doc(db, "placesInfo", `${place_Id}`);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setImageURL(docSnap.data().imageURL)
            setDescription(docSnap.data().description)
            setServerLocation(docSnap.data().serverLocation)
            setCreatedAt(docSnap.data().createdAt)
            setCreatedBy(docSnap.data().createdBy)
            setCoordsX(docSnap.data().coords.x)
            setCoordsY(docSnap.data().coords.y)
            setCoordsZ(docSnap.data().coords.z)
            setSavedBy(docSnap.data().savedBy)
            setHomeCardSavedBy(docSnap.data().savedBy)
            setHomeCardSaved(docSnap.data().savedBy.includes(user_id))

            
          } else {
            console.log("No such document!");
          }
        }
    
        getPlaceInfo(place_Id)
        
    },[homeCardSaved])

    // useEffect(()=>{
    // },[homeCardSaved])

    
    const handleSave = async (e) =>{
      e.preventDefault()
      console.log('clicked')
  
      if(homeCardSavedBy?.includes(user_id)){
          console.log('in includes')
          const userDocRef = doc(db, "userInfo", user_id);
          await updateDoc(userDocRef, {
              places_saved: arrayRemove(`placesInfo/${place_Id}`)
              });
  
          const placeDocRef = doc(db, "placesInfo", place_Id);
          await updateDoc(placeDocRef, {
              savedBy: arrayRemove(user_id)
              });
          
          setHomeCardSaved(false)
      }
      else{
          console.log('in not includes')
          const userDocRef = doc(db, "userInfo", user_id);
          await updateDoc(userDocRef, {
              places_saved: arrayUnion(`placesInfo/${place_Id}`)
              });
  
          const placeDocRef = doc(db, "placesInfo", place_Id);
          await updateDoc(placeDocRef, {
              savedBy: arrayUnion(user_id)
              });
  
          setHomeCardSaved(true)
      }
    }
    
    if(!isLoggedIn){
      return <h1 className='mt-10 ml-2 '>Please wait.. if it takes long then Please <Link to={`/login`} className='text-blue-700 underline'>Log in</Link> </h1>
    }
    else{
    return (
      <div className='flex justify-center'>
          
          {/* Mobile view */}
          <div className='flex  md:hidden justify-center flex-wrap bg-white w-[98%] m-3 rounded-md shadow-sm'>
            <div className='flex justify-center'>
                <img className='w-[100%] m-3 rounded-md' src={imageURL}/>
            </div>
            <div className='text-left w-full m-3'>
                <h1 className='font-bold text-3xl w-full text-center mb-2'>{description}</h1>
                <h3 className='font-semibold text-xl'>Server : {serverLocation}</h3>
                <h2 className='inline-block py-3'>X : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{coordsX}</span></h2>
                <h2 className='inline-block py-3'>&nbsp; y : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{coordsY}</span></h2>
                <h2 className='inline-block py-3'>&nbsp; Z : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{coordsZ}</span></h2>
                
                
                <h3 className=''><span className='font-semibold'> Created At</span> : {create_date}</h3>
                <h3 className='my-1'><span className='font-semibold'> Created by</span> :
                
                {createdBy && <UserButton user_id = {String(createdBy?.split('/')[1])}/>}

                </h3>
                <h3><span className='font-semibold'>Saves </span>: {savedBy && savedBy?.length}</h3>
                <h3  className='my-1'><span className='font-semibold'> Saved by</span> :
                 {savedBy && savedBy?.map((user_id)=>{
                   return <UserButton user_id={user_id}/>
                 })}

                 </h3>
                 <div className='flex justify-center mt-3'>
                  <button onClick={(e)=>handleSave(e)} className='flex items-center justify-between w-[60%] gap-2 px-4 py-1 rounded-lg text-white font-semibold bg-gradient-to-br from-green-400 to-green-500'>
                  {homeCardSaved ? `Saved` : `Save`}
                  {homeCardSaved ? <BsBookmarkHeartFill/>  : <BsBookmarkHeart/>}
                  </button>
                 </div>

            </div>
          </div>



          {/* Desktop view */}
          <div className='hidden md:flex justify-center flex-wrap bg-white w-[98%] m-3 rounded-md shadow-sm '>
            <div className='flex flex-wrap text-left w-full m-3 gap-2'>
                <img className='w-[50%] rounded-md' src={imageURL}/>
                <div className='flex flex-wrap flex-col justify-between ml-3 w-[45%]'>
                    <div>

                      <h1 className='font-bold text-3xl mb-2'>{description}</h1>
                      <h3 className='font-semibold text-xl'>Server : {serverLocation}</h3>

                      <div className='my-3 gap-3'>
                        <h2 className='inline py-3'>X : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{coordsX}</span></h2>
                        <h2 className='inline py-3'> Y : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{coordsY}</span></h2>
                        <h2 className='inline py-3'> Z : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{coordsZ}</span></h2>
                      </div>
                      
                      
                      <h3 className='my-1'><span className='font-semibold'> Created At</span> : {create_date}</h3>
                      <h3 className='my-1'><span className='font-semibold'> Created by</span> : 
                        {createdBy && <UserButton user_id = {String(createdBy?.split('/')[1])}/>}

                      </h3>
                      <h3><span className='font-semibold'>Saves </span>: {savedBy && savedBy?.length}</h3>
                      <h3  className='my-1'><span className='font-semibold'> Saved by</span> : 
                        {savedBy && savedBy?.map((user_id)=>{
                        return <UserButton user_id={user_id}/>
                      })}

                      </h3>
                    </div>

                  <div className=''>
                      <button onClick={(e)=>handleSave(e)} className='flex items-center justify-between w-[60%] gap-2 px-4 py-1 rounded-lg text-white font-semibold bg-gradient-to-br from-green-400 to-green-500'>
                        {homeCardSaved ? `Saved` : `Save`}
                        {homeCardSaved ? <BsBookmarkHeartFill/>  : <BsBookmarkHeart/>}
                      </button>
                  </div>
                </div>
                 
            </div>
          </div>
      </div>
    )
}
}
export default PlaceDetails