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
    <div className="d-flex flex-column align-items-center">
      <img
        id="login-image"
        src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80"
      />
      <div className="mt-5 Login container d-flex justify-content-center">
        <div className="col-md-5 mx-auto">
          <div className="myform form">
            <div className=""></div>
            <form onSubmit={handleFormSubmission} className="mb-2 Login">
              <div className="form-group mb-2">
           
                <input
                  onClick={() => setErrorMessage(null)}
                  className="form-control input-username"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleInputChange}
                  required
                />
           
                
                <div className="d-flex align-items-center">
                  <input
                  id="password"
                  onClick={() => setErrorMessage(null)}
                  className="form-control input-password"
                  type={passwordType}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleInputChange}
                  required
                  minLength="8"
                  
                />
              {passwordShow ? <i onClick={() => showPassword()} className="far fa-eye"></i> 
              :  <i onClick={() => showPassword()} className="far fa-eye-slash"></i>}

                </div>
                
                
                <p>Forgot password?</p>
                {errorMessage && (
                  <p className="text-center text-danger">{errorMessage}</p>
                )}
              </div>

              <div className="col-md-12 text-center">
                <button
                  type="submit"
                  className=" btn btn-block mybtn bg-color tx-tfm"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="col-md-12 mb-2">
              <div className="login-or ">
                <hr className="hr-or" />
                <span className="span-or d-flex justify-content-center">
                  or
                </span>
              </div>
            </div>
            <div className="col-md-12 mb-2 text-center mb-2">
              <form id="demo" onSubmit={handleFormSubmission}>
                <input className="form-control" type="hidden" name="username" />
                <input className="form-control" type="hidden" name="password" />
                <button
                  form="demo"
                  className="col-11 btn active bg-color"
                  type="submit"
                  onClick={() => {
                    setForm({
                      username: "emperorpenguin",
                      password: "12345678",
                    });
                  }}
                >
                  Try demo
                </button>
              </form>
            </div>
            <div className="form-group">
              <p className="text-center mb-0">
                Don't an have account?{" "}
                <Link
                  className="text-decoration-none color-text"
                  to={PATHS.SIGNUPPAGE}
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

