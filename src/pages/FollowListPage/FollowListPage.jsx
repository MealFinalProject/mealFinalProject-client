import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import { useLocation } from "react-router-dom";
import UserList from "../../components/UserList/UserList";

const FollowListPage = (props) => {
  const { user, setUser, handleLogout, profileImageState } = props;

  const location = useLocation();
  const { list, title } = location.state;

  return (
    <>
      {/* <Navbar handleLogout={handleLogout} user={user} profileImageState={profileImageState} /> */}
      <div className="row m-0 p-0 text-center justify-content-center">
        <div className="col-12 col-xl-6 mt-3">
          <UserList list={list} title={title} user={user} setUser={setUser} />
        </div>
      </div>
    </>
  );
};

export default FollowListPage;
