import "../../App.js"
import "./Home.css"

import Categories from "../../components/Categories/Categories.jsx"
import Searchbar from "../../components/Searchbar/Searchbar";



function HomePage() {
  return (
    <div>
      <div className="App Home container">
        <h1>What do you want to eat today?</h1>
          <Searchbar />
          <div className="d-flex justify-content-around flex-wrap">
            <Categories text={'Type of food (Country)'} img={'https://www.lux-review.com/wp-content/uploads/2020/03/Pasta-1.jpg'}/>
            <Categories text={'According to time of day'} img={'https://estaticos.miarevista.es/media/cache/1140x_thumb/uploads/images/article/5feb33bd5bafe860ee3e874f/captura-de-pantalla-2020-12-29-a-las-14-51-14_0.jpg'}/>
            <Categories text={'Something fast?'} img={'https://assets.aboutkidshealth.ca/AKHAssets/fast_food_better_choices.jpg?renditionid=21'}/>
            <Categories text={"What's left in the fridge?"} img={'https://www.gannett-cdn.com/presto/2020/08/04/USAT/0014f6e5-9efe-47e5-a31e-259ff584e567-Fridge1.jpeg?crop=727,545,x123,y2&quality=50&width=640'}/>
          </div>
      </div>
      
    </div>
  );      
    
      
}

export default HomePage;
