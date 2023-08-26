import React from "react";
import './Style.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Component/NavBar";
import Home from "./Component/Home";
import Song from "./Component/Song";
import Upload from "./Component/Upload";
import Playlist from "./Component/Playlist";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";

function App() {
  return (
    <>
      <Router>
        <NavBar/>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/song" element={<Song/>}/>
          <Route path="/upload" element={<Upload/>}/>
          <Route path="/playlist" element={<Playlist/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<SignUp/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
