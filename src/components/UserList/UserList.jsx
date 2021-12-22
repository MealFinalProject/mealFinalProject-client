import axios from "axios";

import './UserList.css'

import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";

import BackButton from "../BackButton/BackButton"

const UserList = ({ list, title, user, setUser }) => {
  const API_URL = `${process.env.REACT_APP_SERVER_URL}`;

  const followUser = (event, userId) => {
    event.preventDefault();
    axios
      .put(API_URL + `/users/follow/${userId}`, {
        data: {
          userInSessionId: user._id,
        },
      })
      .then((response) => {
        setUser(response.data.userInSession);
      });
  };

  const unFollowUser = (event, userId) => {
    event.preventDefault();
    axios
      .put(API_URL + `/users/unfollow/${userId}`, {
        data: {
          userInSessionId: user._id,
        },
      })
      .then((response) => {
        setUser(response.data.userInSession);
      });
  };

  return (
    <div className="row m-0 p-0 text-center UserList">
      {title && (
        <div className="col-12 mt-4">
          <div className="row m-0 p-0 align-items-center text-start">
            <div className="col-4 col-xl-5 ">
              <BackButton />
            </div>
            <div className="col-8 col-xl-7">
              <p className="h3">{title}</p>
            </div>
          </div>
          <hr />
        </div>
      )}
      <div className="col-12">
        {list.length > 0 &&
          list.map((userFromList) => {
            return (
              <div key={`${userFromList._id}_div`} className="col-12 mt-2">
                <div className="row m-0 p-0 align-items-center text-start">
                  <div className="col-3 text-center">
                    {userFromList.avatar_url ? (
                      <Image
                        key={userFromList.avatar_url}
                        className="rounded-circle z-depth-0 mr-3"
                        alt="avatar image"
                        id="avatar-image"
                        cloudName={`${process.env.REACT_APP_CLOUD_NAME}`}
                        publicId={`https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/${userFromList.avatar_url}.jpg`}
                      />
                    ) : (
                      <img
                        className="rounded-circle z-depth-0 mr-3"
                        id="avatar-image"
                        src="https://ibalz.com/wp-content/uploads/2019/10/default-profile.png"
                        alt="Default avatar"
                      />
                    )}
                  </div>
                  <div className="col-5">
                    <Link
                      key={userFromList._id}
                      to={`/user/${userFromList._id}`}
                    >
                      <p className="m-0 text-dark">{userFromList.username}</p>
                    </Link>
                  </div>
                  <div className="col-4 text-end">
                    {(user._id !== userFromList._id) && (user.followed.includes(userFromList._id) ? (
                      <button
                        onClick={(event) => {
                          unFollowUser(event, userFromList._id);
                        }}
                        className="btn button-unfollow"
                      >
                        <i className="fas fa-user-minus"></i>
                      </button>
                    ) : (
                      <button
                        onClick={(event) => {
                          followUser(event, userFromList._id);
                        }}
                        className="btn button-follow"
                      >
                        <i className="fas fa-user-plus"></i>
                      </button>
                    ))}
                  </div>
                  <div className="col-12">
                    <hr />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserList;
