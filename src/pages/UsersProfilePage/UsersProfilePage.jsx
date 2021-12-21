import React from "react";
import { useEffect, useState } from "react";

import "./UsersProfilePage.css";

import UserIconsCol  from "../../components/UserIconsCol/UserIconsCol";
import LoadingComponent from "../../components/Loading";

import { Image }  from "cloudinary-react";
import { useParams }   from "react-router-dom";


import axios from "axios";
import FavsRecipeList from "../../components/FavsRecipeList/FavsRecipeList";

const UsersProfilePage = () => {
    const {id} = useParams()
    const [targetedUser, setTargetedUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/user/${id}`)
          .then((response) => {
            setTargetedUser(response.data);
            setIsLoading(false)
          });
      }, [id]);

  return (
      <>
        {isLoading ? <LoadingComponent /> : 
        <div className="row p-0 m-0 text-center justify-content-xl-center UsersProfilePage">
            <div className="col-12 p-0 mb-2 col-xl-4">
                {targetedUser.avatar_url ? 
                    <Image
                        className="img-fluid"
                        cloudName={`${process.env.REACT_APP_CLOUD_NAME}`}
                        publicId={`https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/${targetedUser.avatar_url} .jpg`}
                    /> :
                    <img className="img-fluid" src="https://ibalz.com/wp-content/uploads/2019/10/default-profile.png" alt="Default avatar" />
                }
            </div>
            <div className="col-12 mb-2">
                <p className="h2">{targetedUser.username}</p>
            </div>
            <div className="col-12 mb-2">
                <UserIconsCol userFromDB={targetedUser} />
            </div>
            <div className="col-12 mb-2">
                {targetedUser.favs_recipes && <FavsRecipeList favsList={targetedUser.favs_recipes} />}
            </div>
        </div>
        }
      </>
  );
};

export default UsersProfilePage;
