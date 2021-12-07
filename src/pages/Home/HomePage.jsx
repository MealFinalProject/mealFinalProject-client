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
            <Categories />
            <Categories />
            <Categories />
            <Categories />
          </div>
      </div>
      
    </div>
  );      
    
      
}

export default HomePage;
