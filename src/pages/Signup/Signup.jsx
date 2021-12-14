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
    <div className="container d-flex flex-column justify-content-center">
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
    </div>
  );
}
