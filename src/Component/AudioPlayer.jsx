import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BsPlayFill } from "react-icons/bs";
import { BsPauseFill } from "react-icons/bs";
import { BiSkipPreviousCircle } from "react-icons/bi";
import { BiSkipNextCircle } from "react-icons/bi";
import imgsong from "../assets/img.avif";


function AudioPlayer() {
  const sliderRef = useRef(null);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState("");
  const [totalLength, setTotallength] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  const [style,setStyle]=useState(true)

  const user = useSelector((state) => state.user.value);
  useEffect(()=>{
    if(user.urllink === ""){
      setStyle(false)
    }
    else{
      getAudioLength();
      setStyle(true)
    }
  })

  useEffect(() => {
    const minutes = Math.floor(currentTime / 60);
    const remainingSeconds = Math.floor(currentTime % 60);
    const formatted = `${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
    setFormattedTime(formatted);
  }, [currentTime]);

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
  const handleplay=()=>{
    audioRef.current.play();
    console.log("start")
    setIsPlaying(!isPlaying)

  }
  const handlestop=()=>{
    audioRef.current.pause();
    console.log("stop")
    setIsPlaying(!isPlaying)
  }
  return (
    <div className={style ? "audioplayer_container":"close_audioplayer_container"}>
      <audio
        src={user.urllink}
        controls
        ref={audioRef}
        onTimeUpdate={updateTime}
        id="audio_tag"
      />
              <img src={imgsong} alt="" className="imgsong" />
      <div className="audio_controls">
        <p className="audio_control_btn">
          <BiSkipPreviousCircle />
        </p>
        <p className="audio_control_btn">
         {isPlaying ? <div onClick={()=>handleplay()}><BsPlayFill/></div>:<div onClick={()=>handlestop()}>< BsPauseFill  /> </div>}
        </p>
        <p className="audio_control_btn">
          <BiSkipNextCircle />
        </p>
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
  );
}

export default AudioPlayer;
