import React from 'react'


function SearchBar() {
  return (
    <div className='d-flex justify-content-evenly align-items-center'>
        <div style={{width:'300px'}}>
            <input type='text' 
                   placeholder='Search by subject or year'
                   style={{border:'1px solid grey',borderRadius:'15px',width:'100%',paddingLeft:'10px'}}/>
        </div>
    </div>
  )
}

export default SearchBar
