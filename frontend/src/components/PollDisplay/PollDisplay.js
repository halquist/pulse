import './PollDisplay.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOnePoll, getPolls } from '../../store/poll';
import XMark from '../XMark';

const PollDisplay = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const polls = useSelector(state => state.poll.allPolls)
  const onePoll = useSelector(state => state.poll.singlePoll)
  const [loaded, setLoaded] = useState(false);
  const [votePercent, setVotePercent] = useState(0)

  useEffect(() => {
    dispatch(getPolls())
    dispatch(getOnePoll(1))
    .then(() => setLoaded(true))
  },[dispatch])

  useEffect(() => {
    setVotePercent(Math.floor((onePoll.optionOneVotes / (onePoll.optionOneVotes + onePoll.optionTwoVotes)) * 100))
  },[onePoll])

  if (!loaded) {
    return (
    <div className='loadingContainer'>
        <h1>Loading...</h1>
    </div>
    )
}

  return (
    <div className='tempPollContainer'>
      <div className='pollDisplayDiv'>
        <div className='pollDisplayTopBar'>
          <div className='pollDisplayUsername'>{onePoll.User.username}</div>
          <div className='pollDisplayVotesNum'>{onePoll.optionOneVotes + onePoll.optionTwoVotes} Votes</div>
        </div>
        <div className='pollDisplayText'>
          <div className='pollTitle'>{onePoll.title}</div>
          <div className='pollDescription'>{onePoll.description}</div>
        </div>
        <div className='pollDisplayVoteBar'>
          <div className='pollDisplayOptionOne'>
            <div className='voteBoxPink'>
              <div className='voteCheck'><XMark /></div>
            </div>
            {onePoll.optionOneTitle}
          </div>
          <div className='pollDisplayOptionTwo'>
            <div className='voteBoxGreen'>
              <div className='voteCheck'><XMark /></div>
            </div>
              {onePoll.optionTwoTitle}
          </div>
        </div>
        <div className='votePercentageBar'>
          <div className='optionOnePercent'>{votePercent}</div>
          <div className='optionTwoPercent'>{100 - votePercent}</div>
        </div>
        <div className='pollDisplayBottomBar'>
          <div className='pollDisplayCommentNum'>{onePoll.Comments.length} Comments</div>
          <div className='submitVote'>Submit Vote</div>
        </div>
      </div>
    </div>
  )
}

export default PollDisplay
