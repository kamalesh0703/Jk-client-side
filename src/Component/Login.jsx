import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidLogIn } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
function Login() {
  const navigate=useNavigate();
  const [logindetails,setLoginDetails]=useState({email:"",password:""});
  const [error,setError]=useState("");
  const [style,setStyle]=useState(false)

  const user = useSelector((state) => state.user.value);
  useEffect(()=>{
    if(user.urllink === ""){
      kkj()
    }
    else{
      ass()
    }
  })
  const kkj=()=>{
    setStyle(true)
    
  }
  const ass=()=>{
    setStyle(false)
  }
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setLoginDetails({...logindetails,[name]:value});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(logindetails));
  };
  const validate=(values)=>{
    const error={};
    if(!values.email){
      error.email="Email is Required!";
      if (!values.password){
        error.password="Password is Required!"
      }
    }
    
    else{
      addLoginUser(logindetails)
    }
    return error;
  };
  const addLoginUser=async (logindetails)=>{
    let headers={
      method:"POST",
      body:JSON.stringify(logindetails),
      headers:{
        "content-type":"application/json"
      },
    };
    let resp=await fetch("https://juke-stream-server-side.onrender.com/User/login",headers);
    let result=await resp.json();
    console.log(result)
    if(result.Status=== "sucessfull"){
      localStorage.setItem("auth",true)
      sucessnotify()
      setTimeout(()=>{
        navigate('/')}, 5000)
        localStorage.setItem('auth','true')
    }
    else if(result.Status==="Failure"){
      incorrectpassword()
      setLoginDetails("")
    }
  }

  const sucessnotify = () =>toast.success("Login Successfully", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });

  const incorrectpassword=()=>toast.error('incorrectpassword!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  return (
    <div className={style ? "login_container":"close_login_container"}>
      <form className="login_form" onSubmit={handleSubmit}>
        <p className="login">Login</p>
        <label className="login_label">
          <span>{error.email}</span>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="login_input"
            onChange={handleChange}
          />
        </label>
        <label className="login_label">
          <span>{error.password}</span>
          <input
            type="text"
            placeholder="Password"
            name="password"
            className="login_input"
            onChange={handleChange}
          />
        </label>
        <button className="login-btn" >
          Submit<BiSolidLogIn/>
        </button>
        <p className="login_note">
          Forget Password ? <Link to="/register"><span className="link">Resgister</span></Link>
        </p>
      </form>
      <ToastContainer />
    </div> 
  );
}

export default Login;
