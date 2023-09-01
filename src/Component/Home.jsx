import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
function Home() {
  const[style,setStyle]=useState(true);
  const [islogin,setIsLogin]=useState(true)

  const user = useSelector((state) => state.user.value);

  useEffect(()=>{
    if(user.urllink){
      setStyle(false)
    }
    else{
      setStyle(true)
    }
  })
  useEffect(()=>{
    if(localStorage.getItem('auth')){
      setIsLogin(false)
    }
    
  })

  return (
    <>
    <div className={style ? "home_container":"close_home_container"}> 
      <h1 className='home_title'>Juke Stream</h1>
      <p className="home_note">Listen to your favourite Songs</p>
      <div >
        <button className="home_btn"><Link to={islogin ?"/login":"/upload"}>{islogin ? "Login":"Upload"}</Link></button>
        <button className="home_btn">Stream</button>
      </div>
    </div>
    </>
  )
}

export default Home;