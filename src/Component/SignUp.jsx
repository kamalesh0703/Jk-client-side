import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector} from 'react-redux';
function SignUp() {
  const navigate = useNavigate();
  const initalvalues = { name: "", email: "", password: "" };
  const [formvalues, setFormvalues] = useState(initalvalues);
  const [formErrors, setFormErrors] = useState({});
  const [style,setStyle]=useState(false)

  const user = useSelector((state) => state.user.value);
  useEffect(()=>{
    if(user.urllink === ""){
      sd()
    }
    else{
      dfdsf()
    }
  })
  const sd=()=>{
    setStyle(true)
  }
const dfdsf=()=>{
  setStyle(false)

}
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formvalues));
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is Required!";
    }
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!validator.isEmail(values.email)) {
      errors.email = "Email Invalid!";
    }
    if (!values.password) {
      errors.password = "password is required!";
    } else if (!validator.isStrongPassword(values.password)) {
      errors.password = "Password is Invaild";
    } else {
      AddUser(formvalues);
    }
    return errors;
  };

  const errornotify = () =>
    toast.error("Already register this email please login!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const sucessnotify = () =>
    toast.success("Register Sucessfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const AddUser = async (formvalues) => {
    let headers = {
      method: "POST",
      body: JSON.stringify(formvalues),
      headers: {
        "content-type": "application/json",
      },
    };
    let resp = await fetch("https://juke-stream-server-side.onrender.com/User/resgister", headers);
    let result = await resp.json();
    console.log(result);
    if (result.Status === "Failure") {
      errornotify();
      setFormvalues(initalvalues);
    } else {
      sucessnotify();
      setFormvalues(initalvalues);
      setTimeout(()=>{
      navigate('/login')}, 3000)
    }
  };
  return (
    <div className={style ? "signup_container":"close_signup_container"}>
      <form className="signup_form">
        <p className="register">Register</p>
        <label className="signup_label">
          <span>{formErrors.name}</span>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formvalues.name}
            className="signup_input"
            onChange={handleChange}
          />
        </label>
        <label className="signup_label">
          <span>{formErrors.email}</span>
          <input
            type="email"
            placeholder="email@gmail.com"
            name="email"
            value={formvalues.email}
            className="signup_input"
            onChange={handleChange}
          />
        </label>
        <label className="signup_label">
          <span>{formErrors.password}</span>
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={formvalues.password}
            className="signup_input"
            onChange={handleChange}
          />
        </label>
        <button className="register-btn" onClick={handleSubmit}>
          Submit
        </button>
        <p className="signup_note">
          already have an account? <Link to="/login"><span className="link">Login</span></Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
