import { async } from '@firebase/util'
import { collection, query, getDoc, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseconfig";
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams, Navigate } from 'react-router-dom'
import { getUserInfo } from '../utils/getUserInfo'
import { useGlobalContext } from '../context';

const TempRedirect = () => {

    const { id, setId, loading,setLoading} = useGlobalContext()
    const {mail} = useParams()
    // console.log(mail);


    useEffect(()=>{
        const getUserInfo = async (loginEmail,type) => {
            const userInfoQuery = query(collection(db,'userInfo'), where('user_email','==',loginEmail))
            const userInfoQuerySnaphhot = await getDocs(userInfoQuery)
            console.log('here')

            // console.log(userInfoQuerySnaphhot.data())
            userInfoQuerySnaphhot.forEach(doc => {
                console.log('in main');
                console.log(doc.id)
                setId(doc.id)
                setLoading(false)
            })
            //     else{
            //         console.log('in else')
            //         console.log(doc.id)
            //         return doc.id
            //     }
            // })
        }

        getUserInfo(mail)

        console.log('after getuserinfo')


},[])

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