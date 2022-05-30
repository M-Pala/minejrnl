import React, {useState,useContext,useEffect, createContext} from "react";
import fb_config, { auth, db } from './utils/firebaseconfig'
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { addDoc, collection, query, getDoc, getDocs, where, doc, Timestamp, updateDoc, arrayUnion } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { Navigate } from "react-router-dom";
import Error from "./components/Error";

const AppContext = createContext()

const AppProvider = ({children}) => {

    useEffect(()=>{
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
        if (user) {

            const uid = user.uid;
            console.log('user is logged in');
            setIsLoggedIn(true)
            console.log(uid);

        } else {
            console.log('user is not logged in')
            setIsLoggedIn(false)

        }
        });
    },[])

    const [menuState, setMenuState] = useState(false)

////////////////////////////////////////////////////// login page setup /////////////////////////////////////////////////////////////
    const [registerEmail, setRegisterEmail] = useState()
    const [registerPass, setRegisterPass] = useState()
    const [loginEmail, setLoginEmail] = useState()
    const [loginPass, setLoginPass] = useState()
    const [registerName, setRegisterName] = useState()
    const [signUp, setSignUp] = useState(true)
    const [errorMsg, setErrorMsg] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPass)
            const userDocRef = await addDoc(collection(db,'userInfo'),{
                user_email: registerEmail,
                user_name: registerName,
                user_pass: registerPass
            })

            setLoginEmail(registerEmail)
            setLoginPass(registerPass)

            alert('You are now registered with us. Please Log in with email and password to continue') 
            window.location.reload()

        } catch (error) {
            console.log('error', error)
            setErrorMsg(error)
            window.location.hash = `/error`
        }
    }

    const login = async () => {
        try {

            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPass)
            console.log('after catch')
            window.location.hash = `/tempRedirect/${loginEmail}`

        } catch (error) {
            console.log('error', error)
            setErrorMsg(error)
            window.location.hash = `/error`
        }


        
    }

    const logout =() => {
        signOut(auth).then(()=>{
            localStorage.removeItem('userInfo')
            setLoginEmail()
            setLoginPass()
            setProfileEmail()
            setProfileName()

            console.log('logout successfull')
            
            return <Navigate to='/logout'/>
        }).catch((e)=>{
            console.log(e);
            return false
        })
    }
////////////////////////////////////////////////////// login page setup /////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////// Temp redirect page setup /////////////////////////////////////////////////////



////////////////////////////////////////////////////// Temp redirect page setup /////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////// profile page setup ///////////////////////////////////////////////////////////

    const [profileName, setProfileName] = useState()
    const [profileEmail, setProfileEmail] = useState()

    const [docSnapState, setDocSnapState] = useState()



////////////////////////////////////////////////////// profile page setup ///////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////// Home page setup ////////////////////////////////////////////////////////////
    const [lastVisible, setLastVisible] = useState()
    const [homeDocSnap, setHomeDocSnap] = useState()



/////////////////////////////////////////////////////// Home page setup ////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////// Create page setup ////////////////////////////////////////////////////////////

    const [createCordX, setCreateCordX] = useState()
    const [createCordY, setCreateCordY] = useState()
    const [createCordZ, setCreateCordZ] = useState()

    const [createDesc, setCreateDesc] = useState()
    const [createServerLoc, setCreateServerLoc] = useState()
    const [createImg, setCreateImg] = useState()
    
    const [createImgFBUrl, setCreateImgFBUrl] = useState()
    const [createUploadProgress, setCreateUploadProgress] = useState()

    
    const uploadPlaceDetails = async (e) => {

        e.preventDefault()
        
        console.log(createCordX, createCordY, createCordZ, createDesc, createImg, createServerLoc);
        console.log('before docref')
        const current_user_id = JSON.parse(localStorage.getItem('userInfo')).user_id
        const docRef = doc(db, 'userInfo',current_user_id)
        console.log('after docref')
        const docSnap = await getDoc(docRef)
        const storage = getStorage()
        const sotrageRef = ref(storage,`placesImages/${Date.now()}-${createImg.name}`)
        const uploadTask = uploadBytesResumable(sotrageRef,createImg)
    
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setCreateUploadProgress('Upload is ' + progress + '% done')
            },
            (error) => {
                console.log(error)
                alert(error)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
                    
                    console.log(downloadURL)
                    setCreateImgFBUrl(downloadURL)
                    const placeesDocRef = await addDoc(collection(db,'placesInfo'),{
                        coords : {
                            x : createCordX,
                            y : createCordY,
                            z : createCordZ
                        },
                        createdAt: Timestamp.fromDate(new Date()),
                        createdBy: `userInfo/${current_user_id}`,
                        description: createDesc,
                        imageURL: downloadURL,
                        serverLocation: createServerLoc
                    })

                    console.log(placeesDocRef);
                    
                    const userDocRef = doc(db, "userInfo", current_user_id);
                    

                    await updateDoc(userDocRef, {
                        places_uploaded: arrayUnion(`placesInfo/${placeesDocRef.id}`)
                      });
                    
                      window.location.hash = `/profile/${current_user_id}`
                })
                console.log('Uploaded all data')
                
            }
    
    
        )
        
        
      }


/////////////////////////////////////////////////////// Create page setup ////////////////////////////////////////////////////////////


    return <AppContext.Provider value={{signUp, setSignUp,registerEmail, setRegisterEmail,registerPass, setRegisterPass,loginEmail, setLoginEmail,loginPass, setLoginPass,registerName, setRegisterName,register,login,logout,profileName, setProfileName,profileEmail, setProfileEmail,isLoggedIn, setIsLoggedIn,createCordX, setCreateCordX, createCordY, setCreateCordY,createCordZ, setCreateCordZ, createDesc, setCreateDesc, createServerLoc, setCreateServerLoc, createImg, setCreateImg, createUploadProgress, setCreateUploadProgress, uploadPlaceDetails,docSnapState, setDocSnapState,lastVisible, setLastVisible, homeDocSnap, setHomeDocSnap,menuState, setMenuState, errorMsg}}>
        {children}
    </AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext}