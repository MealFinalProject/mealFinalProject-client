import "./CategoriesResults.css";

import { Link } from "react-router-dom";
import { cuisineType } from "../../utils/consts";
import { mealType } from "../../utils/consts";
import { useParams } from "react-router";

import Card1 from "../../components/Card1/Card1";

const CategoriesResults = (props) => {

  const name = useParams().name;
  let arrayOfCategories = cuisineType;
  //Check the name we collect from the params and render a list with the corresponding category array
  if (name === "time") arrayOfCategories = mealType;
  return (
    <>
      <div className="row m-0 p-0 text-center justify-content-center">
        <div className="col-12 col-xl-10 mt-4 mt-xl-0 ms-xl-5">
          <div className="row">
              {arrayOfCategories.map((type, index) => {
              return (
                <div key={index + 1} className="col-6 col-lg-4 col-xl-3 ps-3 ps-xl-0 my-3 my-xl-0">
                  <div className="CategoriesResults" >
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
