import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
function NavBar() {
  const [ismobile, setIsMobile] = useState(false);
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
            <li className="nav_link btn">Login</li>
          </Link>
          <Link to="/register">
            <li className="nav_link btn">SignUp</li>
          </Link>
        </ul>
        <div className="menu" onClick={()=> setIsMobile(!ismobile)}>{ismobile ? <AiOutlineClose />:<BiMenu /> }</div>
      </nav>
    </>
  );
}

export default NavBar;
