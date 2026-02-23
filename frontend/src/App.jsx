import './index.css'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/Register';
import Home from './pages/home';
import Profile from './pages/Profile';
import Layout from './components/Layout';
import UploadResources from './pages/uploadResources';
import UserContextProvider from './components/UserContext';
import axios from 'axios';

axios.defaults.baseURL='http://localhost:5000';
axios.defaults.withCredentials=true;

function App() {
  return (
    <>
    <UserContextProvider>
     <BrowserRouter>
       <Routes>
        <Route element={<Layout/>}>
          <Route index element = {<Home/>}/>
          <Route path='/register' element = {<Register/>}/>
          <Route path='/login' element = {<Login/>}/>         
          <Route path='/my-profile' element={<Profile/>}/>
          <Route path='/upload-resource' element={<UploadResources/>}/>
         </Route>
       </Routes>
     </BrowserRouter>
     </UserContextProvider>
    </>
  )
}

export default App
