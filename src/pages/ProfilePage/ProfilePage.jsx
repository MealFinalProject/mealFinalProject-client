import React from "react";
import { useEffect, useState } from "react";

import "./ProfilePage.css";

import Navbar     from "../../components/Navbar/Navbar";
import UserIcons  from "../../components/UserIcons/UserIcons";

import * as PATHS from "../../utils/paths";

import { Image }  from "cloudinary-react";
import { Link }   from "react-router-dom";


import axios from "axios";

const ProfilePage = (props) => {
  const { user, handleLogout, profileImageState } = props;
  const [userFromDB, setUserFromDB] = useState("");

  

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/profile`, {
        headers: {
          id: user._id,
        },
      })
      .then((response) => {
        setUserFromDB(response.data);
      });
  }, []);

  if (userFromDB) console.log("fuera del effect ", userFromDB);
  
  return (
    <div className="ProfilePage">
      <Navbar
        handleLogout={handleLogout}
        user={user}
        profileImageState={profileImageState}
      />

      {user && user.avatar_url && (
        <div id="container-profile-image">
          <Image
            id="profile-image"
            cloudName={`${process.env.REACT_APP_CLOUD_NAME}`}
            publicId={`https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/${user.avatar_url} .jpg`}
          />
        </div>
      )}
      {userFromDB && (
        <>
          <div className="">
          <UserIcons userFromDB={userFromDB}/>
            <p className="font-weight-bold text-center welcome-user">
              Welcome <span>{user.username}</span>
            </p>

            </div>
        </>
      )}

      <div className="d-flex flex-column align-items-center">
        <Link to={PATHS.UPDATEPROFILEINFO}>
          <div className="profile-card mt-4">
            <p>
              <i className="fas fa-user mr-3"></i>Update User
            </p>
          </div>
        </Link>
        <Link to={`/profile/my-recipes/${user._id}`}>
          <div className="profile-card mt-4">
            <p>
              <i className="fas fa-utensils mr-3"></i>My recipes
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
