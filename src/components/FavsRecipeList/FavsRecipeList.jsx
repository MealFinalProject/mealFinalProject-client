import { Link } from "react-router-dom";
import Card2 from "../Card2/Card2";

const FavsRecipeList = ({favsList}) => {
    
    return (
        <>
            <p className="h4">Favorite recipes</p>
            <hr/>
            <div className="row p-0 m-0">
                {favsList.map((element) => {
                    return (
                        <div key={element.idApi} className="col-6 col-xl-2 px-4 mb-4">
                            <Link  to={`/search/${element.idApi}`}>
                                <Card2
                                key={element.idApi}
                                text={element.name}
                                img={element.photo}
                                />
                            </Link>
                        </div>
                    );
                })}
            </div>
        </>
    );

}

export default FavsRecipeList;