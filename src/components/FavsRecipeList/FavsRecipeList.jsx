import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import Card2 from "../Card2/Card2";

const FavsRecipeList = ({favsList}) => {
    
    return (
        <>  
            <div className="col-12">
                <div className="row m-0 p-0 align-items-center text-start">
                    <div className="col-4 col-xl-5 ">
                    <BackButton />
                    </div>
                    <div className="col-8 col-xl-7">
                        <p className="h4">Favorite recipes</p>
                    </div>
                </div>
                <hr />
            </div>
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