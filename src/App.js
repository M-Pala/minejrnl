import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import TempRedirect from './components/TempRedirect';
import CreatePlace from './components/CreatePlace';
import PlaceDetails from './components/PlaceDetails';
import Navbar from './components/Navbar';
import { useGlobalContext } from './context';
import SearchProfile from './components/SearchProfile';
import Error from './components/Error';


function App() {
  
  const {menuState, setMenuState} = useGlobalContext()
  return (
    <>

      <Navbar/>
    <div onFocus={()=>setMenuState(false)}>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        <Route path='/searchprofile/:id' element={<SearchProfile/>}/>
        <Route path='/tempRedirect/:mail' element={<TempRedirect/>}/>
        <Route path='/createPlace' element={<CreatePlace/>}/>
        <Route path='/placeDetail/:place_Id' element={<PlaceDetails/>}/>
        <Route path='/error' element={<Error/>}/>
        <Route path='/*' element={<Home/>}/>
      </Routes>
    </div>

    </>
  );
}

export default App;
