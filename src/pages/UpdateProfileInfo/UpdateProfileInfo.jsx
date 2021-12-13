import react, { useCallback } from "react";

import './UpddateProfileInfo.css'

import { useState, } from "react";
import axios from "axios";


const UpdateProfileInfo = (props) => {

    const { user, } = props
    const [imageSelected, setImageSelected] = useState('')
    const [profileImage, setProfileImage]   = useState()
    const [imageLoaded, setImageLoaded]     = useState(false)
    const [newUsername, setNewUsername]     = useState()
    const [newPassword, setNewPassword]     = useState()
    const [errorMessage, setErrorMessage]   = useState()
    const [updateMessage, setUpdateMessage] = useState()

    
    const uploadImage = async () => {
    const formData = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset",`mgkyabfx`)

    await axios.post("https://api.cloudinary.com/v1_1/djosvkjof/image/upload", 
    formData).then((response)=>{
      setProfileImage(response.data.public_id)
      setImageLoaded(true)
      
    })
    
  }

  

  const updateInfo = async (event) => {
    event.preventDefault()
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/profile/update`, {
      data: {
        profileImage: profileImage,
        userId: user._id,
        newUsername: newUsername,
        newPassword: newPassword,
        oldPassword: user.password
      }
    }).then((res) => {
      if(profileImage || newPassword || newUsername){    
        setUpdateMessage(res.data.msg)
      }
      
    })
    .catch((err) => {
      if(err.response.data.errorMessage){
        setErrorMessage(err.response.data.errorMessage)
      }
    })
  }
    return(
        <div className="UpdateProfileInfo">
          
            <div className="form-group mb-3 mt-5">
            {user && <p className="font-weight-bold">Welcome {user.username}</p>}
                <p className="font-weight-bold">Enter new Username:</p>
                <input onClick={() => setErrorMessage(false)}  className="form-control" type="text" name="username" placeholder="Username" onChange={(event) => setNewUsername(event.target.value)}/>
            </div>
            <div>
                <p className="font-weight-bold">Enter new Password:</p>
                <input onClick={() => setErrorMessage(false)} className="form-control mb-2" type="password" name="password" placeholder="Password"  onChange={(event) => setNewPassword(event.target.value)} minLength="8" /> 
            </div>
            <p className="mt-4">Upload profile image:</p>
            <label id="input-image" className="btn btn-block mybtn tx-tfm">
            <p>Select file </p>
               <input id="input-files" className="mt-1" type="file" onClick={() => setImageLoaded(false) } onChange={(event)=>{setImageSelected(event.target.files[0])}} />
            </label>
            <button className=" btn btn-block mybtn bg-color-purple tx-tfm mb-2 mt-4"  onClick={uploadImage}>Upload image</button>
            {imageLoaded && <p className="color-text">Image loaded successfully</p>}
            <button 
            className=" btn btn-block mybtn bg-color-purple tx-tfm mb-2 mt-4" 
            onClick={(event) => updateInfo(event)}>Update Info</button>
            {errorMessage && <p className="text-center text-danger">{errorMessage}</p>}
            {updateMessage && <p className="color-text">{updateMessage}</p>}
        </div>
    )
}

export default UpdateProfileInfo