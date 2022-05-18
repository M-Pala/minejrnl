import { collection, query, getDoc, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseconfig";

export const getUserInfo = async (loginEmail,type) => {
    const userInfoQuery = query(collection(db,'userInfo'), where('user_email','==',loginEmail))
    const userInfoQuerySnaphhot = await getDocs(userInfoQuery)
    console.log('here')
    userInfoQuerySnaphhot.forEach(doc => {
        // console.log(doc.data(), doc.id)
        if(type==='main'){
            console.log('in main');
            return [doc.data(), doc.id]
        }
        else{
            console.log('in else')
            console.log(doc.id)
            return doc.id
        }
    });

    // console.log(userInfoQuerySnaphhot.data(), userInfoQuerySnaphhot.id)
    // return [userInfoQuerySnaphhot.data(), userInfoQuerySnaphhot.id]
}