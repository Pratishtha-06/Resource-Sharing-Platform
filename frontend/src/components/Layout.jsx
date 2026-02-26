import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './navbar'
import { useContext } from 'react';
import { UserContext } from './UserContext';
import '../index.css'

function Layout() {
  const location = useLocation();
  const route = location.pathname;

  return (
    <>
      {(route != '/login' && route != '/register') &&
       <Navbar/>
       }
      <Outlet/>
      <footer className='footer' style={{background:'#e6e6e6',fontSize:'10px',width:'100%',textAlign:'center'}}>
        Resource Sharing Platform • Built by Pratishtha Nandwal
      </footer>
    </>
  )
}

export default Layout
