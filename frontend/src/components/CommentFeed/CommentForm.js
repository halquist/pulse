import './CommentFeed.css';
import * as commentActions from '../../store/comment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useState } from 'react';


const CommentForm = ({ callback, commentId, topLevel, labelColor }) => {
  const dispatch = useDispatch();

  let { pollId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const [body, setBody] = useState('');
  const [errors, setErrors] = useState([]);
  const [thisCommentId, setThisCommentId] = useState(commentId)
  const [thisTopLevel, setThisTopLevel] = useState(topLevel)

    // submits new comment to database
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors([]);
        let newComment = await dispatch(commentActions.postComment({ pollId, body, topLevel: thisTopLevel, userId: sessionUser.id, commentId: thisCommentId }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
          if (newComment) {
            setBody('');
            callback();
          }
    };

    const handleCancel = (e) => {
      e.preventDefault();
      setBody('');
      callback();
    };

  return (
    <>
      <div id='pollErrors'>
        {
          errors.map((error, i) => {
            return <div id={i} key={i} >{error}</div>
          })
        }
      </div>
      <form onSubmit={handleSubmit} id='createCommentForm'>
          <label htmlFor='body' id={`${labelColor}`}>Comment:</label>
          <textarea
                    id='commentInput'
                    name='body'
                    type='text'
                    value={body}
                    autoFocus={true}
                    onChange={e => setBody(e.target.value)}
                    >
          </textarea>
          <div id='commentButtonBar'>
            <button onClick={handleSubmit} className='pinkButton'>Post Comment</button>
            <button className='greenButton' onClick={handleCancel}>Cancel</button>
          </div>
      </form>
    </>
  )
};

export default CommentForm;
