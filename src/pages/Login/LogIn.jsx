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

  const [passwordType, setPasswordType] = useState('password')
  const [passwordShow, setPasswordShow] = useState(false)

  const showPassword = () => {
    if(passwordType === 'password') {
      setPasswordType('text')
      setPasswordShow(true)
    }else {
      setPasswordType('password')
      setPasswordShow(false)
    }
    
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
                <input onClick={() => setErrorMessage(null)} className="form-control input-username{" type="text" name="username" placeholder="Username" value={username} onChange={handleInputChange} required />
                <div className="input-group">
                  <input onClick={() => setErrorMessage(null)} className="form-control login-eye-input" type={passwordType} name="password" placeholder="Password"  value={password} onChange={handleInputChange} required minLength="8" />
                  <span className="input-group-text login-eye">
                    {passwordShow ? <i onClick={() => showPassword()} className="far fa-eye"></i> 
                      :  <i onClick={() => showPassword()} className="far fa-eye-slash"></i>}
                  </span>
                </div>
                <p>Forgot password?</p>
                {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
            </div>
            <div className="form-group col-12 mt-4">
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
    </>
  );
}

