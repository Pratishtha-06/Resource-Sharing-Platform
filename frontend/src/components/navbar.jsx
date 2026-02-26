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
    <div className="d-flex justify-content-between px-4 pt-3 pt-3 pb-4 navbar">
    <div className='navbar-row'>
      <div className="navbar-brand">
                  <img src={Logo} className='navbar-logo'/>
                  <Link to={`/`} className='navbar-title'>CampusHub</Link>
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

export default React.memo(Navbar)
