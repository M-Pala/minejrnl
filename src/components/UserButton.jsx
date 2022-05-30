import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { db } from '../utils/firebaseconfig'
import { doc,getDoc } from 'firebase/firestore'

const UserButton = ({user_id}) => {

    const [userName, setUserName] = useState()

    useEffect(()=>{
      
        const getUserInfo = async () => {
        
        const docRef = doc(db, "userInfo", String(user_id));
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setUserName(docSnap?.data().user_name)
        } else {
          console.log("No such document!");
        }
        }

  
      getUserInfo()
  
  
      },[userName])


  return (

        <Link to={`/searchprofile/${user_id}`}>

                  <p className='inline text-lg font-light px-2 py-1 ml-1 bg-green-50 border-b-green-500 border-b-2 shadow-green-200 shadow-md'> {userName} </p>
        </Link>
  )
}

export default UserButton