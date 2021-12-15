
const Comments = ({comments}) => {
   
    const sortedComments = comments.map(comment => comment)
    
    // Get new comments first
    sortedComments.sort((a,b) => {
        // Turn strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return (
      <div className="mt-3">
        {sortedComments.map(comment => {
            return (
                <div key={comment._id} className="card mb-3 text-start">
                    <div className="card-body">
                        <p className="h6 card-title">{comment.username}</p>
                        <p className="card-subtitle mb-2 text-muted ">{new Date(comment.updatedAt).toDateString()}</p>
                        <p className="card-text">{comment.content}</p>
                    </div>
                </div>
            )
        })}
      </div>
    );

}

export default Comments;