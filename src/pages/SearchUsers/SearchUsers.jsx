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
            setAllUsers(response.data.filter(users => users._id !== user._id))
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
        <>
            <Navbar
                handleLogout={handleLogout}
                user={user}
                profileImageState={profileImageState}
            />
            <div className="container-fluid m-0 p-0 row SearchUsers mt-5 text-center justify-content-center">
                <div className="col-12 mt-5 mb-2">
                    <p className="h1">Find chefs</p>
                </div>
                <div className="col-12 col-xl-6 mb-3">
                    <div className="input-group">
                        <input
                        type="text"
                        onChange={(event) => setValueSearchbar(event.target.value)}
                        className="form-control search-user"
                        aria-label="Search"
                        aria-describedby="addon-wrapping"
                        placeholder="search users..."
                        />
                        
                        <span className="input-group-text search-button">
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                </div>
                <div className="col-12 col-xl-8">
                    {filteredUsers.length > 0 &&
                        filteredUsers.map((userSearched) => {
                        return (
                            <>
                            <div key={userSearched._id} className="col-12 mt-2">
                                <div className="row m-0 p-0 align-items-center text-start">
                                    <div className="col-3 text-center">
                                        {userSearched.avatar_url ?
                                            <Image 
                                                className="rounded-circle z-depth-0 mr-3"
                                                alt="avatar image"
                                                id="avatar-image" 
                                                cloudName={`${process.env.REACT_APP_CLOUD_NAME}`} 
                                                publicId={`https://res.cloudinary.com/djosvkjof/image/upload/v1639149584/${userSearched.avatar_url}.jpg`}
                                            /> :
                                            <img className="rounded-circle z-depth-0 mr-3" id="avatar-image" src="https://ibalz.com/wp-content/uploads/2019/10/default-profile.png" alt="Default avatar" />
                                        }
                                    </div>
                                    <div className="col-5">
                                        <Link to={`/user/${userSearched._id}`}>
                                            <p className="m-0 text-dark">{userSearched.username}</p>
                                        </Link>
                                    </div>
                                    <div className="col-4 text-end">
                                        {user.followed.includes(userSearched._id) ? 
                                            <button onClick={(event) => {unFollowUser(event, userSearched._id)}}
                                            className="btn button-unfollow" >
                                                <i className="fas fa-user-minus"></i>
                                            </button>
                                            :
                                            <button onClick={(event) => {followUser(event, userSearched._id)}}
                                            className="btn button-follow">
                                                <i  className="fas fa-user-plus"></i>
                                            </button>
                                        }
                                    </div>
                                    <div className="col-12">
                                        <hr />
                                    </div>
                                </div>
                            </div>
                                
                            </>
                            
                        )
                    })}

                </div>

            </div>

        </>
        
        )
}

export default SearchUsers