import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebaseconfig'
import { doc,getDoc,updateDoc, arrayUnion, arrayRemove  } from 'firebase/firestore'
import { BsBookmarkHeart, BsBookmarkHeartFill } from 'react-icons/bs'
import { async } from '@firebase/util'
import { useGlobalContext } from '../context'



const HomePlaceCard = ({place_id, user_id}) => {

    const [homeCardImgURL, setHomeCardImgURL] = useState()
    const [homeCardTitle, setHomeCardTitle] = useState()
    const [homeCardServer, setHomeCardServer] = useState()
    const [homeCardCoordsX, setHomeCardCoordsX] = useState()
    const [homeCardCoordsY, setHomeCardCoordsY] = useState()
    const [homeCardCoordsZ, setHomeCardCoordsZ] = useState()
    const [homeCardSavedBy, setHomeCardSavedBy] = useState([])
    const [homeCardSaved, setHomeCardSaved] = useState(false)
    

    useEffect(()=>{
        const getPlaceInfo = async (place_id) => {
    
            const docRef = doc(db, "placesInfo", `${place_id}`);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                setHomeCardImgURL(docSnap.data().imageURL)
                setHomeCardTitle(docSnap.data().description)
                setHomeCardServer(docSnap.data().serverLocation)
                setHomeCardCoordsX(docSnap.data().coords.x)
                setHomeCardCoordsY(docSnap.data().coords.y)
                setHomeCardCoordsZ(docSnap.data().coords.z)
                setHomeCardSavedBy(docSnap.data().savedBy)
                setHomeCardSaved(docSnap.data().savedBy.includes(user_id))
                
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            }

            getPlaceInfo(place_id)
        },[homeCardSaved])

    const handleSave = async (e) =>{
        e.preventDefault()
        console.log('clicked')

        if(homeCardSavedBy?.includes(user_id)){

            console.log('in includes')
            const userDocRef = doc(db, "userInfo", user_id);
            await updateDoc(userDocRef, {
                places_saved: arrayRemove(`placesInfo/${place_id}`)
                });

            const placeDocRef = doc(db, "placesInfo", place_id);
            await updateDoc(placeDocRef, {
                savedBy: arrayRemove(user_id)
                });
            
            setHomeCardSaved(false)
        }
        else{
            console.log('in not includes')
            const userDocRef = doc(db, "userInfo", user_id);
            await updateDoc(userDocRef, {
                places_saved: arrayUnion(`placesInfo/${place_id}`)
                });

            const placeDocRef = doc(db, "placesInfo", place_id);
            await updateDoc(placeDocRef, {
                savedBy: arrayUnion(user_id)
                });

            setHomeCardSaved(true)
        }
    }
        


  return (
      <>

      {/* Desktop view */}
    <div className='hidden md:flex bg-white justify-between w-[80%] shadow-md rounded-md m-2'>
        
        <div className='flex flex-wrap flex-col justify-between m-2'>
            <div>
                <h3 className='text-lg font-semibold'>{homeCardTitle}</h3>
                <p>{homeCardServer}</p>
                <div className='mt-2'>
                    <h2 className='inline-block py-3'>X : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{homeCardCoordsX}</span></h2>
                    <h2 className='inline-block py-3'>&nbsp; y : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{homeCardCoordsY}</span></h2>
                    <h2 className='inline-block py-3'>&nbsp; Z : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{homeCardCoordsZ}</span></h2>
                </div>
            </div>

            <button onClick={(e)=>handleSave(e)} className='flex items-center justify-between w-[10rem] gap-2 px-4 py-2 rounded-lg text-white font-semibold bg-green-500'>
            {homeCardSaved ? `Saved` : `Save`}
            {homeCardSaved ? <BsBookmarkHeartFill/>  : <BsBookmarkHeart/>}
            </button>
        </div>



        <div className='w-[30%] m-2'>
            <img src={homeCardImgURL} className='rounded-md'/>
        </div>

    </div>

    {/* Mobile view */}
    <div className=' flex md:hidden flex-wrap bg-white justify-between shadow-md m-2 rounded-md'>
        
        <div className='w-[100%] m-2 flex justify-center'>
            <img src={homeCardImgURL} className='rounded-md'/>
        </div>
        <div className='flex flex-wrap flex-col justify-between m-2 w-full'>
            <div className='flex flex-wrap flex-col'>
                <h3 className='text-xl text-center font-semibold'>{homeCardTitle}</h3>
                <p className='mt-2'>{homeCardServer}</p>
                <div className='mt-2'>
                    <h2 className='inline-block py-3'>X : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{homeCardCoordsX}</span></h2>
                    <h2 className='inline-block py-3'>&nbsp; y : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{homeCardCoordsY}</span></h2>
                    <h2 className='inline-block py-3'>&nbsp; Z : <span className='bg-gray-100 px-3 py-2  rounded-md shadow-sm'>{homeCardCoordsZ}</span></h2>
                </div>
            </div>

            <div className='flex justify-center mt-4'>
                <button onClick={(e)=>handleSave(e)} className='flex items-center justify-center w-[50%] gap-2 px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-br bg-green-500'>
                {homeCardSaved ? `Saved`  : `Save`}
                {homeCardSaved ? <BsBookmarkHeartFill/>  : <BsBookmarkHeart/>}
                </button>
            </div>
        </div>




    </div>
    </>
  )
}

export default HomePlaceCard