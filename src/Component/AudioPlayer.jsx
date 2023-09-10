import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../features/url";
import { AiFillStepBackward } from "react-icons/ai";
import { AiFillStepForward } from "react-icons/ai";
import { BsFillPauseFill } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";
import imgsong from "../assets/img.avif";

function AudioPlayer() {
  const [isPlaying, setIsPlayling] = useState(true);
  const [isDisplay, setIsDisplay] = useState(true);
  const [songplay, setsongplay] = useState(false);
  const [totalLength, setTotallength] = useState("0:00");
  const [currentTime, setCurrentTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const [work,setwork]=useState(true);


  const audioRef = useRef(null);
  const sliderRef = useRef(null);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (user.urllink) {
      setsongplay(true);
    } else {
      setsongplay(false);
    }
  }, [user]);

  useEffect(()=>{
    if(user.urllink === "")
    {
     fun()
    }
    else{
      hello()
    }
  })
  const fun=()=>{
    setwork(true)
  }
  const hello=()=>{
    setwork(false)
    
  }
  const play = () => {
    const audio = audioRef.current;
    audio.play();
    setIsPlayling(false);
    setIsDisplay(false);
  };
  const pause = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlayling(true);
    setIsDisplay(true);
  };
  const forward = async (id) => {
    let resp = await fetch(`http://localhost:5002/Music/getSong/${id + 1}`);
    let result = await resp.json();
    dispatch(
      login({
        urllink: result[0].url,
        songartist: result[0].artist,
        songname: result[0].title,
        id: result[0].id,
      })
    );
    audioRef.current.play();
  };
  useEffect(() => {
    const minutes = Math.floor(currentTime / 60);
    const remainingSeconds = Math.floor(currentTime % 60);
    const formatted = `${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
    setFormattedTime(formatted);
  }, [currentTime]);
  const backward = async (id) => {
    let resp = await fetch(`http://localhost:5002/Music/getSong/${id - 1}`);
    let result = await resp.json();
    console.log(result);
    console.log(result[0].url);
    dispatch(
      login({
        urllink: result[0].url,
        songartist: result[0].artist,
        songname: result[0].title,
        id: result[0].id,
      })
    );
    audioRef.current.play();
  };

  useEffect(() => {
    if (songplay) {
      setTimeout(() => {
        getAudioLength();
      }, 1000);
    }
  });
  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSliderChange = () => {
    const newTime = sliderRef.current.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const getAudioLength = () => {
    if (audioRef.current) {
      const audioElement = audioRef.current;
      const duration = audioElement.duration;
      const minutes = Math.floor(duration / 60);
      const remainingSeconds = Math.floor(duration % 60);
      const formatted = `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
      setTotallength(formatted);
    }
  };
  return (
    <div className={work ? "close_audio_container":"audio_container"}>
      <audio
        src={user.urllink}
        controls
        id="audio"
        ref={audioRef}
        onTimeUpdate={updateTime}
        autoPlay
      ></audio>
      <div id="hello">
        <img src={imgsong} alt="" className="imgsong" />
        <div className="song_name_artist">
          <p>{user.songname}</p>
          <p>{user.songartist}</p>
        </div>
      </div>

      <div className="audio_control">
        <div
          onClick={() => {
            backward(user.id);
          }}
        >
         <AiFillStepBackward />
        </div>
        <div
          onClick={() => {
            isPlaying ? play() : pause();
          }}
        >
          {isDisplay ? <BsFillPlayFill /> : <BsFillPauseFill />}
        </div>
        <div
          onClick={() => {
            forward(user.id);
          }}
        >
          <AiFillStepForward />
        </div>
        <input
          type="range"
          min="0"
          max={audioRef.current ? audioRef.current.duration : 0}
          value={currentTime}
          onChange={handleSliderChange}
          ref={sliderRef}
          id="rangebtn"
        />
        <p>
          {formattedTime}/{totalLength}
        </p>
      </div>
    </div>
  );
}
export default AudioPlayer;
