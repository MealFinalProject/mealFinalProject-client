import './UserIcons.css'

const UserIcons = ( {userFromDB} ) => {

    const followers = (userFromDB.followers ? userFromDB.followers.length : 0)
    const followed = (userFromDB.followed ? userFromDB.followed.length : 0)
    const favs = (userFromDB.favs_recipes ? userFromDB.favs_recipes.length : 0)
    const comments = (userFromDB.comments ? userFromDB.comments.length : 0)

    return(
        <div className='d-flex align-items-center'>
            <div className='UserIcons container d-flex justify-content-start'>
                <p className='mr-5'>Followers {followers}</p>
                <p>Following {followed}</p>
            </div>
            <div className='UserIcons container d-flex justify-content-end'>
                <i id="favsIcon" className="bi bi-heart">  {favs}</i>
                <i id="commentsIcon"  className="far fa-comment" > {comments}</i>
            </div> 
        </div>
           
      
        
    )
}

export default UserIcons