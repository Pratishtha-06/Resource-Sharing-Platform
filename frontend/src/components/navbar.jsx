import React from 'react'
import Logo from '../assets/search.png'
import LinkComponent from './Link.jsx'
import ScreenSize from '../ScreenSize'
import SearchBar from './SearchBar.jsx'
import {Link} from 'react-router-dom'

function Navbar() {
  const screen = ScreenSize();

  return (
    <>
    <div className="px-4 pt-3 pt-3 pb-4" style={{background:'#dedede'}}>
    <div className={`d-flex ${screen<700?'flex-column gap-3':'flex-row'} justify-content-between align-items-center`}>
      <div className='d-flex gap-2'>
                  <img src={Logo} style={{width:'40px',height:'40px'}}/>
                  <Link to={`/`} style={{textDecoration:'none',fontWeight:'bold',fontSize:'25px',color:'#a76ed0'}}>CampusHub</Link>
      </div>
      <div>
       <SearchBar/>
      </div>
      <div>
       <LinkComponent/>
      </div>
    </div>
    </div>
    <div className='heading'>Get PYQs and strengthen your exam preparations !</div>
    </>
  )
}

export default Navbar
