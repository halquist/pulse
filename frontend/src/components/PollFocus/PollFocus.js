import { useParams } from 'react-router-dom';
import PollDisplay from "../PollDisplay"
import { PollDisplayFeed } from '../PollDisplay';
import TitleBar from '../TitleBar';
import CommentFeed from '../CommentFeed';
import { CommentForm } from '../CommentFeed';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePoll } from '../../store/poll';
import { LoadingIcon } from '../Logo';


import './PollFocus.css'


const PollFocus = ({ type, title }) => {
  const dispatch = useDispatch();

  const { pollId } = useParams();

  const onePoll = useSelector(state => state.poll.singlePoll);

  const [addComment, setAddComment] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [sendPoll, setSendPoll] = useState(onePoll || null)

  useEffect(() => {
    dispatch(getOnePoll(pollId))
      .then((poll) => {
        setSendPoll(poll)
        return poll
      })
      .then((poll) =>{
        if(poll){
        setLoaded(true)
        }
      })
  },[dispatch, pollId])

  // console.log('onePoll', onePoll, onePoll === null || !onePoll)

  const showAddComment = () => {
    setAddComment(!addComment)
  }

  //scrolls window to top on page load
  const scrollToTop = () => {
  document.getElementById("root").scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop()
  },[])

  if (!loaded || !sendPoll) {
    // console.log('not loaded', loaded)
    return (
        <LoadingIcon />
    )
  };

  console.log(sendPoll)

  return (
    <div className='pollFeedDisplayDiv'>
      <TitleBar title='Poll Focus' />
        {/* <PollDisplay pollId={pollId} /> */}
         <PollDisplayFeed pollSend={sendPoll} type='focus' />
      <div className='spacer' ></div>
      <TitleBar title='Comments' button='comment' callback={showAddComment} />
      {addComment &&
      <div id='addCommentContainer'>
        <CommentForm callback={showAddComment} commentId={null} topLevel={true} labelColor='lightLabel'/>
      </div>
      }
      <CommentFeed pollId={pollId} />
    </div>
  )
}

export default PollFocus
