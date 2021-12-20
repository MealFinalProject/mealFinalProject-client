import "./RecipeResults.css";

import { useParams } from "react-router";
import { useEffect, useState } from "react";

import axios from "axios";
import Card1 from "../../components/Card1/Card1";
import LoadingComponent from "../../components/Loading";

import { Link } from "react-router-dom";

const RecipeResults = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchMessage, setSearchMessage] = useState("")
  const { type, name } = useParams();
  const { searchState, setSearchState } = props;

  let API_URL = `${process.env.REACT_APP_SERVER_URL}/category/${type}`;

  if (name) API_URL += `/${name}`;
  
  useEffect(() => {
    if (searchState) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      API_URL = `${process.env.REACT_APP_SERVER_URL}/search/results/${searchState}`;
      setSearchMessage(`"${searchState}"`)
      setSearchState("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchState]);
  
  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setRecipes(response.data);
      if(response.data.length === 0) setNoResults(true)

      setSearchMessage(prevstate => `Found ${response.data.length} results for ` + prevstate)
      console.log(searchMessage)
      setIsLoading(false)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-5">
      {/* <Navbar handleLogout={handleLogout} user={user} profileImageState={profileImageState} /> */}
      {isLoading ? <LoadingComponent /> : 
      <div className="row m-0 p-0 text-center justify-content-center">
        {noResults && <div className="col-12">
            <p>Oops nothing seems to have been found. <Link to={"/"}>Maybe you want to try again?</Link></p>
        </div>}
        <div className="col-12 col-xl-10 mt-xl-0 ms-xl-5">
          <div className="row">
           {searchMessage && !name && !noResults && 
            <div className="col-12">
              <p className="h3">{searchMessage}</p>
              <hr/>
            </div>
           }
           {recipes.map((element, index) => {
              return (
                <div key={element.recipe.id}  className="col-6 col-lg-4 col-xl-3 px-3 my-3 my-xl-0">
                  <div className="RecipeResults">
                    <Link to={`/search/${element.recipe.id}`}>
                      <Card1
                        key={element.recipe.id}
                        text={element.recipe.label}
                        img={element.recipe.image}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default RecipeResults;
