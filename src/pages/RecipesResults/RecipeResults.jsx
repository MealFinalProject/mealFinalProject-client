import "./RecipeResults.css";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const RecipeResults = () => {
  const [recipes, setRecipes] = useState([]);
  const { type, name } = useParams();
  let API_URL =  `${process.env.REACT_APP_SERVER_URL}/category/${type}`
  if(name) API_URL += `/${name}`
  console.log(type);
  console.log(API_URL);
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        console.log("response.data", response.data);
        setRecipes(response.data);
      });
  }, []);
  console.log(recipes);
  return (
    <>
      <ul>
        {recipes.map((recipe) => {
          return <li>{recipe.recipe.label}</li>;
        })}
      </ul>
    </>
  );
};

export default RecipeResults;
