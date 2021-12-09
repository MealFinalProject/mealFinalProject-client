import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "../Signup/Signup";
import * as PATHS from "../../utils/paths";
import * as USER_HELPERS from "../../utils/userToken";

import { Link } from 'react-router-dom'
import axios from "axios";

import './Login.css'

import {Image} from 'cloudinary-react'

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
    });
  }

  const [imageSelected, setImageSelected] = useState('')

  const uploadImage = () => {
    const formData = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset", `${process.env.CLOUD_NAME}`)

    axios.post("https://api.cloudinary.com/v1_1/djosvkjof/image/upload", 
    formData).then((response)=>{
      console.log(response)
    })
  }
  return (
    // <div>
    //   <h1>Log In</h1>
      // <form onSubmit={handleFormSubmission} className="signup__form">
        // <label htmlFor="input-username">Username</label>
    //     <input
    //       id="input-username"
    //       type="text"
    //       name="username"
    //       placeholder="username"
    //       value={username}
    //       onChange={handleInputChange}
    //       required
    //     />

    //     <label htmlFor="input-password">Password</label>
    //     <input
    //       id="input-password"
    //       type="password"
    //       name="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={handleInputChange}
    //       required
    //       minLength="8"
    //     />

    //     {error && (
    //       <div className="error-block">
    //         <p>There was an error submiting the form:</p>
    //         <p>{error.message}</p>
    //       </div>
    //     )}

    //     <button className="button__submit" type="submit">
    //       Submit
    //     </button>
    //   </form>
    // </div>
       <div className="mt-5 Login container d-flex justify-content-center">
        <div className="col-md-5 mx-auto">
            <div className="myform form">
                <div className="mb-3">
                {/* <Image cloudName={`${process.env.CLOUD_NAME}`} publicId="https://res.cloudinary.com/djosvkjof/image/upload/v1639083883/murfji0pdx9prygfoh99.png"/> */}
                </div>
                <form onSubmit={handleFormSubmission} className="mb-2 Login" >
                    <div className="form-group mb-3">
                        <input className="form-control input-username" type="text" name="username" placeholder="Username" value={username} onChange={handleInputChange} required />
                        <input className="form-control input-password" type="password" name="password" placeholder="Password"  value={password} onChange={handleInputChange} required minLength="8" />
                        <p>Forgot password?</p>
                    </div>
                    <div className="d-flex flex-column ">
                      <input id="input-files" type="file" onChange={(event)=>{setImageSelected(event.target.files[0])}} />
                      <button className=" btn btn-block mybtn bg-color-purple tx-tfm mb-4 mt-4"  onClick={uploadImage}>Upload image</button>
                    </div>
                    <div className="col-md-12 text-center">
                        <button type="submit" className=" btn btn-block mybtn bg-color tx-tfm">Login</button>
                    </div>
                </form>
                <div className="col-md-12 mb-2">
                        <div className="login-or ">
                            <hr className="hr-or" />
                            <span className="span-or d-flex justify-content-center">or</span>
                        </div>
                </div>
                <div className="col-md-12 mb-3 text-center mb-4">
                    <form id="demo" onSubmit={handleFormSubmission}>
                        <input className="form-control" type="hidden" name="username" value="emperorpenguin" onChange={handleInputChange}/>               
                        <input className="form-control" type="hidden" name="password" value="12345678" onChange={handleInputChange}/>
                        <button form="demo" className="col-11 btn active bg-color" type="submit">Try demo</button>
                    </form>
                </div>
                <div className="form-group">
                    <p className="text-center mb-0">Don't an have account? <Link className="text-decoration-none color-text" to={PATHS.SIGNUPPAGE} >Sign up here</Link></p>
                </div>
              </div>
          </div>
          </div>
   
  );
}

