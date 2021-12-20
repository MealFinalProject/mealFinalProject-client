import "./Recipe.css";
import Navbar from "../../components/Navbar/Navbar";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import NewComment from "../../components/NewComment/NewComment";
import Comments from "../../components/Comments/Comments";
import DonutChart from "../../components/DonutChart/DonutChart";
import LoadingComponent from "../../components/Loading";
// import { Link } from "react-router-dom";

const RecipeResults = (props) => {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [numberFavs, setNumberFavs] = useState(0);
  const [comments, setComments] = useState([]);

  const { id } = useParams();
  
  const { user, handleLogout, profileImageState, authenticate  } = props;

  const API_URL = `${process.env.REACT_APP_SERVER_URL}/search/${id}`;

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setRecipe(response.data);
      setLoading(false);
    });
    axios.get(`${process.env.REACT_APP_SERVER_URL}/favs/get-fav-number?idApiRecipe=${id}`).then((response) => {
      setNumberFavs(response.data.numberOfLikes)
    });

    axios.get(`${process.env.REACT_APP_SERVER_URL}/comments/get-recipe-comments?idApiRecipe=${id}`).then((response) => {
      setComments(response.data.comments)
    });
   

    axios.get(`${process.env.REACT_APP_SERVER_URL}/profile`, {
        headers: {
          id: user._id,
        }
    }).then((response) => {
      authenticate(response.data)
    })
  }, []);

  useEffect(() => {
    setIsFav(user.favs_recipes_idApi.includes(id))
  }, [user, id])

  const addFavorite = (event) => {
    event.preventDefault();
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/favs/add-fav-recipe`, {
        data: {
          idUser: user._id,
          idApiRecipe: id,
          nameRecipe: label,
          photoRecipe: image,
        }
      })
      .then((response) => {
        setIsFav(true)
        setNumberFavs(numberFavs + 1)
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
      });
  };

  
  const newComment = (content) => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/comments/add-new-comment`, {
        data: {
          idUser: user._id,
          idApiRecipe: id,
          nameRecipe: label,
          photoRecipe: image,
          content: content
        }
      })
      .then((response) => {
        setComments([...comments, response.data.newComment])
      });
  }

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
    totalNutrients: {
      ENERC_KCAL: {
        label: "Energy",
        quantity: 5500.776949937501,
        unit: "kcal"
        },
        FAT: {
        label: "Fat",
        quantity: 318.187832452,
        unit: "g"
        },
        FASAT: {
        label: "Saturated",
        quantity: 170.77673228805003,
        unit: "g"
        },
        FATRN: {
        label: "Trans",
        quantity: 0.06860000000000001,
        unit: "g"
        },
        FAMS: {
        label: "Monounsaturated",
        quantity: 98.50478431885,
        unit: "g"
        },
        FAPU: {
        label: "Polyunsaturated",
        quantity: 21.451428536650003,
        unit: "g"
        },
        CHOCDF: {
        label: "Carbs",
        quantity: 654.639979165375,
        unit: "g"
        },
        FIBTG: {
        label: "Fiber",
        quantity: 31.8314623725,
        unit: "g"
        },
        SUGAR: {
        label: "Sugars",
        quantity: 390.93881316087504,
        unit: "g"
        },
        PROCNT: {
        label: "Protein",
        quantity: 72.315883773,
        unit: "g"
        },
    },
    totalDaily: {},
    digest: [],
    id: "aee621fd197a61c324a15fec5d338802",
  };
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
  // } = JSONrecipeTest;
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
  } = recipe?.recipe ?? {};
  const serves = recipe?.recipe?.yield ?? {};
  const fat = recipe?.recipe?.totalNutrients.FAT ?? {}
  const carbs = recipe?.recipe?.totalNutrients.CHOCDF ?? {}
  const protein = recipe?.recipe?.totalNutrients.PROCNT ?? {}
  const kcal = recipe?.recipe?.totalNutrients.ENERC_KCAL ?? {}
  // const fat = JSONrecipeTest.totalNutrients.FAT
  // const carbs = JSONrecipeTest.totalNutrients.CHOCDF
  // const protein = JSONrecipeTest.totalNutrients.PROCNT
  // const kcal = JSONrecipeTest.totalNutrients.ENERC_KCAL
  // const serves = JSONrecipeTest.yield ;
  const macro = {fat, carbs, protein, kcal}
  return (
    (
      <div className="Recipe">
        {/* <Navbar handleLogout={handleLogout} user={user} profileImageState={profileImageState} /> */}
        {loading ? <LoadingComponent/> :  
        <div className="container mt-xl-5">
          <div className="row text-center">
            <div className="col-12 col-xl-4 mt-xl-5">
              <div className="col-12  my-2 p-0">
                <img
                  className="border border-3 rounded mt-5 mt-xl-0"
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
                        <DonutChart macronutrients={macro}/>
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
              <div className="col-12 my-4">
                <NewComment newComment={newComment}/>
              </div>
              <div className="col-12 my-2">
                <Comments comments={comments}/>
              </div>
            </div>
          </div>
        </div>}
      </div>
      
     
    )
  );
};

export default RecipeResults;
