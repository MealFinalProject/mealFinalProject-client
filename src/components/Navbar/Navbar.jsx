import React from "react";

import { NavLink } from "react-router-dom";
import {Image} from 'cloudinary-react';

import "./Navbar.css";

import * as PATHS from "../../utils/paths";




const Navbar = (props) => {
  
  const activeStyle   = { color: 'rgb(175, 160, 252)'}
  const noActiveWhite = { color: 'white' }
  const noActiveBlack = { color: 'black' }

  const { user } = props

  return (
    <nav className="navbar navbar-expand-lg navbar-light color-principal fixed-top">
    {user && user.avatar_url &&
    <Image 
      className="rounded-circle z-depth-0 mr-3"
            alt="avatar image"
      id="avatar-image" 
      cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
      publicId={`https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/${user.avatar_url}.jpg`}
      />
    }
      <NavLink to={PATHS.HOMEPAGE}  className="navbar-brand font-weight-bold text-white">Project-Meal</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item active">
          <NavLink to={PATHS.HOMEPAGE} style={({ isActive }) => isActive ? activeStyle : noActiveWhite } className="nav-link font-weight-bold">Home </NavLink>
          </li>
          {props.user ? (                                            
          <li className="nav-item dropdown">
              <NavLink  to="" className="nav-link dropdown-toggle text-white font-weight-bold" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                My profile
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink to={PATHS.PROFILEPAGE} style={({ isActive }) => isActive ? activeStyle : noActiveBlack} className="dropdown-item " >My page</NavLink>
                <NavLink to={`/profile/my-recipes/${user._id}`} style={({ isActive }) => isActive ? activeStyle : noActiveBlack} className="dropdown-item" >My recipes</NavLink>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item " onClick={props.handleLogout}>
                <NavLink className="text-black" to={PATHS.HOMEPAGE}>
                   Logout
                </NavLink>
                </button>              
              </div>
          </li>
          ) : (
              <li className="nav-item">
                <NavLink to={PATHS.LOGINPAGE} className="nav-link text-white font-weight-bold">Log In</NavLink>
              </li>           
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
