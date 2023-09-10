import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Upload() {
  const navigate = useNavigate();
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("" );
  const [artist,setArtist]=useState("");
  const [coverAlbum,setCoverAlbum]=useState("");
  const [audio,setAudio]=useState("");
  const [style,setStyle]=useState(false);
  const[id,setId]=useState("")


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
    getData()
  },[])
  const getData=()=>{
    fetch('http://localhost:5002/Music/getMusic')
  .then((response) => response.json())
  .then((json) => setId(json));
  }
  const formData=()=>{
    const data=new FormData();
    data.append("audio",audio);
    data.append("title",title);
    data.append("description",description);
    data.append("artist",artist);
    data.append("coverAlbum",coverAlbum);
    data.append('id',id.length+1)
    fetch("http://localhost:5002/Music/uploadMusic",{
      method:"POST",
      body:data,
    })
    .then((response)=> response.json())
    navigate('/song')
  }
  return (
    <div className={style ? "upload_container":"close_upload_container"}>
      <p className="upload">Upload Song</p>
      <form className="upload_form">
        <label className="upload_label">Tilte</label>
        <input type="text" className="upload_input" placeholder="Please Enter song name same as Title Name" name="title" onChange={(e)=>setTitle(e.target.value)}/>
        <label className="upload_label">Description</label>
        <input type="text" className="upload_input" placeholder="Description"  name="title" onChange={(e)=>setDescription(e.target.value)} />
        <label className="upload_label">Artist</label>
        <input type="text" className="upload_input" placeholder="Artist"  name="title" onChange={(e)=>setArtist(e.target.value)} />
        <label className="upload_label">Cover Album</label>
        <input type="text" className="upload_input" placeholder="Cover Album"  name="title" onChange={(e)=>setCoverAlbum(e.target.value)}/>
        <label className="upload_label">Audio File</label>
        <input
          type="file"
          name="audio"
          id="audio"
          className="audio_input"
          placeholder="Audio Files"
          typeof="mp3/audio"
          onChange={(e)=>setAudio( e.target.files[0])}
        />
        <div className="upload_btn">
          <button className="upload_submit" onClick={formData}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
