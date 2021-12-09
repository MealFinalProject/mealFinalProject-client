// import "./RecipeResults.css";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import axios from "axios";
import Category from "../../components/Category/Category";
// import { Link } from "react-router-dom";

const RecipeResults = () => {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const API_URL = `${process.env.REACT_APP_SERVER_URL}/search/${id}`;
  console.log(API_URL);
  useEffect(() => {
    // axios.get(API_URL).then((response) => {
    //   console.log("response.data", response.data);
    //   setRecipe(response.data);
    //   setLoading(false);
    //   console.log("Hola");
    // });
  }, []);
  const JSONrecipe = {
    uri: "http://www.edamam.com/ontologies/edamam.owl#recipe_aee621fd197a61c324a15fec5d338802",
    label: "Perfect Grilled Chicken recipes",
    image:
      "https://www.edamam.com/web-img/c60/c60dbe071bde7d54be9a78af89dfe8a0",
    images: {
      THUMBNAIL: {
        url: "https://www.edamam.com/web-img/c60/c60dbe071bde7d54be9a78af89dfe8a0-s",
        width: 100,
        height: 100,
      },
      SMALL: {
        url: "https://www.edamam.com/web-img/c60/c60dbe071bde7d54be9a78af89dfe8a0-m",
        width: 200,
        height: 200,
      },
      REGULAR: {
        url: "https://www.edamam.com/web-img/c60/c60dbe071bde7d54be9a78af89dfe8a0",
        width: 300,
        height: 300,
      },
    },
    source: "fashionablefoods.com",
    url: "http://fashionablefoods.com/2015/05/19/perfect-grilled-chicken/",
    shareAs:
      "http://www.edamam.com/recipe/perfect-grilled-chicken-recipes-aee621fd197a61c324a15fec5d338802/-",
    yield: 4,
    dietLabels: [],
    healthLabels: [],
    cautions: [],
    ingredientLines: [
      "2 Large Chicken Breasts",
      "1 Tablespoon Oil (Olive Oil, Melted Coconut Oil, etc.)",
      "3 Tablespoons Herb or Spice Rub*",
    ],
    ingredients: [],
    calories: 894.316,
    totalWeight: 457.1,
    totalTime: 20,
    cuisineType: ["american"],
    mealType: ["lunch/dinner"],
    dishType: ["main course"],
    totalNutrients: {},
    totalDaily: {},
    digest: [],
    id: "aee621fd197a61c324a15fec5d338802",
  };
  const {
    label,
    image,
    ingredientLines,
    calories,
    totalTime,
    cuisineType,
    mealType,
    dishType,
  } = JSONrecipe;
  //   const {
  //     label,
  //     image,
  //     ingredientLines,
  //     calories,
  //     totalTime,
  //     cuisineType,
  //     mealType,
  //     dishType,
  //   } = recipe?.recipe ?? {};
  console.log(recipe);
  return (
    !loading && (
      <div className="container d-flex flex-wrap justify-content-center">
        <div className="m-2 border border-3 rounded">
          <img src={image} alt={label}></img>
        </div>
        <div>
          <p className="fw-bold fs-2">{label}</p>
        </div>
        <div className="m-2">
            <span className="m-2"><i class="bi bi-clock-history"></i> {totalTime} mins</span>
            <span className="m-2"><i class="bi bi-activity"></i> {calories} kcal  </span>
        </div>
        <div className="m-2">
            {dishType.map((dish) => (
              <span className="m-2 text-capitalize">{dish}</span>
            ))}
        </div>
        <div>
          <p className="fw-bold">Ingredients</p>
          <ul className="list-group">
            {ingredientLines.map((ingredient) => (
              <li className="list-group-item">{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="btn-toolbar text-capitalize m-2">
            {cuisineType.map((cuisine) => (
              <span className="border p-2 m-2">{cuisine}</span>
            ))}
            {mealType.map((meal) => (
              <span className="border p-2 m-2">{meal}</span>
            ))}         
        </div>
      </div>
    )
  );
};

export default RecipeResults;
