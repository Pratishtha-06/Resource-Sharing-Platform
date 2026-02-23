import React, { useState,useEffect } from 'react'

function ScreenSize() {
  const [width , setWidth] = useState(window.innerWidth);

  useEffect(()=>{
    const handleResize =()=>setWidth(window.innerWidth);
    window.addEventListener('resize',handleResize);
    return ()=>window.removeEventListener('resize',handleResize);

  },[])

  return  width;
  return 
  <></>
}

export default ScreenSize;
