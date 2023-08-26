import React, { useEffect, useState } from "react";
import imgsong from "../assets/img.avif";
import { AiFillDelete } from "react-icons/ai";
import { CgRemoveR } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { login } from "../features/url";

function Playlist() {
  const dispatch = useDispatch();
  const [display_form, setDisplay_form] = useState(true);
  const [playlist, setPlaylist] = useState({ playlist: "" });
  const [music, setMusic] = useState([]);
  const [playlist_song, setPlaylist_song] = useState([]);
  const [box_container, setBox_container] = useState(true);
  const [select_playlist, setSelect_playlist] = useState([]);
  const [playlistlengths, setplaylistlengths] = useState(0);

  const user = useSelector((state) => state.user.value);

  const playlistlength = () => {
    var result = music.filter((n) => n.playlist === select_playlist);
    setplaylistlengths(result.length);
  };
  useEffect(() => {
    playlistlength();
  }, [select_playlist]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaylist({ ...playlist, [name]: value });
    console.log(playlist);
  };
  const createPlaylist = async () => {
    let headers = {
      method: "POST",
      body: JSON.stringify(playlist),
      headers: {
        "content-type": "application/json",
      },
    };
    let resp = await fetch(
      "http://localhost:5001/Playlist/createPlaylist",
      headers
    );
    let result = await resp.json();
    console.log(result);
  };

  const getPlaylist_song = async () => {
    let resp = await fetch("http://localhost:5001/Playlist/getPlaylist");
    let result = await resp.json();
    setPlaylist_song(result);
  };
  useEffect(() => {
    getPlaylist_song();
  }, []);
  const formClose = () => {
    createPlaylist();
    setDisplay_form(!display_form);
    getPlaylist_song();
  };
  useEffect(() => {
    playlistlength();
  }, [select_playlist]);
  const handlePlaylist = (playlist) => {
    setBox_container(!box_container);
    setSelect_playlist(playlist);
  };
  useEffect(() => {}, [select_playlist]);

  const deletePlaylist = async (playlist) => {
    const id = playlist._id;
    let header = {
      method: "DELETE",
    };
    let resp = await fetch(
      `http://localhost:5001/Playlist/deletePlaylist/${id}`,
      header
    );
    let result = await resp.json();
    console.log(result);
    getPlaylist_song();
  };

  useEffect(() => {
    getMusic();
  }, []);

  const getMusic = async () => {
    let resp = await fetch("http://localhost:5001/Music/getMusic");
    let result = await resp.json();
    setMusic(result);
  };

  useEffect(() => {}, [music]);

  const removePlaylist = async (song) => {
    console.log(song);
    let reqObj = { ...song, playlist: "" };
    let headers = {
      method: "PUT",
      body: JSON.stringify(reqObj),
      headers: {
        "content-type": "application/json",
      },
    };
    let id = song._id;
    fetch(`http://localhost:5001/Music/removePlaylist/${id}`, headers);
    getMusic();
  };
  return (
    <div className="playlist_container">
      <form
        className={
          display_form ? "remove_playlist_create_form" : "playlist_create_form"
        }
      >
        <input
          type="text"
          className="playlist_input"
          name="playlist"
          placeholder="Playlist Name"
          onChange={handleChange}
        />
        <p
          className="playlist_form_close"
          onClick={() => setDisplay_form(!display_form)}
        >
          Close
        </p>
        <button className="playlist_form_create_btn" onClick={formClose}>
          Create
        </button>
      </form>
      <div
        className="create_playlist_btn"
        onClick={() => setDisplay_form(!display_form)}
      >
        + Create Playlist
      </div>
      <div
        className={
          box_container
            ? "playlist_box_container"
            : "close_playlist_song_box_container"
        }
      >
        {playlist_song.map((playlist) => {
          return (
            <div className="playlist_song_box_container" key={playlist._id}>
              <div
                className="playlist_box_align"
                onClick={() => handlePlaylist(playlist.playlist)}
              >
                <img src={imgsong} alt="" className="imgsong" />
                <div className="playlist_song_name">
                  <p>{playlist.playlist}</p>
                  <p>Songs</p>
                </div>
              </div>
              <div
                className="delete_icon"
                onClick={() => deletePlaylist(playlist)}
              >
                <AiFillDelete />
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={box_container ? "close_playlist_song_row" : "playlist_box_row"}>
          <div className={box_container?"close_selectedplaylist":"selectedplaylist"}>
          <div>
            <p> {select_playlist}</p>
            <p>Songs-{playlistlengths}</p>
          </div>
          <div className="close" onClick={()=>setBox_container(!box_container)}>X</div>
        </div>
        {music
          .filter(function (playlist) {
            return playlist.playlist === select_playlist;
          })
          .map(function (song) {
            return (
              <>
                <div
                  className="playlist_box_row_container"
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
                  <div className="playlist_name_img_box">
                    <img src={imgsong} alt="" className="imgsong" />
                    <div className="playlist_name_container">
                      <p>{song.title}</p>
                      <p>{song.artist}</p>
                    </div>
                  </div>
                  <div
                    className="add_playlist"
                    onClick={() => removePlaylist(song)}
                  >
                    <CgRemoveR />
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Playlist;
