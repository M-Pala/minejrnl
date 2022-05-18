import React, {useEffect, useState} from 'react'

import minecraftLogo from '../images/minecraftLogo.png'
// import login_bg from '../images/login_bg.jpg'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'

const Login = () => {




    const {signUp, setSignUp,registerEmail, setRegisterEmail,registerPass, setRegisterPass,loginEmail, setLoginEmail,loginPass, setLoginPass,registerName, setRegisterName,register,login,logout} = useGlobalContext()

    const [user, setUser] = useState({})

    // onAuthStateChanged(auth, (currentUser)=>{
    //     setUser(currentUser)
    // })

  return (
    <>
        {/* page container */}

            <div className=" h-screen  flex flex-row flex-wrap items-center justify-evenly">
                <div className='md:w-[45%] w-[90%]  flex flex-col gap-8 items-start md:h-[50%]'>
                    <h1 className='text-white leading-9 text-4xl teju font-bold md:text-6xl  md:font-extrabold md:leading-[4rem]'>Save your minecraft location from anywhere with <span className='text-green-400'> mineJrnl</span></h1>
                    <h1 className='text-white text-2xl font-semibold md:text-3xl md:font-bold'>Sign up now to log your journey</h1>
                </div>
            
                {/* login box container */}
                <div className='w-1/4 h-1/3 min-w-[340px] min-h-[420px] bg-white flex flex-wrap rounded-lg shadow-md'>
            
                {/* login sign up selection */}
                    <div className='flex justify-evenly rounded-t-lg bg-white w-full h-10'>
                        <div className={`my-0 h-10 w-full font-bold text-lg text-green-700  text-center rounded-tl-lg block p-2 hover:cursor-pointer ${signUp? 'bg-white text-slate-900 border-none rounded-tr-lg':'rounded-br-lg bg-slate-300 text-slate-400'}`} onClick={()=>setSignUp(true)}>Sign Up</div>
                        <div className={`my-0 h-10 w-full font-bold text-lg text-green-700 text-center rounded-tr-lg block p-2 hover:cursor-pointer ${signUp?'rounded-bl-lg bg-slate-300 text-slate-400' :'bg-white text-slate-900 rounded-tl-lg border-none '}`} onClick={()=>setSignUp(false)}>Log In</div>
                    </div>
            
                    {/* sign up form */}
            
                    {signUp ? 
                    <>
                        <div className='w-full flex justify-center items-baseline flex-wrap'>
                            <input className='p-3 max-h-10 w-80 rounded-md shadow-sm' type='text' placeholder='Name' onChange={(e)=>{setRegisterName(e.target.value)}}/>
                            <input className='p-3 max-h-10 w-80 rounded-md shadow-sm' type='email' placeholder='Email' onChange={(e)=>{setRegisterEmail(e.target.value)}}/>
                            <input className='p-3 max-h-10 w-80 rounded-md shadow-sm' type='password' placeholder='Password' onChange={(e)=>{setRegisterPass(e.target.value)}}/>
                        </div>

                        <div className='w-full flex justify-center items-center flex-wrap'>
                            <Link to={`/login`}>
                                <button className='bg-green-500 hover:bg-green-700 font-bold text-lg transition-all text-white rounded-lg w-72 max-h-10 p-3 flex justify-center items-center shadow-sm' onClick={register}>Sign Up</button>
                            </Link>
                        </div>
                    </> :
            
                    /* log in form */
                    <>
                    <div className='w-full flex justify-center items-baseline flex-wrap'>
                        <input className='p-3 max-h-10 w-80 rounded-md shadow-sm' type='email' placeholder='Email' onChange={(e)=>{setLoginEmail(e.target.value)}}/>
                        <input className='p-3 max-h-10 w-80 rounded-md shadow-sm' type='password' placeholder='Password' onChange={(e)=>{setLoginPass(e.target.value)}}/>
                    </div>

                    <div className='w-full flex justify-center items-center flex-wrap'>
                        <Link to={`/tempRedirect/${loginEmail}`}>
                            <button className='bg-green-500 hover:bg-green-700 font-bold text-lg transition-all text-white rounded-lg w-72 max-h-10 p-3 flex justify-center items-center shadow-sm' onClick={login}>Log in</button>
                        </Link>
                    </div>
                    </>}
            
                </div>
            </div>
      
    </>
  )
}

export default Login