import axios from "axios"

import { useEffect, useState } from "react"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"

import Navbar    from "../../components/Navbar/Navbar"

import "./SearchUsers.css"

const SearchUsers = ({handleLogout, user, profileImageState}) => {

    const [allUsers, setAllUsers]             = useState()
    const [loadUsers, setloadUsers]           = useState(false)
    const [valueSearchbar, setValueSearchbar] = useState()

    const API_URL = `${process.env.REACT_APP_SERVER_URL}/users/search`;
    
    useEffect(() => {
        axios.get(API_URL).then((response) => {
            setAllUsers(response.data)
            setloadUsers(true)
        })
    }, [])

    let filteredUsers = []

    if(loadUsers) {
       filteredUsers = allUsers.filter((user) => {
           return user.username.toLowerCase().includes(valueSearchbar ? valueSearchbar.toLowerCase() : valueSearchbar)
       } ).sort((a, b) => {
           if(a.username > b.username){
               return 1
           }else {
               return -1
           }
       })
    }

    return(
        <div className="SearchUsers">
            <Navbar
                handleLogout={handleLogout}
                user={user}
                profileImageState={profileImageState}
            />
            <div className="container">
               <h1 className="">Find chefs</h1>
                <div className="input-group col-12">
                    <input
                    type="text"
                    onChange={(event) => setValueSearchbar(event.target.value)}
                    className="form-control search-bar"
                    aria-label="Search"
                    aria-describedby="addon-wrapping"
                    placeholder="search users"
                    />
                    <Link
                    className="input-group-text search-button"
                    to=""
                    >
                    <span id="basic-addon2">
                        <i className="bi bi-search"></i>
                    </span>
                   </Link>
                </div>
            </div>    
            {filteredUsers.length > 0 &&
                filteredUsers.map((user) => {
                return (
                    <>
                       <div className="container m-4  users-found">
                       <Link to="" className="d-flex align-items-center text-black">
                        {user.avatar_url &&
                        
                            <Image 
                                className="rounded-circle z-depth-0 mr-3"
                                alt="avatar image"
                                id="avatar-image" 
                                cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
                                publicId={`https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/${user.avatar_url}.jpg`}
                            />
                        }
                            <p className="ml-3">{user.username}</p>
                        </Link>
                        </div> 
                        <hr />
                    </>
                    
                )
            })}
        </div>
        
        )
}

export default SearchUsers