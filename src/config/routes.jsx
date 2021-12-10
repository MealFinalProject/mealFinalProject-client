import { Navigate }      from "react-router-dom";

import HomePage          from "../pages/Home/HomePage";
import Login             from "../pages/Login/LogIn";
import Signup            from "../pages/Signup/Signup";
import ProfilePage       from "../pages/ProfilePage/ProfilePage";
import CategoriesResults from "../pages/CategoriesResults/CategoriesResults";
import RecipeResults     from "../pages/RecipesResults/RecipeResults";
import Recipe            from "../pages/Recipe/Recipe";

import * as PATHS        from "../utils/paths";

const routes = (props) => {
  const { user } = props;
  
  return [
    {
      path: PATHS.SEARCHRESULT,
      element: <Recipe {...props} />,
    },
    {
      path: PATHS.SEARCHRESULTS,
      element: <RecipeResults {...props} />,
    },
    {
      path: PATHS.CATEGORIESRESULTS,
      element: <CategoriesResults {...props} />,
    },
    {
      path: PATHS.TYPERESULTS,
      element: <RecipeResults {...props} />,
    },
    {
      path: PATHS.COCKTAILRESULTS,
      element: <RecipeResults {...props} />,
    },
    {
      path: PATHS.FASTRECIPESRESULTS,
      element: <RecipeResults {...props} />,
    },
    {
      path: PATHS.HOMEPAGE,
      element: <HomePage {...props} />,
    },
    {
      path: PATHS.SIGNUPPAGE,
      element: <Signup {...props} />,
    },

    {
      path: PATHS.LOGINPAGE,
      element: <Login {...props} />,
    },
    {
      path: PATHS.PROFILEPAGE,
      element: user ? (
        <ProfilePage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
  ];
};

export default routes;
