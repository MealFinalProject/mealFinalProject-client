import './MyRecipes.css'
import Navbar   from '../../components/Navbar/Navbar'
import Category from '../../components/Category/Category'

import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Link }      from 'react-router-dom'
import { useState }  from 'react/cjs/react.development'

import * as PATHS from "../../utils/paths";

import axios from 'axios'


const MyRecipes = (props) => {

    const [recipesFavoritesOfUser, setRecipesFavoritesOfUser] = useState()
    const { user, handleLogout, profileImageState } = props
    const checkrecipes = recipesFavoritesOfUser && recipesFavoritesOfUser.length > 0
    const userId = useParams().id

    const API_URL = `${process.env.REACT_APP_SERVER_URL}/profile/my-recipes/${userId}`  
    
    useEffect(() => {
        axios.get(API_URL).then((response) => {                                                     //Axios call to populate the favourites array

        setRecipesFavoritesOfUser(response.data.recipesFavoritesOfUser.favs_recipes)
        
        })
    }, [])

    

    return (
        <div>
            <Navbar handleLogout={handleLogout} user={user} profileImageState={profileImageState} />
            <div className="container d-flex flex-wrap justify-content-around">
            {checkrecipes ? (
            recipesFavoritesOfUser.map((element) => {
                return (
                <Link  to={`/search/${element.idApi}`}>
                    <Category
                    key={element.idApi}
                    text={element.name}
                    img={element.photo}
                    />
                </Link>
                );
            })
            ) : (
                <div className='MyRecipes d-flex flex-column align-items-center'>
                  <h1 className="">Add your first recipe</h1>
                  <img src='https://images.unsplash.com/photo-1564228511783-821f2f547f44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1091&q=80' />  
                    <Link className="mt-5 btn btn-block mybtn bg-color tx-tfm" to={PATHS.HOMEPAGE}>Find Recipes</Link>
                </div>
                
            )
            }
            </div>
        </div>
    )
}

export default MyRecipes