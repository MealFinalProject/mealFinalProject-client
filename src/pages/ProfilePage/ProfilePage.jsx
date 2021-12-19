import React from "react";
import { useEffect, useState } from "react";

import "./ProfilePage.css";

import Navbar     from "../../components/Navbar/Navbar";
import UserIcons  from "../../components/UserIcons/UserIcons";
import LoadingComponent from "../../components/Loading";

import * as PATHS from "../../utils/paths";

import { Image }  from "cloudinary-react";
import { Link }   from "react-router-dom";


import axios from "axios";
import UserIconsCol from "../../components/UserIconsCol/UserIconsCol";

const ProfilePage = (props) => {
  const { user, handleLogout, profileImageState } = props;
  const [userFromDB, setUserFromDB] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/profile`, {
        headers: {
          id: user._id,
        },
      })
      .then((response) => {
        setUserFromDB(response.data);
        setIsLoading(false)
      });
  }, []);

  if (userFromDB) console.log("fuera del effect ", userFromDB);
  
  return (
    <>
      <Navbar
        handleLogout={handleLogout}
        user={user}
        profileImageState={profileImageState}
      />
       {isLoading ? <LoadingComponent /> :
        userFromDB && (
        <div className="ProfilePage container-fluid row p-0 m-0 text-center justify-content-center">
          <div className="col-12 p-0 mb-3 col-xl-4">
            {userFromDB.avatar_url ? 
                <Image
                    className="img-fluid"
                    cloudName={`${process.env.REACT_APP_CLOUD_NAME}`}
                    publicId={`https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/${userFromDB.avatar_url} .jpg`}
                /> :
                <img className="img-fluid" src="https://ibalz.com/wp-content/uploads/2019/10/default-profile.png" alt="Default avatar" />   
            }
          </div>
          <div className="col-12 mb-3">
              <p className="h4">
                Welcome <span>{userFromDB.username}</span>
              </p>
          </div>
          <div className="col-12 mb-3">
            <UserIconsCol userFromDB={userFromDB}/>
          </div>
          <div className="col-12 col-xl-5">
            <div className="row justify-content-center"> 
              <div className="col-10 mb-2">
                <Link to={PATHS.UPDATEPROFILEINFO}>
                  <div className="profile-card">
                    <p>
                      <i className="fas fa-user mr-3"></i>Update User
                    </p>
                  </div>
                </Link>
              </div>
              <div className="col-10 mb-2">
                <Link to={`/profile/my-recipes/${user._id}`}>
                  <div className="profile-card">
                    <p>
                      <i className="fas fa-utensils mr-3"></i>My recipes
                    </p>
                  </div>
                </Link>
              </div>
              <div className="col-10 mb-2">
                <Link to={PATHS.SEARCHUSERS} data-toggle="modal" data-target="#exampleModal">
                  <div className="profile-card">
                    <p>
                      <i className="fas fa-users mr-2"></i>Follow users
                    </p>
                  </div>
                </Link>
              </div>  
            </div>
          </div>
        </div>
          )
       }
    </>
  );
};

export default ProfilePage;
