import './index.css'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import { lazy,Suspense } from 'react';

const Login = lazy(()=>import ('./pages/login'));
const Register = lazy(()=>import ('./pages/Register'));
const Home = lazy(()=>import ('./pages/home'));
const Profile = lazy(()=>import ('./pages/Profile'));
const UploadResources = lazy(()=>import( './pages/UploadResources'));


import Layout from './components/Layout';
import UserContextProvider from './components/UserContext';
import axios from 'axios';
import AuthGate from './components/AuthGate';

axios.defaults.baseURL='https://resource-sharing-platform.onrender.com';
axios.defaults.withCredentials=true;

function App() {
  return (
    <>
    <UserContextProvider>
     <BrowserRouter>
      <Suspense fallback={<div className='Loading'><div className='load'></div>Loading...</div>}>
       <Routes>
        <Route element={<Layout/>}>
          <Route index element = {<Home/>}/>
          <Route path='/register' element = {<Register/>}/>
          <Route path='/login' element = {<Login/>}/>         
          <Route path='/my-profile' element={ <AuthGate><Profile/></AuthGate>}/>
          <Route path='/upload-resource' element={<AuthGate><UploadResources/></AuthGate>}/>
        </Route>
       </Routes>
      </Suspense> 
     </BrowserRouter>
     </UserContextProvider>
    </>
  )
}

export default App
