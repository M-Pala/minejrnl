import React, { useEffect,useState } from 'react'
import { useGlobalContext } from '../context'
import { addDoc, collection, query, getDoc, getDocs, where, orderBy, limit, startAfter } from "firebase/firestore";
import {db} from '../utils/firebaseconfig'
import {Link} from 'react-router-dom'
import {BiPlusCircle} from 'react-icons/bi'
import Login from './Login';
import HomePlaceCard from './HomePlaceCard';

const Home = () => {


  const {lastVisible, setLastVisible, homeDocSnap, setHomeDocSnap, isLoggedIn,} = useGlobalContext()



  useEffect(()=>{
    
    const getFirstBatch = async () => {

      const first = query(collection(db, "placesInfo"), orderBy("createdAt",'desc'), limit(3));
      const documentSnapshots = await getDocs(first);
  
      setHomeDocSnap(documentSnapshots.docs)
      // console.log(documentSnapshots.docs[1].id)

      const lastVisibleDoc = documentSnapshots.docs[documentSnapshots.docs.length-1];
      // console.log("last", lastVisibleDoc);

      setLastVisible(lastVisibleDoc)
      // console.log(lastVisibleDoc)
  
    }

    getFirstBatch()

  },[])

  const getMorePlace = async ()=>{
    const next = query(collection(db, "placesInfo"),
    orderBy("createdAt",'desc'),
    startAfter(lastVisible),
    limit(5));

    
    const documentSnapshots = await getDocs(next);

    const lastVisibleDoc = documentSnapshots.docs[documentSnapshots.docs.length-1];
    setLastVisible(lastVisibleDoc)

    setHomeDocSnap(homeDocSnap.concat(documentSnapshots.docs))

  }


  if(!isLoggedIn){
    return <Login/>
  }
  else{
  return (

    <>
      <div className=''>

      

        {homeDocSnap && homeDocSnap?.map((place)=>{
          return (
            <Link className='flex justify-center' key={place.id} to={`/placeDetail/${place.id}`}>

              <HomePlaceCard key={place.id} place_id = {place.id} user_id = {JSON.parse(localStorage.getItem('userInfo'))?.user_id}/>
            </Link>
          )})
          }
      
      
      <div className='flex justify-center'>
        <button onClick={getMorePlace} className='w-[50%] bg-green-400 text-white shadow-xl py-3 font-bold text-lg rounded-md my-5'> Get More <BiPlusCircle className='inline text-3xl'/> </button>
      </div>
      </div>
    </>
  )
}
}
export default Home