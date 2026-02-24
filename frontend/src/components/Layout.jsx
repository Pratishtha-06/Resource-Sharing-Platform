import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './navbar'
import { useContext } from 'react';
import { UserContext } from './UserContext';
import '../index.css'

function Layout() {
  const location = useLocation();
  const route = location.pathname;
  const {ready} = useContext(UserContext);

  if(!ready){
   return (<div className='Loading'><div className='load'></div>Loading....</div>)
  }

  return (
    <>
      {(route != '/login' && route != '/register') &&
       <Navbar/>
       }
      <Outlet/>
    </>
  )
}

export default Layout
