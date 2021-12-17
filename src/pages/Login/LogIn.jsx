import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";

import "../Signup/Signup";

import * as PATHS from "../../utils/paths";
import * as USER_HELPERS from "../../utils/userToken";

import { Link } from 'react-router-dom'

import './Login.css'



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
  
  const [errorMessage, setErrorMessage] = useState()

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };
    login(credentials).then((res) => {
      if(res.errorMessage && res.errorMessage !== 'Internal server error. Please check your server'){
        setErrorMessage(res.errorMessage)
      }
      
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
        
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOMEPAGE);
      
    })
  }

 
  return (
    <>
      <div className="row p-0 m-0 container-fluid justify-content-center mt-xl-5">
        <div className="col-12 col-xl-6 p-0 mb-3 text-end">
          <img id="login-image" src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80" alt="Log in"/>
        </div>
        <div className="col-12 col-xl-6 p-0 justify-content-start mt-xl-5">
          <form onSubmit={handleFormSubmission} className="col-12 col-xl-6 mb-2 Login" >
            <div className="col-12 form-group mb-2">
                <input onClick={() => setErrorMessage(null)} className="form-control input-username" type="text" name="username" placeholder="Username" value={username} onChange={handleInputChange} required />
                <input onClick={() => setErrorMessage(null)} className="form-control input-password" type="password" name="password" placeholder="Password"  value={password} onChange={handleInputChange} required minLength="8" />
                <p>Forgot password?</p>
                {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
            </div>
            <div className="form-group col-12 text-center mt-4">
              <button type="submit" className=" btn btn-block mybtn bg-color tx-tfm">Login</button>
            </div>
          </form>
          <div className="col-12 col-xl-6 mb-2">
            <div className="login-or">
                <hr className="hr-or"/>
                <span className="span-or d-flex justify-content-center">or</span>
            </div>
          </div>
          <form id="demo" className="col-12 col-xl-6 mb-2 Login" onSubmit={handleFormSubmission}>
            <div className="col-12 mb-2 mb-2">
                <input className="form-control" type="hidden" name="username" />               
                <input className="form-control" type="hidden" name="password" />
                <button form="demo" className="col-12 btn active bg-color" type="submit" 
                onClick={() => {
                  setForm({username: "emperorpenguin", password: "12345678" })
                }}>Try demo</button>
            </div>
            <div className="form-group col-12">
              <p className="text-center mb-0">Don't an have account? <Link className="text-decoration-none color-text" to={PATHS.SIGNUPPAGE} >Sign up here</Link></p>
            </div>
          </form>
        </div>
      </div>
      
      
      {/* <div className="row p-0 m-0 container-fluid justify-content-center mt-xl-5">
        <div className="col-12 col-xl-6 p-0 text-end">
          <img id="login-image" src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80" alt="Log in"/>
        </div>
        <div className="col-12 col-xl-6 p-0 justify-content-start mt-xl-3">
          <div className="mt-5 Login">
            <div className="col-md-5 mx-auto">
              <div className="myform form">
                <form onSubmit={handleFormSubmission} className="mb-2 Login" >
                  <div className="form-group mb-2">
                      <input onClick={() => setErrorMessage(null)} className="form-control input-username" type="text" name="username" placeholder="Username" value={username} onChange={handleInputChange} required />
                      <input onClick={() => setErrorMessage(null)} className="form-control input-password" type="password" name="password" placeholder="Password"  value={password} onChange={handleInputChange} required minLength="8" />
                      <p>Forgot password?</p>
                      {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
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
                  <div className="col-md-12 mb-2 text-center mb-2">
                      <form id="demo" onSubmit={handleFormSubmission}>
                          <input className="form-control" type="hidden" name="username" />               
                          <input className="form-control" type="hidden" name="password" />
                          <button form="demo" className="col-11 btn active bg-color" type="submit" 
                          onClick={() => {
                            setForm({username: "emperorpenguin", password: "12345678" })
                          }}>Try demo</button>
                      </form>
                  </div>
                  <div className="form-group">
                      <p className="text-center mb-0">Don't an have account? <Link className="text-decoration-none color-text" to={PATHS.SIGNUPPAGE} >Sign up here</Link></p>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="d-flex flex-column align-items-center">
      </div> */}
      

    </>
   
  );
}

