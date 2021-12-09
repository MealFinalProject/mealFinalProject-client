import "./RecipeResults.css";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import axios from "axios";
import Category from "../../components/Category/Category";

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
    <div className="container d-flex flex-wrap justify-content-around">
      {recipes.map((element) => {
        return <Category key={element.recipe.id} text={element.recipe.label} img={element.recipe.image}/>
      })}
    </div>
  );
};

export default RecipeResults;
