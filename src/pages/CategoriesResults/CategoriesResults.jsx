import "./CategoriesResults.css";

import { Link } from "react-router-dom";
import { cuisineType } from "../../utils/consts";
import { mealType } from "../../utils/consts";
import { useParams } from "react-router";

import Category from "../../components/Category/Category";
import Navbar from "../../components/Navbar/Navbar";

const CategoriesResults = (props) => {

  const { user, handleLogout, profileImageState } = props;

  const name = useParams().name;
  let arrayOfCategories = cuisineType;
  //Check the name we collect from the params and render a list with the corresponding category array
  if (name === "time") arrayOfCategories = mealType;
  return (
    <div>
      <Navbar handleLogout={handleLogout} user={user} profileImageState={profileImageState} />
      <div className=" container d-flex flex-wrap justify-content-around">
    
      {arrayOfCategories.map((type, index) => {
        return (
          <div className="CategoriesResults" key={index + 1}>
            <Link className="link-categories" to={type.name.toLowerCase()}>
              <Category
                text={type.name}
                img={type.img}             //Passing the necessary props to render each type of category with its image
              />
            </Link>
          </div>
        );
      })}
    </div>
    </div>
    
  );
};

export default CategoriesResults;
