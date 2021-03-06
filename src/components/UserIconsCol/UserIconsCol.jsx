import { Link } from 'react-router-dom'
import './UserIconsCol.css'

const UserIconsCol = ( {userFromDB} ) => {

    const followers = (userFromDB.followers ? userFromDB.followers.length : 0)
    const followed = (userFromDB.followed ? userFromDB.followed.length : 0)
    const favs = (userFromDB.favs_recipes ? userFromDB.favs_recipes.length : 0)
    const comments = (userFromDB.comments ? userFromDB.comments.length : 0)
    
    return(
        <div className="row UserIconsCol justify-content-xl-center p-0 m-0">
            <div className="col-4 col-xl-1 p-0">
                <Link to="followers" state={{title: "Followers", list: userFromDB.followers}}>
                    <p><span className="fw-light">Followers</span> {followers}</p>
                </Link>
            </div>
            <div  className="col-4 col-xl-1 p-0">
                <Link to="following" state={{title: "Following", list: userFromDB.followed}}>
                    <p><span className="fw-light">Following</span> {followed}</p>
                </Link>
            </div>
            <div className="col-2 col-xl-1 p-0">
                <i id="favsIcon" className="bi bi-heart icon p-2"><span> {favs}</span></i>  
            </div> 
            <div className="col-2 col-xl-1 p-0">
                <i id="commentsIcon"  className="bi bi-chat-square-text icon p-2" ><span> {comments}</span></i> 
            </div>
        </div>
           
      
        
    )
}

export default UserIconsCol