import React from "react";
import { useEffect, useState } from "react";

import "./UsersProfilePage.css";

import Navbar     from "../../components/Navbar/Navbar";
import UserIconsCol  from "../../components/UserIconsCol/UserIconsCol";
import LoadingComponent from "../../components/Loading";
import Category from '../../components/Category/Category'

import { Image }  from "cloudinary-react";
import { Link, useParams }   from "react-router-dom";


import axios from "axios";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

const UsersProfilePage = (props) => {
    const { user, handleLogout, profileImageState } = props;
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
        <Navbar
            handleLogout={handleLogout}
            user={user}
            profileImageState={profileImageState}
        />
        {isLoading ? <LoadingComponent /> : 
        <div className="container-fluid row p-0 m-0 text-center justify-content-xl-center">
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
                <p className="h4">Favorite recipes</p>
                <hr/>
                <div className="row p-0 m-0">
                        {targetedUser.favs_recipes && targetedUser.favs_recipes.map((element) => {
                            return (
                                <div key={element.idApi} className="col-6 col-xl-2 px-4 mb-4">
                                    <Link  to={`/search/${element.idApi}`}>
                                        {/* <Category
                                        key={element.idApi}
                                        text={element.name}
                                        img={element.photo}
                                        /> */}
                                        <CategoryCard
                                        key={element.idApi}
                                        text={element.name}
                                        img={element.photo}
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
        }
      </>
  );
};

export default UsersProfilePage;
