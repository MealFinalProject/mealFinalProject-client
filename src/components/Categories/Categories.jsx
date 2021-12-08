import './Categories.css'
import * as PATHS from "../../utils/paths";

import { Link } from 'react-router-dom'

const Categories = (props) => {

    const { text, img, name} = props

    const style  = {
        backgroundImage: 'url('+ `${img}` + ')',
        backgroundSize: 'cover',
    }
  
    return(
        name ? (
        <Link className="link-categories" to={`category/${name}`} > 
          <div className="Categories d-flex align-items-end" style={style} >
            
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