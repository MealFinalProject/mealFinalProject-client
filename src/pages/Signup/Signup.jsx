import React, { useState } from "react";
import { signup } from "../../services/auth";
import { useNavigate } from "react-router-dom";

import "./Signup.css"

import axios from "axios";

import * as PATHS from "../../utils/paths";
import * as USER_HELPERS from "../../utils/userToken";

import {Image} from 'cloudinary-react'

export default function Signup({ authenticate }) {
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
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful! Please check the console.",
        });
      }
      // successful signup
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
    //   <h1>Sign Up</h1>
    //   <form onSubmit={handleFormSubmission} className="auth__form">
    //     <label htmlFor="input-username">Username</label>
    //     <input
    //       id="input-username"
    //       type="text"
    //       name="username"
    //       placeholder="Text"
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
    <div className="container ">
      <div className="Sign-up d-flex justify-content-center align-items-center">
      <form onSubmit={handleFormSubmission} className="mb-2 Login" >
                <div className="form-group mb-3">
                    <p className="font-weight-bold">Enter Username:</p>
                    <input className="form-control" type="text" name="username" placeholder="Username"value={username} onChange={handleInputChange} required />
                </div>
                <div>
                    <p className="font-weight-bold">Enter Password:</p>
                    <input className="form-control mb-2" type="password" name="password" placeholder="Password"  value={password} onChange={handleInputChange} required minLength="8" />
                    <input id="input-files" type="file" onChange={(event)=>{setImageSelected(event.target.files[0])}} />
                    <button className=" btn btn-block mybtn bg-color-purple tx-tfm mb-2 mt-4"  onClick={uploadImage}>Upload image</button>
                </div>
                {/* <Image cloudName={`${process.env.CLOUD_NAME}`} publicId="https://res.cloudinary.com/djosvkjof/image/upload/v1639083883/murfji0pdx9prygfoh99.png"/> */}
                    
                    
                <div className="col-md-12 text-center mt-4">
                    <button type="submit" className=" btn btn-block mybtn bg-color tx-tfm">Sign up</button>
                </div>
            </form>
      </div>
    
    </div>
  );
}
