import './Categories.css'

import { Link } from 'react-router-dom'

const Categories = (props) => {

    const { text, img, name} = props

    const style  = {
        backgroundImage: 'url('+ `${img}` + ')',       //We use the last image as props for inline styling
        backgroundSize: 'cover',
    }
  
    return(
        name ? (                                                                                //We use the past name as prop to redirect to the page with the results of that category
        <Link className="link-categories" to={`category/${name}`} >                                                                                                
          <div className="Categories d-flex align-items-end " style={style} >
            
                <p className=" m-2 text-left text-white font-weight-bold">{text}</p>
            
          </div>
         </Link>
        ) : (
            <div className="Categories d-flex align-items-end" style={style}>
            
                <p className=" m-2 text-left text-white font-weight-bold">{text}</p>
         
            </div>
        )
    )
}

export default Categories