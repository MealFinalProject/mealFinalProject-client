import { useState } from "react";

import "./NewComment.css"

const NewComment = ({newComment}) => {
    const [content, setContent] = useState("");
    const [selected, setSelected] = useState(false)
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if (content.length > 2){
          newComment(content)
          setContent('')
          setSelected(!selected)
      }
    }
  
    return (
      <>
        {!selected ? <button className="btn button-new-comment" onClick={() => setSelected(!selected)}>Add a comment</button>
        :
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control my-3"
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="btn btn-outline-secondary mx-2" type="button" onClick={() => setSelected(!selected)}><i class="bi bi-x"></i> Cancel</button>  
          <button className="btn button-new-comment mx-2" type="submit"><i class="bi bi-chat-square-text"></i> Save</button>
        </form>}
      </>
    );

}

export default NewComment;