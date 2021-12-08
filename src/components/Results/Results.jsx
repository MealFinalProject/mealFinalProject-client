import { Link } from 'react-router-dom'

const Results = (props) => {

    const { image, label, id} = props

    const style  = {
        backgroundImage: `url(${image})`,       //We use the last image as props for inline styling
        backgroundSize: 'cover',
    }
  
    return(
                                                                           
        <Link className="link-results" to={`search/${id}`} >                                                                                                
            <div className="Results d-flex align-items-end" style={style} >
            
                <p className=" m-2 text-left text-white font-weight-bold">{label}</p>
            
            </div>
        </Link>
       
    )
}

export default Results