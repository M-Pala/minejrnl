import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebaseconfig'
import { doc,getDoc } from 'firebase/firestore'
const ProfilePlaceCard = ({place_id}) => {


    const [profileCardImgURL, setProfileCardImgURL] = useState()
    const [profileCardTitle, setProfileCardTitle] = useState()
    const [profileCardServer, setProfileCardServer] = useState()

    useEffect(()=>{
        const getPlaceInfo = async (place_id) => {
    
            const docRef = doc(db, "placesInfo", `${place_id}`);
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                setProfileCardImgURL(docSnap.data().imageURL)
                setProfileCardTitle(docSnap.data().description)
                setProfileCardServer(docSnap.data().serverLocation)
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            }
            console.log(typeof place_id)
        
            getPlaceInfo(place_id)
        },[])

  return (
    <div className='bg-white flex justify-between items-center shadow-md my-2 rounded-md'>
        
        <div className='m-2'>
            <h3 className='text-lg font-semibold'>{profileCardTitle}</h3>
            <p>{profileCardServer}</p>
        </div>

        <div className='w-[30%] m-2'>
            <img src={profileCardImgURL} className='rounded-md'/>
        </div>
    </div>
  )
}

export default ProfilePlaceCard