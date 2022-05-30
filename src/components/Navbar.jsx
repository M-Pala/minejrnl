import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import {AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai'
import mineJrnl from '../images/mineJrnl.png'

const Navbar = () => {

    const {logout, menuState, setMenuState} = useGlobalContext()
    

    const user_info = JSON.parse(localStorage.getItem('userInfo'))
  return (
      <div className='sticky top-0'>

        <div className={`flex relative items-center bg-white px-3 drop-shadow-md  ${user_info?'justify-between' : 'justify-center' }`}>
            {user_info ?  
                <Link to={`/`} onClick={()=>setMenuState(false)}><img className='w-28' src={mineJrnl}/></Link>
                : <img className='w-28' src={mineJrnl}/>}
                
            
            {user_info && <ul className='hidden md:flex justify-end sm:hidden'>
                {user_info && <Link to={`/`} onClick={()=>setMenuState(false)} className='py-5 px-3 transition-all ease-in-out hover:bg-green-500 hover:text-white'><li >Home</li></Link>}
                {user_info && <Link to={`/createPlace`} onClick={()=>setMenuState(false)} className='py-5 px-3 transition-all ease-in-out hover:bg-green-500 hover:text-white'><li>Create</li></Link>}
                {user_info && <Link to={`/profile/${user_info?.user_id}`} onClick={()=>setMenuState(false)} className='py-5 px-3 transition-all ease-in-out hover:bg-green-500 hover:text-white'><li>Profile</li></Link>}
                {user_info && <Link to={`/login`} onClick={logout}><li onClick={logout} className='py-5 px-3 transition-all ease-in-out hover:cursor-pointer bg-red-100 text-red-500 hover:bg-red-500 hover:text-white'>Logout</li></Link> }
            </ul>}
            <div className='md:hidden '>
                {user_info &&<button onClick={()=>setMenuState(!menuState)}> {menuState?<AiOutlineMenuFold className='text-3xl'/> : <AiOutlineMenu  className='text-3xl'/>} </button>}
                {user_info && menuState && <ul className='absolute w-56 right-2 gap-8 bg-slate-100 rounded-md'>
                    {user_info && <Link to={`/`} onClick={()=>setMenuState(false)}><li className='mx-2 py-4 text-lg  text-center' >Home</li></Link>}
                    {user_info && <Link to={`/createPlace`} onClick={()=>setMenuState(false)}><li className='mx-2 py-4 text-lg  text-center'>Create</li></Link>}
                    {user_info && <Link to={`/profile/${user_info?.user_id}`} onClick={()=>setMenuState(false)}><li className='mx-2  py-4 text-lg  text-center'>Profile</li></Link>}
                    {user_info && <Link to={`/login`} onClick={logout}><li className='mx-2  py-4 text-lg  text-center'>Logout</li></Link> }
                </ul>}
            </div>
            
        </div>
      </div>
  )
}

export default Navbar