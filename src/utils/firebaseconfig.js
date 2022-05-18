import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'


const firebaseConfig = {

    apiKey: "AIzaSyAVtmZgV8n8i7zrEsE31tm3GZ1aVdjI7X0",
    authDomain: "minejrnl.firebaseapp.com",
    databaseURL: "https://minejrnl-default-rtdb.firebaseio.com",
    projectId: "minejrnl",
    storageBucket: "minejrnl.appspot.com",
    messagingSenderId: "682329315521",
    appId: "1:682329315521:web:e63b6ca2cd8ba9108cdc40",
    measurementId: "G-D8KXMNM1TZ"
  };

const fb_config = initializeApp(firebaseConfig)

export const db = getFirestore(fb_config)
export const auth = getAuth(fb_config)