import React, { useState } from "react";
import { signup } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Signup.css"

import * as PATHS from "../../utils/paths";
import * as USER_HELPERS from "../../utils/userToken";


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

  const [errorMessage, setErrorMessage] = useState()

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
    };
   
    signup(credentials).then((res) => {
      if(res.errorMessage && res.errorMessage !== 'Internal server error. Please check your server'){
        setErrorMessage(res.errorMessage)
      }
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
 

  return (
    <>
      <div className="row p-0 m-0 container-fluid justify-content-center mt-xl-5">
        <div className="col-12 col-xl-6 p-0 mb-3 text-end">
          <img id="login-image" src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80" alt="Log in"/>
        </div>
        <div className="col-12 col-xl-6 p-0 justify-content-start mt-xl-3">
            <form onSubmit={handleFormSubmission} className="col-12 col-xl-6 mb-2 Login" >
              <div className="form-group mb-3 col-12">
                <p className="font-weight-bold">Enter Username:</p>
                <input onClick={() => setErrorMessage(null)} className="form-control" type="text" name="username" placeholder="Username"value={username} onChange={handleInputChange} required />
              </div>
              <div className="form-group mb-3 col-12">
                <p className="font-weight-bold">Enter Password:</p>
                <input onClick={() => setErrorMessage(null)} className="form-control mb-2" type="password" name="password" placeholder="Password"  value={password} onChange={handleInputChange} required minLength="8" />
              </div>
              <div className="form-group col-12 text-center mt-4">
                  <button type="submit" className=" btn btn-block mybtn bg-color tx-tfm">Sign up</button>
              </div>
              <div className="form-group col-12">
                <p className="text-center font-weight-bold mt-5">Already have an account? <Link className="text-decoration-none font-weight-bold color-log-in" to={PATHS.LOGINPAGE} >Log in</Link></p>
              </div>
            </form>
        </div>
      </div>
      {/* <div className="container d-flex flex-column justify-content-center">
        <h1 className="text-center m-5">Project Meal</h1>
        <div className="Sign-up d-flex justify-content-center align-items-center">
        <form onSubmit={handleFormSubmission} className="mb-2 Login" >
                  <div className="form-group mb-3">
                      <p className="font-weight-bold text-white">Enter Username:</p>
                      <input onClick={() => setErrorMessage(null)} className="form-control" type="text" name="username" placeholder="Username"value={username} onChange={handleInputChange} required />
                  </div>
                  <div>
                      <p className="font-weight-bold text-white">Enter Password:</p>
                      <input onClick={() => setErrorMessage(null)} className="form-control mb-2" type="password" name="password" placeholder="Password"  value={password} onChange={handleInputChange} required minLength="8" />
                      
                  </div>

                  <div className="col-md-12 text-center mt-4">
                      <button type="submit" className=" btn btn-block mybtn bg-color tx-tfm">Sign up</button>
                  </div>
                  <div>
                  <p className="text-center text-white font-weight-bold mt-5">Already have an account? <Link className="text-decoration-none font-weight-bold color-log-in" to={PATHS.LOGINPAGE} >Log in</Link></p>
                  </div>
              </form>
        </div>
        {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
      </div> */}
    </>
  );
}
