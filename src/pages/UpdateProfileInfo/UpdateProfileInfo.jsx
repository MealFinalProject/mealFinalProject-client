import "./UpddateProfileInfo.css";

import { useState, useContext } from "react";
import { ThemeContext } from "../../context/theme.context.js";

import axios from "axios";
import BackButton from "../../components/BackButton/BackButton";

const UpdateProfileInfo = (props) => {
  const { user, setUser } = props;

  const [imageSelected, setImageSelected] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [newUsername, setNewUsername] = useState();
  const [newPassword, setNewPassword] = useState();
  const [errorMessage, setErrorMessage] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(false);

  const { theme } = useContext(ThemeContext);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected); //Axios call to cloudinary to load the image
    formData.append("upload_preset", "mgkyabfx");

    axios
      .post("https://api.cloudinary.com/v1_1/djosvkjof/image/upload", formData)
      .then((response) => {
        setProfileImage(response.data.public_id);
        setImageLoaded(true);
      });
  };

  const updateInfo = (event) => {
    event.preventDefault();
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/profile/update`, {
        data: {
          oldProfileImage: user.avatar_url, //Post call to the database to update the profile
          profileImage: profileImage,
          userId: user._id,
          newUsername: newUsername,
          newPassword: newPassword,
          oldPassword: user.password,
        },
      })
      .then((res) => {
        setUpdateMessage(res.data.msg);
        setUser(res.data.updateUser);
      })
      .catch((err) => {
        if (err.response) {
          setErrorMessage(err.response.data.errorMessage);
        }
      });
  };

  const hiddenMsg = () => {
    setErrorMessage(false);
    setImageLoaded(false);
    setUpdateMessage(false);
  };

  const [passwordType, setPasswordType] = useState("password");
  const [passwordShow, setPasswordShow] = useState(false);

  const showPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordShow(true);
    } else {
      setPasswordType("password");
      setPasswordShow(false);
    }
  };

  return (
    <div>
      <div className="UpdateProfileInfo container mt-5">
        <div className="col-12 col-xl-8 mb-3">
          <div className="row m-0 p-0 align-items-center text-start">
            <div className="col-4 col-xl-5 ">
              <BackButton />
            </div>
            <div className="col-8 col-xl-7">
              <p className="h4">Update profile</p>
            </div>
          </div>
          <hr />
        </div>
        <div className="form-group mb-3">
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
          <div className="input-group">
            <input
              id="password-input"
              onClick={() => {
                hiddenMsg();
              }}
              className="form-control signup-eye-input"
              type={passwordType}
              name="password"
              placeholder="Password"
              onChange={(event) => setNewPassword(event.target.value)}
              required
              minLength="8"
            />
            <span className="input-group-text signup-eye">
              {passwordShow ? (
                <i onClick={() => showPassword()} className="far fa-eye"></i>
              ) : (
                <i
                  onClick={() => showPassword()}
                  className="far fa-eye-slash"
                ></i>
              )}
            </span>
          </div>
        </div>

        <p className="mt-4">Upload profile image:</p>

        <label
          id="input-image"
          className={`${theme} btn btn-block mybtn tx-tfm `}
        >
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
};

export default UpdateProfileInfo;
