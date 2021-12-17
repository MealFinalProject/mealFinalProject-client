import React from "react";
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";

import * as PATHS from "../../utils/paths";

import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

import "./ProfilePage.css";
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

  const commentsMsg = () => {
    if(userFromDB.comments.length < 1)   return "Don't have comments"
    if(userFromDB.comments.length === 1) return 'You have 1 comment'
    if(userFromDB.comments.length > 1)   return `You have ${userFromDB.comments.length} comments`
  }

  const favsRecipesMsg = () => {
    if(userFromDB.favs_recipes.length < 1)   return "Don't have favourite recipes"
    if(userFromDB.favs_recipes.length === 1) return 'You have 1 favourite recipe'
    if(userFromDB.favs_recipes.length > 1)   return `You have ${userFromDB.favs_recipes.length} favourite recipes`
  }
  
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
          <div className="x">
            <p className="font-weight-bold text-center welcome-user">
              Welcome <span>{user.username}</span>
            </p>
            <div className="d-flex justify-content-center">
              <div
                className="accordion accordion-flush mt-5"
                id="accordionFlushExample"
              >
                <div className="accordion-item">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      My info
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <>
                        <p>{commentsMsg()}</p> <hr />
                        <p>{favsRecipesMsg()}</p>
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
