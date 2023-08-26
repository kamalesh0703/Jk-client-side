import React from 'react'
import {Link} from 'react-router-dom';
function Home() {
  return (
    <>
    <div className="home_container"> 
      <h1 className='home_title'>Juke Stream</h1>
      <p className="home_note">Listen to your favourite Songs</p>
      <div >
        <button className="home_btn"><Link to="/login">Login</Link></button>
        <button className="home_btn">Stream</button>
      </div>
    </div>
    </>
  )
}

export default Home