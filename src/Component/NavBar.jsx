import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
function NavBar() {
  const [ismobile, setIsMobile] = useState(false);
  const [islogin,setIsLogin]=useState(true)
  useEffect(()=>{
    if(localStorage.getItem('auth'))
    {
      setIsLogin(false)
    }
    else{
      setIsLogin(true)
    }
    console.log("jheld")
  })

  
  useEffect(()=>{
    console.log(islogin)
  },[islogin])
  return (
    <>
      <nav className="navbar">
        <h3 className="logo">Juke Stream</h3>
        <ul className={ismobile ? "nav_mob_item" : "nav_item"} onClick={()=>setIsMobile(false)}>
          <Link to="/">
            <li className="nav_link">Home</li>
          </Link>
          <Link to="/song">
            <li className="nav_link">Song</li>
          </Link>
          <Link to="/upload">
            <li className="nav_link">Upload</li>
          </Link>
          <Link to="/playlist">
            <li className="nav_link">Playlist</li>
          </Link>
          <Link to="/login">
            <li className={islogin ? "nav_link btn":"display_none"}>Login</li>
          </Link>
          <Link to="/register">
            <li className={islogin ? "nav_link btn":"display_none"}>SignUp</li>
          </Link>
          <li onClick={()=>localStorage.removeItem("auth")} className={islogin ?"display_none":"nav_link btn"}>Logout</li>
        </ul>
        <div className="menu" onClick={()=> setIsMobile(!ismobile)}>{ismobile ? <AiOutlineClose />:<BiMenu /> }</div>
      </nav>
    </>
  );
}

export default NavBar;
