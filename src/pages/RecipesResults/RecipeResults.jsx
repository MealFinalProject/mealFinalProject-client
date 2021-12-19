import "./RecipeResults.css";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import axios from "axios";
import Card1 from "../../components/Card1/Card1";
import Navbar from "../../components/Navbar/Navbar";
import LoadingComponent from "../../components/Loading";

import { Link } from "react-router-dom";

const RecipeResults = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { type, name } = useParams();
  const { searchState, setSearchState, user, handleLogout, profileImageState } = props;

  let API_URL = `${process.env.REACT_APP_SERVER_URL}/category/${type}`;

  if (name) API_URL += `/${name}`;
  useEffect(() => {
    if (searchState) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      API_URL = `${process.env.REACT_APP_SERVER_URL}/search/results/${searchState}`;
      setSearchState("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState]);

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setRecipes(response.data);
      if(response.data.length === 0) setNoResults(true)
      setIsLoading(false)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-5">
      <Navbar
        handleLogout={handleLogout}
        user={user}
        profileImageState={profileImageState}
      />
      {isLoading ? <LoadingComponent /> : 
      <div className="container-fluid m-0 p-0 row mt-3 mt-xl-3 text-center justify-content-center">
        {noResults && <div className="mt-5 col-12">
            <p>Oops nothing seems to have been found. <Link to={"/"}>Maybe you want to try again?</Link></p>
        </div>}
        <div className="col-12 col-xl-8 mt-5 mt-xl-0">
          <div className="row">
           {recipes.map((element, index) => {
              return (
                <div key={element.recipe.id}  className="col-6 col-xl-3 px-4 my-3 my-xl-0">
                  <div className="RecipeResults">
                    <Link to={`/search/${element.recipe.id}`}>
                      <Card1
                        key={element.recipe.id}
                        text={element.recipe.label}
                        img={element.recipe.image}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default RecipeResults;
