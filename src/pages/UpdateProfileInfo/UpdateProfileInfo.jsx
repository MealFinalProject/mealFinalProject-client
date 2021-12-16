
import './UpddateProfileInfo.css'

import Navbar from "../../components/Navbar/Navbar";

import { useState, } from "react";
import axios from "axios";


const UpdateProfileInfo = (props) => {

    const { user, setUser, handleLogout, profileImageState } = props
    
    const [imageSelected, setImageSelected] = useState('')
    const [profileImage, setProfileImage]   = useState()
    const [imageLoaded, setImageLoaded]     = useState(false)
    const [newUsername, setNewUsername]     = useState()
    const [newPassword, setNewPassword]     = useState()
    const [errorMessage, setErrorMessage]   = useState(false)
    const [updateMessage, setUpdateMessage] = useState(false)

    
    const uploadImage = () => {                                       
    const formData = new FormData()
    formData.append("file", imageSelected)                                          //Axios call to cloudinary to load the image
    formData.append("upload_preset", 'mgkyabfx')

    

    axios.post("https://api.cloudinary.com/v1_1/djosvkjof/image/upload", 
    formData).then((response)=>{
      
      setProfileImage(response.data.public_id)
      setImageLoaded(true)
      
    })
    
  }

  const updateInfo = (event) => {
    event.preventDefault()
    axios.post(`${process.env.REACT_APP_SERVER_URL}/profile/update`, {
      data: {
        oldProfileImage: user.avatar_url,                                       //Post call to the database to update the profile
        profileImage: profileImage,
        userId: user._id,
        newUsername: newUsername,
        newPassword: newPassword,
        oldPassword: user.password,
      }
    }).then((res) => {
      setUpdateMessage(res.data.msg)
      setUser(res.data.updateUser)
     
    })
    .catch((err) => {
      if(err.response){
        setErrorMessage(err.response.data.errorMessage)
      }
      
      
    })
  }

  const hiddenMsg = () => {
    setErrorMessage(false)
    setImageLoaded(false)                       
    setUpdateMessage(false)
  }

    return (
      <div>
        <Navbar handleLogout={handleLogout} user={user} profileImageState={profileImageState} />
        <div className="UpdateProfileInfo container">
      
        <div className="form-group mb-3 mt-5">

          <p className="font-weight-bold">Enter new Username:</p>
          <input
            onClick={() => {
              hiddenMsg();
            }}
            className="form-control"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(event) => setNewUsername(event.target.value)}
          />
        </div>
        <div>
          <p className="font-weight-bold">Enter new Password:</p>
          <input
            onClick={() => {
              hiddenMsg();
            }}
            className="form-control mb-2"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => setNewPassword(event.target.value)}
            minLength="8"
          />
        </div>

        <p className="mt-4">Upload profile image:</p>

        <label id="input-image" className="btn btn-block mybtn tx-tfm">
          <p>Select file </p>
          <input
            id="input-files"
            className="mt-1"
            type="file"
            onClick={() => {
              hiddenMsg();
            }}
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
          />
        </label>

        <button
          className=" btn btn-block mybtn bg-color-purple tx-tfm mb-2 mt-4"
          onClick={uploadImage}
        >
          Upload image
        </button>

        {imageLoaded && (
          <p className="color-text m-2">Image loaded successfully</p>
        )}

        <button
          className=" btn btn-block mybtn bg-color-purple tx-tfm mb-2 mt-4"
          onClick={(event) => updateInfo(event)}
        >
          Update Info
        </button>
        {errorMessage && (
          <p className="text-center text-danger m-2">{errorMessage}</p>
        )}
        {updateMessage && <p className="color-text m-2">{updateMessage}</p>}
      </div>
      </div>
      
    );
}

export default UpdateProfileInfo