import './Footer.css'

const Footer = () => {

    return(
        
          <div className="Footer mt-5 fixed-bottom d-flex align-items-center flex-column justify-content-center">
            <ul>
                <li className="text-white mt-4">Santiago Jiménez 
                <a href="https://github.com/Santys"><i className="fab fa-github m-2"></i></a>
                <a href="https://www.linkedin.com/in/santiago-jim%C3%A9nez-ortiz-459706bb/"><i className="fab fa-linkedin"></i></a>
                </li>
                
                <li className="text-white mt-3">Aarón López 
                <a href="https://github.com/AaronLopezBarros"><i className="fab fa-github m-2"></i></a>
                <a href="https://www.linkedin.com/in/aaronlopezbarros/"><i className="fab fa-linkedin"></i></a>
                </li>
                

            </ul>
            </div> 
        
    )
}

export default Footer