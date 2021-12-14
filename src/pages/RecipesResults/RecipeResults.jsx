import "./RecipeResults.css";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import axios from "axios";
import Category from "../../components/Category/Category";
import Navbar from "../../components/Navbar/Navbar";

import { Link } from "react-router-dom";

const RecipeResults = (props) => {
  const [recipes, setRecipes] = useState([]);
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
  }, [searchState])

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setRecipes(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar handleLogout={handleLogout} user={user} profileImageState={profileImageState} />
      <div className="container d-flex flex-wrap justify-content-around">
    
      {recipes.map((element, index) => {
        return (
          <Link key={index + 1} to={`/search/${element.recipe.id}`}>
            <Category
              key={element.recipe.id}
              text={element.recipe.label}
              img={element.recipe.image}
            />
          </Link>
        );
      })}
    </div>
    </div>
    
  );
};

export default RecipeResults;
