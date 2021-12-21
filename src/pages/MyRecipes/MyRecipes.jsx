import './MyRecipes.css'

import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Link }      from 'react-router-dom'
import { useState }  from 'react/cjs/react.development'

import * as PATHS from "../../utils/paths";

import axios from 'axios'
import FavsRecipeList from '../../components/FavsRecipeList/FavsRecipeList'


const MyRecipes = () => {

    const [recipesFavoritesOfUser, setRecipesFavoritesOfUser] = useState()
    const checkrecipes = recipesFavoritesOfUser && recipesFavoritesOfUser.length > 0
    const userId = useParams().id

    const API_URL = `${process.env.REACT_APP_SERVER_URL}/profile/my-recipes/${userId}`  
    
    useEffect(() => {
        axios.get(API_URL).then((response) => {                                                     //Axios call to populate the favourites array

        setRecipesFavoritesOfUser(response.data.recipesFavoritesOfUser.favs_recipes)
        
        })
// eslint-disable-next-line react-hooks/exhaustive-deps        
    }, [])

    

    return (
        <div>
            <div className="row m-0 p-0 text-center justify-content-center">
            {checkrecipes ? (
                <div className="col-12 col-xl-9 mb-2 mt-5">
                    {recipesFavoritesOfUser && <FavsRecipeList favsList={recipesFavoritesOfUser} />}
                </div>
            ) : (
                <>
                <div className='MyRecipes col-12 mt-5'>
                  <p className="h1 mb-5">Add your first recipe</p>
                </div>
                  <div className='MyRecipes col-12'>
                  <img src='https://images.unsplash.com/photo-1564228511783-821f2f547f44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1091&q=80' alt="No favs"/>  
                  </div>
                <div className='MyRecipes col-12'>
                  <Link className="mt-5 btn btn-block mybtn bg-color tx-tfm" to={PATHS.HOMEPAGE}>Find Recipes</Link>
                </div>
                </>
            )
            }
            </div>
        </div>
    )
}

export default MyRecipes