import "./RecipeResults.css";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import axios from "axios";
import Category from "../../components/Category/Category";
import { Link } from "react-router-dom";

const RecipeResults = (props) => {
  const [recipes, setRecipes] = useState([]);
  const { type, name } = useParams();
  const { searchState, setSearchState } = props;

  let API_URL = `${process.env.REACT_APP_SERVER_URL}/category/${type}`;
  
  if (name) API_URL += `/${name}`;

  if (searchState) {
    API_URL = `${process.env.REACT_APP_SERVER_URL}/search/results/${searchState}`;
    setSearchState("");
  }

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setRecipes(response.data);
    });
  }, []);

  return (
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
  );
};

export default RecipeResults;