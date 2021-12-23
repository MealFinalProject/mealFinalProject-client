import "./Recipe.css";

import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../../context/theme.context";

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

  const { theme } = useContext(ThemeContext)

  const { id } = useParams();
  
  const { user, authenticate  } = props;

  const API_URL = `${process.env.REACT_APP_SERVER_URL}/search-one/${id}`;

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
// eslint-disable-next-line react-hooks/exhaustive-deps    
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
      .then(() => {
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

  const serves = recipe?.recipe?.yield ?? {}
  const fat = recipe?.recipe?.totalNutrients.FAT ?? {}
  const carbs = recipe?.recipe?.totalNutrients.CHOCDF ?? {}
  const protein = recipe?.recipe?.totalNutrients.PROCNT ?? {}
  const kcal = recipe?.recipe?.totalNutrients.ENERC_KCAL ?? {}
  const macro = {fat, carbs, protein, kcal}

  return (
    (
      <div className="Recipe">
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
                  className={`border rounded p-2 text-light mr-3 ${theme}`}
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
                    <p className={`border rounded-pill m-0 px-3 opacity-75 ${theme}`}>
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
                    <p className={`border rounded-pill m-0 px-3 opacity-75 ${theme}`}>
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
