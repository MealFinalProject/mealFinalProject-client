import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

import {Image} from 'cloudinary-react'

const Navbar = (props) => {
  return (
    // <nav>
    //   <Link to={PATHS.HOMEPAGE} className="nav__projectName">
    //     Project!
    //   </Link>

    //   <div className="nav__authLinks">
    //     {props.user ? (
    //       <>
    //         <Link to={PATHS.PROTECTEDPAGE} className="authLink">
    //           Protected Page
    //         </Link>
    //         <button className="nav-logoutbtn" onClick={props.handleLogout}>
    //           Logout
    //         </button>
    //       </>
    //     ) : (
    //       <>
    //         <Link to={PATHS.SIGNUPPAGE} className="authLink">
    //           Signup
    //         </Link>
    //         <Link to={PATHS.LOGINPAGE} className="authLink">
    //           Log In
    //         </Link>
    //       </>
    //     )}
    //   </div>
    // </nav>
    <nav className="navbar navbar-expand-lg navbar-light color-principal">
    {props.user &&
    <Image 
      className="rounded-circle z-depth-0 mr-3"
            alt="avatar image"
      id="avatar-image" 
      cloudName={`${process.env.CLOUD_NAME}`} 
      publicId="https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/gtvhjeygsyoyeqgrfgmj.jpg"
      />
    }
      <Link to={PATHS.HOMEPAGE} className="navbar-brand font-weight-bold text-white">Project-Meal</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item active">
          <Link to={PATHS.HOMEPAGE} className="nav-link text-white font-weight-bold">Home </Link>
          </li>
          <li className="nav-item">
          <Link to='' className="nav-link text-white font-weight-bold">Supermarket</Link>
          </li>
          {props.user ? (                                            
          <li className="nav-item dropdown">
              <Link to="" className="nav-link dropdown-toggle text-white font-weight-bold" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                My profile
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to={PATHS.PROFILEPAGE} className="dropdown-item " >My page</Link>
                <Link to="" className="dropdown-item " >My recipes</Link>
                <div className="dropdown-divider"></div>
                <Link to="" className="dropdown-item " >My friends?</Link>
                <button className="dropdown-item " onClick={props.handleLogout}>
                 Logout
                </button>              
              </div>
          </li>
          ) : (
              <li className="nav-item">
                <Link to={PATHS.LOGINPAGE} className="nav-link text-white font-weight-bold">Log In</Link>
              </li>           
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
