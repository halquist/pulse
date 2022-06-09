import './CommentFeed.css'
import CommentDisplay from './CommentDisplay';
import { getComments } from '../../store/comment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingIcon } from '../Logo';


const CommentFeed = ({ pollId }) => {
  const dispatch = useDispatch();

  const comments = useSelector(state => state.comment.pollComments)

  const [loaded, setLoaded] = useState(false);
  const [topComments, setTopComments] = useState(Object.entries(comments).filter(([key, value]) => {
    return (value.pollId === parseInt(pollId) && value.topLevel)
  }))


  useEffect(() => {
    dispatch(getComments(pollId))
      .then(() => setTopComments(Object.entries(comments).filter(([key, value]) => {
        return (value.pollId === parseInt(pollId) && value.topLevel)
      })))
      .then(() => setLoaded(true))
  },[dispatch]);

  if (!loaded) {
    return (
    <div className='loadingContainer'>
        <LoadingIcon />
    </div>
    );
  }

  return (
    <div>
    {topComments.map((comment) => {
      return (
          <CommentDisplay comment={comment} comments={comments} key={comment[1].id} />
      )
    })}
    </div>
  );
};

export default CommentFeed