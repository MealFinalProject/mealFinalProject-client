import "../../App.js"
import "./Home.css"

import Navbar from "../../components/Navbar/Navbar";


import Card1 from "../../components/Card1/Card1.jsx"
import Searchbar from "../../components/Searchbar/Searchbar";
import Footer from "../../components/Footer/Footer.jsx";
import { Link } from "react-router-dom";
import RecipeResults from "../RecipesResults/RecipeResults.jsx";



function HomePage(props) {

  const {searchState, setSearchState, handleLogout, user, profileImageState} = props

  let hour = (new Date().getHours())
  let msg = ''

  if(hour < 12)          msg = 'for breakfast' 
  if(hour >= 12 && hour < 19) msg= 'for lunch'              //We compare the current time to display one message or the other
  if(hour >=19)           msg= 'for dinner'

  return (
    <>
      <Navbar handleLogout={handleLogout} user={user} profileImageState={profileImageState} />
      <div className="container-fluid m-0 p-0 row mt-5 text-center justify-content-center">
        <div className="col-12 mt-5 mb-4">
          <p className="h3 mt-3">What do you want {msg} today?</p>
        </div>
        <div className="col-12 col-xl-6 mb-3">
          <Searchbar searchState={searchState} setSearchState={setSearchState}/>
        </div>
        <div className="col-12">
          <div className="row p-0 m-0  justify-content-center">
            <div className="col-6 col-xl-2 px-4 my-4">
              <Link className="link-categories" to={`category/country`} >  
                <Card1 
                  text={'Type of food (Country)'} 
                  img={'https://www.lux-review.com/wp-content/uploads/2020/03/Pasta-1.jpg'}       //Passing the necessary props to render each type of category with its image
                />
              </Link>
            </div>
            <div className="col-6 col-xl-2 px-4 my-4">
              <Link className="link-categories" to={`category/time`} >  
                <Card1 
                  text={'According to time of day'} 
                  img={'https://estaticos.miarevista.es/media/cache/1140x_thumb/uploads/images/article/5feb33bd5bafe860ee3e874f/captura-de-pantalla-2020-12-29-a-las-14-51-14_0.jpg'}
                />
              </Link>
            </div>
            <div className="col-6 col-xl-2 px-4 my-4">
              <Link className="link-categories" to={`fastrecipes`} >  
                <Card1 
                  text={'Something fast?'} 
                  img={'https://assets.aboutkidshealth.ca/AKHAssets/fast_food_better_choices.jpg?renditionid=21'}
                />
              </Link>
            </div>
            <div className="col-6 col-xl-2 px-4 my-4">
              <Link className="link-categories" to={`cocktails`} >  
                <Card1 
                  text={"Do you want a drink?"} 
                  img={'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );      
    
      
}

export default HomePage;
