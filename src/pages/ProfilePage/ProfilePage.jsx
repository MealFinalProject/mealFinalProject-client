import React from "react";

import * as PATHS from "../../utils/paths";

import {Image} from 'cloudinary-react'
import { Link } from "react-router-dom";

import './ProfilePage.css'

const ProfilePage = (props) => {

  return (
    <div className="ProfilePage">
    <div id="container-profile-image">
      <Image id="profile-image" cloudName={`${process.env.CLOUD_NAME}`} publicId="https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/gtvhjeygsyoyeqgrfgmj.jpg"/>
    </div>
    <div className="d-flex flex-column align-items-center mt-5">
    <Link to={PATHS.UPDATEPROFILEINFO}>
      <div  className="profile-card mt-4">
        <p><i className="fas fa-user mr-3"></i>User information</p>
      </div> 
    </Link>
    <Link to="">
      <div  className="profile-card mt-4">
        <p><i className="fas fa-utensils mr-3"></i>My recipes</p>
      </div> 
    </Link>
    </div>   
    </div>
  );
};

export default ProfilePage;
