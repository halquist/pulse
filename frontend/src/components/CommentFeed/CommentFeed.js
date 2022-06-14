import './CommentFeed.css';
import CommentDisplay from './CommentDisplay';
import { getComments, clearOutComments } from '../../store/comment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingIcon } from '../Logo';


const CommentFeed = ({ pollId }) => {
  const dispatch = useDispatch();

  const comments = useSelector(state => state.comment.pollComments)
  const comments2 = useSelector(state => state.comment)

  const [loaded, setLoaded] = useState(false);
  const [topComments, setTopComments] = useState(Object.entries(comments).filter(([key, value]) => {
    return (value.pollId === parseInt(pollId) && value.topLevel)
  }))
  const [numComments, setNumComments] = useState(comments.length)

  useEffect(() => {
    dispatch(clearOutComments())
  },[])

  useEffect(() => {
    dispatch(getComments(pollId))
      .then((returnComments) => {
        const topCommentsReturn = Object.entries(comments).filter(([key, value]) => {
          return (value.pollId === parseInt(pollId) && value.topLevel)
        })
        setTopComments(topCommentsReturn)
        return returnComments
      })
      .then((returnComments) => {
        setNumComments(returnComments.length)
      })
      .then(() => setLoaded(true))
  },[dispatch, comments, pollId]);

  useEffect(() => {
    const topCommentsReturn = Object.entries(comments).filter(([key, value]) => {
      return (value.pollId === parseInt(pollId) && value.topLevel)
    })
    setTopComments(topCommentsReturn)
    setNumComments(Object.keys(comments).length)
  },[comments2, comments, pollId])


  if (!loaded) {
    return (
    <div className='loadingContainer'>
        <LoadingIcon />
    </div>
    );
  }

  return (
    <div id='commentContainer'>
      <div id='commentHeader'>{numComments} Comments</div>
    {topComments.map((comment) => {
      return (
          <CommentDisplay comment={comment} comments={comments} key={comment[1].id} />
      )
    })}
    </div>
  );
};

export default CommentFeed
