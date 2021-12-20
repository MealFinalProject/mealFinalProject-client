import { Navigate }      from "react-router-dom";

import HomePage          from "../pages/Home/HomePage";
import Login             from "../pages/Login/LogIn";
import Signup            from "../pages/Signup/Signup";
import ProfilePage       from "../pages/ProfilePage/ProfilePage";
import CategoriesResults from "../pages/CategoriesResults/CategoriesResults";
import RecipeResults     from "../pages/RecipesResults/RecipeResults";
import Recipe            from "../pages/Recipe/Recipe";
import UpdateProfileInfo from "../pages/UpdateProfileInfo/UpdateProfileInfo";
import MyRecipes         from "../pages/MyRecipes/MyRecipes";
import SearchUsers       from "../pages/SearchUsers/SearchUsers"
import UsersProfilePage  from "../pages/UsersProfilePage/UsersProfilePage";
import Page404           from "../pages/Page404/Page404"


import * as PATHS        from "../utils/paths";

const routes = (props) => {
  const { user } = props;
  
  return [
    {
      path: PATHS.PATH404,
      element: <Page404 {...props} />
    },
    {
      path: PATHS.SEARCHUSERS,
      element: user ? (
        <SearchUsers {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.USERSPROFILEPAGE,
      element: user ? (
        <UsersProfilePage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.MYRECIPES,
      element: user ? (
        <MyRecipes {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
    {
      path: PATHS.UPDATEPROFILEINFO,
      element: user ? (
        <UpdateProfileInfo {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
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
      element: user ? (
        <HomePage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
       
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
