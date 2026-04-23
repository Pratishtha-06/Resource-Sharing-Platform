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
      <AuthGate>
       <Routes>
        <Route element={<Layout/>}>
         <Suspense fallback={<div>Loading...</div>}>
          <Route index element = {<Home/>}/>
          <Route path='/register' element = {<Register/>}/>
          <Route path='/login' element = {<Login/>}/>         
          <Route path='/my-profile' element={<Profile/>}/>
          <Route path='/upload-resource' element={<UploadResources/>}/>
         </Suspense>
        </Route>
       </Routes>
      </AuthGate>
     </BrowserRouter>
     </UserContextProvider>
    </>
  )
}

export default App
