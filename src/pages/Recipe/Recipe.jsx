import "./Recipe.css";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const RecipeResults = (props) => {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [numberFavs, setNumberFavs] = useState(0);

  const { id } = useParams();
  const { user } = props;
  const API_URL = `${process.env.REACT_APP_SERVER_URL}/search/${id}`;

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setRecipe(response.data);
      setLoading(false);
    });
    axios.get(`${process.env.REACT_APP_SERVER_URL}/favs/get-fav-number`).then((response) => {
      setNumberFavs(response.data.numberOfLikes)
    });
    setIsFav(user.favs_recipes_idApi.includes(id))
  }, []);



  console.log(user);
  const addFavorite = (event) => {
    event.preventDefault();
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/favs/add-fav-recipe`, {
        data: {
          idUser: user._id,
          idApiRecipe: id,
          nameRecipe: label,
          photoRecipe: image,
        },
      })
      .then((response) => {
        setIsFav(true)
        setNumberFavs(numberFavs + 1)
        console.log(response);
      });
  };
  const deleteFavorite = (event) => {
    event.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/favs/delete-fav-recipe`, {
        data: {
          idUser: user._id,
          idApiRecipe: id,
        },
      })
      .then((response) => {
        setIsFav(false)
        setNumberFavs(numberFavs - 1)
        console.log(response);
      });
  };

  
  console.log("fav ", isFav)
  const JSONrecipeTest = {
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
    cuisineType: ["american", "italian"],
    mealType: ["lunch", "dinner", "breakfast", "dinner", "lunch", "dinner"],
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
    url,
  } = JSONrecipeTest;
  // const {
  //   label,
  //   image,
  //   ingredientLines,
  //   calories,
  //   totalTime,
  //   cuisineType,
  //   mealType,
  //   dishType,
  //   url,
  // } = recipe?.recipe ?? {};
  // const serves = recipe?.recipe?.yield ?? {};
  const serves = JSONrecipeTest.yield ;
  return (
    !loading && (
      <div className="container">
        <div className="row text-center">
          <div className="col-12 col-xl-4 mt-xl-5">
            <div className="col-12  my-2 p-0">
              <img
                className="border border-3 rounded"
                src={image}
                alt={label}
              ></img>
            </div>
            <div className="col-12 my-2">
              <p className="fw-bold fs-2">{label}</p>
            </div>
            <div className="col-12 my-2">
              {totalTime !== 0 && (
                <span className="m-2">
                  <i className="bi bi-clock-history"></i> {totalTime} mins
                </span>
              )}
              <span className="m-2">
                <i className="bi bi-activity"></i> {Math.round(calories)} kcal
              </span>
              <span className="m-2">
                <i className="bi bi-people-fill"></i> {serves} serves
              </span>
            </div>
            <div className="col-12 my-2">
              <span className="fw-bold">Dish type </span>
              {dishType.map((dish, index) => (
                <span key={index + 1} className="m-2 text-capitalize">
                  {dish}
                </span>
              ))}
            </div>
          </div>
          <div className="col-12 col-xl-8 mt-xl-5">
            <div className="col-12 my-2 text-start">
              <div className="accordion" id="accordionRecipe">
                <div className="accordion-item">
                  <div className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Ingredients
                    </button>
                  </div>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionRecipe"
                  >
                    <div className="accordion-body">
                      <ul className="list-group ">
                        {ingredientLines.map((ingredient, index) => (
                          <li key={index + 1} className="list-group-item">
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Nutrition
                    </button>
                  </div>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionRecipe"
                  >
                    <div className="accordion-body">
                      <strong>This is the second item's accordion body.</strong>{" "}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 d-flex justify-content-center mb-2 mt-3">
              <a
                className="border rounded p-2 text-light type-background mr-3"
                href={url}
              >
                <i className="bi bi-file-text"></i> Instructions
              </a>
              {!isFav && <button
               className="btn button-not-fav" 
                onClick={(event) => addFavorite(event)}
              >
                <i className="bi bi-heart">  {numberFavs !== 0 && numberFavs}</i>
              </button>}
              {isFav && <button
                className="btn button-fav"
                onClick={(event) => deleteFavorite(event)}
              >
                <i className="bi bi-heart-fill"> {numberFavs !== 0 && numberFavs}</i>
              </button>}
              
            </div>
            <div className="col-12 mb-2 mt-4">
              <p className="m-0 fw-bold fs-5">Categories</p>
            </div>
            <div className="col-12 my-2 d-flex flex-wrap justify-content-start">
              {cuisineType.map((cuisine, index) => (
                <Link
                  key={index + 1}
                  className="me-2 mb-1 text-light"
                  to={`/category/country/${cuisine.toLocaleLowerCase()}`}
                >
                  <p className="border rounded-pill m-0 px-3 type-background opacity-75">
                    {cuisine.toLocaleLowerCase()}
                  </p>
                </Link>
              ))}
              {mealType.map((meal, index) => (
                <Link
                  key={index + 1}
                  className="me-2 mb-1 text-light"
                  to={`/category/time/${meal.toLocaleLowerCase()}`}
                >
                  <p className="border rounded-pill m-0 px-3 type-background opacity-75">
                    {meal.toLocaleLowerCase()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RecipeResults;
