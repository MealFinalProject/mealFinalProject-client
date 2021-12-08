import "./RecipeResults.css";

import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const RecipeResults = (props) => {
  const [recipes, setRecipes] = useState([]);
  const { type, name } = useParams();
  console.log(type);
  console.log(name);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/category/${type}/${name}`)
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
