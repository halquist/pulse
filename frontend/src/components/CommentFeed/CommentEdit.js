import { useState } from "react";
import { useDispatch } from 'react-redux';
import * as commentActions from '../../store/comment'

import './CommentFeed.css'

const CommentEdit = ({ comment, callback }) => {
  const dispatch = useDispatch();

  const [body, setBody] = useState(comment.body)
  const [errors, setErrors] = useState([]);

   // submits edit request for comment to database
 const handleEdit = async (e) => {
  e.preventDefault();
  setErrors([]);
    let newComment = await dispatch(commentActions.editComment({ id: comment.id, body, userId: comment.userId }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      if (newComment) {
        callback();
      }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setBody(comment.body);
    callback();
  };

  return (
    <div>
      <div id='pollErrors'>
        {
          errors.map((error, i) => {
            return <div id={i} key={i} >{error}</div>
          })
        }
      </div>
      <form onSubmit={handleEdit} id='createCommentForm'>
        <label htmlFor='body' id='commentLabel'>Comment:</label>
        <textarea
                  id='commentInput'
                  name='body'
                  type='text'
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  >
        </textarea>
        <div id='commentButtonBar'>
          <button onClick={handleEdit} className='pinkButton'>Edit Comment</button>
          <button className='greenButton' onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default CommentEdit
