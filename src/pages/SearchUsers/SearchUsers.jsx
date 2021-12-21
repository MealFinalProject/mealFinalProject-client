import axios from "axios"

import { useEffect, useState } from "react"

import "./SearchUsers.css"
import UserList from "../../components/UserList/UserList"
import BackButton from "../../components/BackButton/BackButton"

const SearchUsers = ({ user, setUser}) => {

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
    
    return(
        <>
            <div className="container-fluid m-0 p-0 row SearchUsers text-center justify-content-center">
                <div className="col-12 col-xl-6 mt-5 mb-3">
                    <div className="row m-0 p-0 align-items-center text-start">
                        <div className="col-4 col-xl-5 ">
                        <BackButton />
                        </div>
                        <div className="col-8 col-xl-7">
                        <p className="h1">Find chefs</p>
                        </div>
                    </div>
                    <hr/>
                </div>
                <div className="col-12"></div>
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
                <div className="col-12"></div>
                <div className="col-12 col-xl-6 mt-3">
                    <UserList list={filteredUsers} title={""} user={user} setUser={setUser} />
                </div>
            </div>

        </>
        
        )
}

export default SearchUsers