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
      <div className="row p-0 m-0 container-fluid justify-content-center mt-xl-5 align-items-center">
        <div className="col-12 mt-3 p-0 mb-3 text-center">
          <div className="h1"><i className="bi bi-egg-fried"></i><span className=" prueba-color">  Project-Meal </span></div>
        </div>
        <div className="col-12 p-0 d-flex justify-content-center mt-xl-3">
            <form onSubmit={handleFormSubmission} className="col-12 col-xl-4 mb-2 Login border rounded py-3 shadow-lg" >
              <div className="form-group mb-3 col-12">
                <p className="font-weight-bold">Enter Username:</p>
                <input id="username-input" onClick={() => setErrorMessage(null)} className="form-control" type="text" name="username" placeholder="Username"value={username} onChange={handleInputChange} required />
              </div>
              <div className="form-group mb-3 col-12">
                <p className="font-weight-bold">Enter Password:</p>
                <div className="d-flex align-items-center">
                  <div className="input-group">
                    <input id="password-input" onClick={() => setErrorMessage(null)} className="form-control signup-eye-input" type={passwordType} name="password" placeholder="Password"  value={password} onChange={handleInputChange} required minLength="8" />
                    <span className="input-group-text signup-eye">
                      {passwordShow ? <i onClick={() => showPassword()} className="far fa-eye"></i> 
                        :  <i onClick={() => showPassword()} className="far fa-eye-slash"></i>}
                    </span>
                  </div>
                </div>
               {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
              </div>
              <div className="form-group col-12 text-center mt-4">
                  <button type="submit" className=" btn btn-block mybtn bg-color tx-tfm">Sign up</button>
              </div>
              <div className="form-group col-12">
                <p className="text-center font-weight-bold mt-5">Already have an account? <Link className="text-decoration-none font-weight-bold color-text" to={PATHS.LOGINPAGE} >Log in</Link></p>
              </div>
            </form>
        </div>
      </div>
    </>
  );
}
