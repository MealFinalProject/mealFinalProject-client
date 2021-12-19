import './UserIcons.css'

const UserIcons = ( {userFromDB} ) => {

    return(
        <div className='d-flex align-items-center'>
            <div className='UserIcons container d-flex justify-content-start'>
                <p className='mr-5'>Followers{userFromDB.followers.length !== 0 && userFromDB.followers.length}</p>
                <p>Followed {userFromDB.followed.length !== 0 && userFromDB.followed.length}</p>
            </div>
            <div className='UserIcons container d-flex justify-content-end'>
                <i id="favsIcon" className="bi bi-heart">  {userFromDB.favs_recipes.length !== 0 && userFromDB.favs_recipes.length}</i>
                <i id="commentsIcon"  className="far fa-comment" >{userFromDB.comments.length !== 0 && userFromDB.comments.length}</i>
            </div> 
        </div>
           
      
        
    )
}

export default UserIcons