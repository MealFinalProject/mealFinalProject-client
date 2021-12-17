import './UserIcons.css'

const UserIcons = ( {userFromDB} ) => {

    console.log(userFromDB)

    return(
        <div className='UserIcons container d-flex justify-content-end'>
            <i id="favsIcon" className="bi bi-heart">  {userFromDB.favs_recipes.length !== 0 && userFromDB.favs_recipes.length}</i>
            <i id="commentsIcon"  className="far fa-comment" >{userFromDB.comments.length !== 0 && userFromDB.comments.length}</i>
        </div>
    )
}

export default UserIcons