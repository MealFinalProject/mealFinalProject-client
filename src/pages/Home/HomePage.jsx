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
            <Categories />
            <Categories />
            <Categories />
          </div>
      </div>
      
    </div>
  );      
    
      
}

export default HomePage;
