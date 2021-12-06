import "../App.css"

import Categories from "../components/Categories/Categories.jsx"
import Searchbar from "../components/Searchbar/Searchbar";


function HomePage() {
  return (
    <div className="App container">
      <h1>What do you want to eat today?</h1>
        <Searchbar />
        <Categories />
    </div>
  );
}

export default HomePage;
