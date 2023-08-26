import React, { useEffect, useState } from "react";
import imgsong from "../assets/img.avif";
import { MdPlaylistAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../features/url";

function Song() {
  const dispatch = useDispatch();
  const [song, setSong] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [hover,setHover]=useState(true)

  const user = useSelector((state) => state.user.value);

 


  useEffect(() => {
    getSongs();
  }, [setSong]);

  const getSongs = async () => {
    let resp = await fetch("http://localhost:5001/Music/getMusic");
    let result = await resp.json();
    setSong(result);
  };

  const getSongPlaylist = async () => {
    let resp = await fetch("http://localhost:5001/Playlist/getPlaylist");
    let result = await resp.json();
    setPlaylists(result)
  };
  useEffect(()=>{
    getSongPlaylist()
  },[])


  const addPlaylist = async (playlist,song) => {
    console.log(song)
    let reqObj={playlist:playlist}
    let headers={
      method:"PUT",
      body:JSON.stringify(reqObj),
      headers:{
        'content-type':'application/json'
      }
    }
    let id=song._id;
    fetch(`http://localhost:5001/Music/addPlaylist/${id}`,headers)
    getSongPlaylist()
    setHover(!hover)
  }

  return (
    <div className="song_container">
      {song.map((song) => {
        return (
          <div
            className="song_box_container"
            key={song._id}
            onClick={() =>
              dispatch(
                login({
                  urllink: song.url,
                  songartist: song.artist,
                  songname: song.title,
                  id: song.id,
                })
              )
            }
          >
            <div className="song_name_img_box">
              <img src={imgsong} alt="" className="imgsong" />
              <div className="song_name_container">
                <p>{song.title}</p>
                <p>{song.artist}</p>
              </div>
            </div>
            <div className="add_playlist">
              <span onClick={()=>setHover(!hover)}><MdPlaylistAdd /></span>
              <div className={hover ?"playlist_hover_container":"close_playlist_hover_container"}>
                {playlists.map((playlist)=>{
                  return(
                    <div>
                    <p className="playlistname" onClick={()=>{addPlaylist(playlist.playlist,song)}}>{playlist.playlist}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Song;
