import "../../App.js"
import "./Home.css"

import Category from "../../components/Category/Category.jsx"
import Searchbar from "../../components/Searchbar/Searchbar";
import Footer from "../../components/Footer/Footer.jsx";
import { Link } from "react-router-dom";


function HomePage(props) {

  const { setSearchState } = props

  let hour = (new Date().getHours())
  let msg = ''

  if(hour < 12)          msg = 'for breakfast' 
  if(hour >= 12 && hour < 19) msg= 'to eat'              //We compare the current time to display one message or the other
  if(hour >=19)           msg= 'for dinner'

  return (
    <div >
      <div className="App Home container">
        <h1>What do you want {msg} today?</h1>
          <Searchbar setSearchState={setSearchState}/>
          <div className="d-flex justify-content-around flex-wrap">
            <Link className="link-categories" to={`category/country`} >  
              <Category 
                text={'Type of food (Country)'} 
                img={'https://www.lux-review.com/wp-content/uploads/2020/03/Pasta-1.jpg'}       //Passing the necessary props to render each type of category with its image
              />
            </Link>
            <Link className="link-categories" to={`category/time`} >  
              <Category 
                text={'According to time of day'} 
                img={'https://estaticos.miarevista.es/media/cache/1140x_thumb/uploads/images/article/5feb33bd5bafe860ee3e874f/captura-de-pantalla-2020-12-29-a-las-14-51-14_0.jpg'}
              />
            </Link>
            <Link className="link-categories" to={`fastrecipes`} >  
              <Category 
                text={'Something fast?'} 
                img={'https://assets.aboutkidshealth.ca/AKHAssets/fast_food_better_choices.jpg?renditionid=21'}
              />
            </Link>
            <Link className="link-categories" to={`cocktails`} >  
              <Category 
                text={"Do we have a drink?"} 
                img={'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'}
              />
            </Link>
          </div>
      </div>
      <Footer />
    </div>
  );      
    
      
}

export default HomePage;
