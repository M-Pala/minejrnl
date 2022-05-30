import { collection, query, getDoc, where, getDocs, doc } from "firebase/firestore";
import { db } from "../utils/firebaseconfig";
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams, Navigate } from 'react-router-dom'

const TempRedirect = () => {

    const [id, setId] = useState()
    const [loading, setLoading] = useState(true)

    const {mail} = useParams()


    useEffect(()=>{
        const getUserInfo = async (loginEmail) => {
            try{
                console.log('loginEmail',loginEmail)
                const userInfoQuery = query(collection(db,'userInfo'), where('user_email','==',loginEmail))
                const userInfoQuerySnaphhot = await getDocs(userInfoQuery)
    
                userInfoQuerySnaphhot.forEach(doc => {
                    console.log('in main');
                    console.log(doc.id)
                    setId(doc.id)
                })
            }catch(error){
                console.log('redirect error', error)
            }
            }
            
        getUserInfo(mail)
        
    },[])


    useEffect(()=>{
        if(id){
            console.log('id useeffect')
            const getAllInfo = async () => {
                    console.log('id', id)
                    setLoading(false)
                }
    
    
            getAllInfo()
        }

    },[id])

    if(loading){
        return <h1>Loading</h1>
    }
    else{
        return (
            <Navigate to={`/profile/${id}`}/>
        )
    }
}

export default TempRedirect