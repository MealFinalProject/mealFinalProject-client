import react from "react";

import './UpddateProfileInfo.css'

import { useState, } from "react";
import axios from "axios";


const UpdateProfileInfo = (props) => {

    const { user, } = props
    const [imageSelected, setImageSelected] = useState('')
    let profileImage = ''
    console.log(user)
    
    const uploadImage = async () => {
    const formData = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset",`mgkyabfx`)

    await axios.post("https://api.cloudinary.com/v1_1/djosvkjof/image/upload", 
    formData).then((response)=>{
      profileImage = response.data.public_id
      
      console.log(response)
      
    })
    console.log(profileImage)
  }
  
    return(
        <div className="UpdateProfileInfo">
            <input id="input-files" className="mt-4" type="file" onChange={(event)=>{setImageSelected(event.target.files[0])}} />
            <button className=" btn btn-block mybtn bg-color-purple tx-tfm mb-2 mt-4"  onClick={uploadImage}>Upload image</button>
        </div>
    )
}

export default UpdateProfileInfo