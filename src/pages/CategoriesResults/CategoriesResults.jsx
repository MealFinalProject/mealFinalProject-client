import './CategoriesResults.css'

import { cuisineType } from '../../utils/consts'
import { mealType } from '../../utils/consts'
import { useParams } from 'react-router'


const CategoriesResults = () => {

    const name   = useParams().name
  
    return(
    <>
        {name === 'country' && (                                                        //Check the name we collect from the params and render a list with the corresponding category array
        <div className="container d-flex flex-wrap justify-content-between">
            {cuisineType.map((type, index) =>{ 
            return(
                <div className="" key={index + 1}>
                    <div className="CategoriesResults d-flex align-items-end justify-content-center" style={
                        {backgroundImage: 'url(' + `${type.img}` + ')',
                         backgroundSize: 'cover',
                        }
                     } >
                        <p className="text-white font-weight-bold">{type.name}</p>
                    </div>
                </div>
                       
            )
            })}
        </div>
        )}
        {name === 'time' && (
        <div className="container d-flex flex-wrap justify-content-between">
            {mealType.map((type, index) =>{ 
            return(
                <div className="" key={index + 1}>
                    <div className="CategoriesResults d-flex align-items-end justify-content-center" style={
                        {backgroundImage: 'url(' + `${type.img}` + ')',
                         backgroundSize: 'cover',
                        }
                     } >
                        <p className="text-white font-weight-bold">{type.name}</p>
                    </div>
                </div>
                       
            )
            })}
        </div>
        )}
    </>
)}


export default CategoriesResults