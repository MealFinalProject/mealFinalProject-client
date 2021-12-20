import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import LoadingComponent from "./components/Loading";

import { getLoggedIn, logout } from "./services/auth";

import routes from "./config/routes";

import * as USER_HELPERS from "./utils/userToken";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchState, setSearchState] = useState()
  const [profileImageState, setProfileImageState] = useState()

  useEffect(() => {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  function handleLogout() {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      setUser(null);
      return setIsLoading(false);
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        // deal with error here
        console.error("Logout was unsuccessful: ", res);
      }
      USER_HELPERS.removeUserToken();
      setIsLoading(false);
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="App">
      <div className="container-fluid m-0 p-0 row">
        <div className="col-12">
          {user &&<Navbar handleLogout={handleLogout} user={user} profileImageState={profileImageState} />}

        </div>
        <div className="col-12 mt-5 m-0 p-0">
          <Routes>
            {routes({ user, setUser, authenticate, handleLogout,
            searchState,setSearchState,
            profileImageState, setProfileImageState }).map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>

        </div>
      </div>
    </div>
  );
}
