import React from "react";

import {Image} from 'cloudinary-react'

import './ProfilePage.css'

const ProfilePage = () => {
  return (
    <div>
    <div id="container-profile-image">
      <Image id="profile-image" cloudName={`${process.env.CLOUD_NAME}`} publicId="https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/gtvhjeygsyoyeqgrfgmj.jpg"/>
    </div>
    <div>
        
    </div>   
    </div>
  );
};

export default ProfilePage;
