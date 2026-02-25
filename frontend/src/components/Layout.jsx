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
   return (<div className='Loading'><div className='load'></div>Loading...</div>)
  }

  return (
    <>
      {(route != '/login' && route != '/register') &&
       <Navbar/>
       }
      <Outlet/>
      <footer style={{textAlign:'center',background:'#e6e6e6',fontSize:'10px',fontStyle:'italic',width:'100%',position:'fixed',bottom:'0%'}}>
        Resource Sharing Platform • Built by Pratishtha Nandwal
      </footer>
    </>
  )
}

export default Layout
