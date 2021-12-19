import axios from "axios"

import { useEffect, useState } from "react"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"

import Navbar    from "../../components/Navbar/Navbar"

import "./SearchUsers.css"

const SearchUsers = ({handleLogout, user, profileImageState, setUser}) => {

    const [allUsers, setAllUsers]             = useState()
    const [loadUsers, setloadUsers]           = useState(false)
    const [valueSearchbar, setValueSearchbar] = useState()

    const API_URL = `${process.env.REACT_APP_SERVER_URL}`;
    
    useEffect(() => {
        axios.get(API_URL + "/users/search").then((response) => {
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

    const followUser = (event, userId) => {
        event.preventDefault()
        axios
        .put(API_URL + `/users/follow/${userId}`,{
            data: {
                userInSessionId: user._id
            }})
        .then((response) => {
            setUser(response.data.userInSession)
        })
    }

    const unFollowUser = (event, userId) => {
        event.preventDefault()
        axios
        .put(API_URL + `/users/unfollow/${userId}`,{
            data: {
                userInSessionId: user._id
            }})
        .then((response) => {
            setUser(response.data.userInSession)
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
                    placeholder="search users..."
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
                filteredUsers.map((userSearched, index) => {
                return (
                    <>
                       <div key={index + 1}
                       className="d-flex align-items-center container m-4  users-found">
                        {user.avatar_url &&
                        
                            <Image 
                                className="rounded-circle z-depth-0 mr-3"
                                alt="avatar image"
                                id="avatar-image" 
                                cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
                                publicId={`https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/${userSearched.avatar_url}.jpg`}
                            />
                        }
                            <p className="ml-3 ">{userSearched.username}</p>
                            
                            {user.followed.includes(userSearched._id) ? 
                                <Link onClick={(event) => {unFollowUser(event, userSearched._id)}}
                                to="" className=" ">
                                    <i id="button-unfollow" className="fas fa-user-minus"></i>
                                </Link>
                                :
                                <Link onClick={(event) => {followUser(event, userSearched._id)}}
                                 to="" className="">
                                    <i id="button-follow" className="fas fa-user-plus"></i>
                                </Link>
                            }
                        </div> 
                         <hr />
                    </>
                    
                )
            })}
        </div>
        
        )
}

export default SearchUsers