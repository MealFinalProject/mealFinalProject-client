import React from "react";
import { useEffect, useState } from "react";

import * as PATHS from "../../utils/paths";

import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

import "./ProfilePage.css";
import axios from "axios";

const ProfilePage = (props) => {
  const { user } = props;
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
      <div id="container-profile-image">
        <Image
          id="profile-image"
          cloudName={`${process.env.CLOUD_NAME}`}
          publicId={`https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/${user.avatar_url} .jpg`}
        />
      </div>
      <div className="d-flex flex-column align-items-center mt-5">
        <Link to={PATHS.UPDATEPROFILEINFO}>
          <div className="profile-card mt-4">
            <p>
              <i className="fas fa-user mr-3"></i>User information
            </p>
          </div>
        </Link>
        <Link to="">
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
