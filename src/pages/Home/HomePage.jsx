import "../../App.js"
import "./Home.css"

import Categories from "../../components/Categories/Categories.jsx"
import Searchbar from "../../components/Searchbar/Searchbar";
import Footer from "../../components/Footer/Footer.jsx";


function HomePage() {

  let hour = (new Date().getHours())
  let msg = ''

  if(hour < 12)          msg = 'for breakfast' 
  if(hour >= 12 && hour < 19) msg= 'to eat'
  if(hour >=19)           msg= 'for dinner'

  console.log(hour)
  return (
    <div >
      <div className="App Home container">
        <h1>What do you want {msg} today?</h1>
          <Searchbar />
          <div className="d-flex justify-content-around flex-wrap">
            <Categories 
              text={'Type of food (Country)'} 
              img={'https://www.lux-review.com/wp-content/uploads/2020/03/Pasta-1.jpg'}       //Passing the necessary props to render each type of category with its image
              name={'country'}
            />
            <Categories 
              text={'According to time of day'} 
              img={'https://estaticos.miarevista.es/media/cache/1140x_thumb/uploads/images/article/5feb33bd5bafe860ee3e874f/captura-de-pantalla-2020-12-29-a-las-14-51-14_0.jpg'}
              name={'time'}
            />
            <Categories 
              text={'Something fast?'} 
              img={'https://assets.aboutkidshealth.ca/AKHAssets/fast_food_better_choices.jpg?renditionid=21'}
            />
            <Categories 
              text={"Do we have a drink?"} 
              img={'https://images.unsplash.com/photo-1536935338788-846bb9981813?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'}
            />
          </div>
      </div>
      <Footer />
    </div>
  );      
    
      
}

export default HomePage;
