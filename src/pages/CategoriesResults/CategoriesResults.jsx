import "./CategoriesResults.css";

import { Link } from "react-router-dom";
import { cuisineType } from "../../utils/consts";
import { mealType } from "../../utils/consts";
import { useParams } from "react-router";

import Card1 from "../../components/Card1/Card1";
import Navbar from "../../components/Navbar/Navbar";

const CategoriesResults = (props) => {

  const { user, handleLogout, profileImageState } = props;

  const name = useParams().name;
  let arrayOfCategories = cuisineType;
  //Check the name we collect from the params and render a list with the corresponding category array
  if (name === "time") arrayOfCategories = mealType;
  return (
    <>
      <Navbar handleLogout={handleLogout} user={user} profileImageState={profileImageState} />
      <div className="container-fluid m-0 p-0 row mt-5 mt-xl-3 justify-content-center">
        <div className="col-12 col-xl-10 mt-3 mt-xl-0 ms-xl-5">
          <div className="row">
              {arrayOfCategories.map((type, index) => {
              return (
                <div className="col-6 col-lg-4 col-xl-3 ps-3 ps-xl-0 my-3 my-xl-0">
                  <div className="CategoriesResults" key={index + 1}>
                    <Link className="link-categories" to={type.name.toLowerCase()}>
                      <Card1
                        text={type.name}
                        img={type.img}             //Passing the necessary props to render each type of category with its image
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesResults;
