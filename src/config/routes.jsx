import { Navigate } from "react-router-dom";

import HomePage from "../pages/Home/HomePage";
import Login from "../pages/Login/LogIn";
import Signup from "../pages/Signup/Signup";
import ProtectedPage from "../pages/ProtectedPage";
import CategoriesResults from "../pages/CategoriesResults/CategoriesResults";

import * as PATHS from "../utils/paths";

const routes = (props) => {
  const { user } = props;
  return [
    {
      path: PATHS.CATEGORIESRESULTS,
      element: <CategoriesResults {...props} />,
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
      path: PATHS.PROTECTEDPAGE,
      element: user ? (
        <ProtectedPage {...props} />
      ) : (
        <Navigate to={PATHS.LOGINPAGE} replace />
      ),
    },
  ];
};

export default routes;
