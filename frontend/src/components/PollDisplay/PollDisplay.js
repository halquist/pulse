import * as React from 'react'
import './PollDisplay.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOnePoll, getPolls } from '../../store/poll';
import { getVotes } from '../../store/uservote';
import { LoadingIcon } from '../Logo';
import * as pollActions from '../../store/poll'
import XMark from '../XMark';

const PollDisplay = ({ pollId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const onePoll = useSelector(state => state.poll.singlePoll);
  const votes = useSelector(state => state.vote.pollVotes);
  const [loaded, setLoaded] = useState(false);
  const [votePercent, setVotePercent] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [optionOneVotes, setOptionOneVotes] = useState(Object.values(votes).filter((vote) => vote.voteSelection === 1).length);
  const [optionTwoVotes, setOptionTwoVotes] = useState(Object.values(votes).filter((vote) => vote.voteSelection === 2).length);


  useEffect(() => {
    dispatch(getPolls())
    dispatch(getVotes(pollId))
      .then(() => setOptionOneVotes(Object.values(votes).filter((vote) => vote.voteSelection === 1).length))
      .then(() => setOptionTwoVotes(Object.values(votes).filter((vote) => vote.voteSelection === 2).length))
    dispatch(getOnePoll(pollId))
      .then(() => setLoaded(true))
  },[dispatch, pollId, votes]);

  useEffect(() => {
    setVotePercent(Math.floor((optionOneVotes / (optionOneVotes + optionTwoVotes)) * 100))
  },[onePoll, optionOneVotes, optionTwoVotes]);

  // const expandText = () => {
  //   if (truncate === 'truncateBlock') {
  //     setTruncate('unTruncate')
  //   } else {
  //     setTruncate('truncateBlock')
  //   }
  // }

  // toggles showing the delete confirmation form
  const deleteForm = () => {
    setShowDelete(!showDelete)
  }

  // handles deletion of poll
  const handleDelete = async () => {
    let deletePoll = await dispatch(pollActions.removePoll(pollId))
      if (deletePoll.poll.message === 'Success') {
        history.push('/')
      }
  }


  if (!loaded) {
    return (
    <div className='loadingContainer'>
        <LoadingIcon />
    </div>
    );
  }

  return (
    <div className='tempPollContainer'>
      <div className='pollDisplayDiv'>
        <div className='pollDisplayTopBar'>
          <div className='pollDisplayUsername'>{onePoll.User.username}</div>
          <div className='pollDisplayVotesNum'>{optionOneVotes + optionTwoVotes} Votes</div>
        </div>
        <div className='pollDisplayText'>
          <div className='pollTitle'>{onePoll.title}</div>
            <div className='pollDescription'>{onePoll.description}</div>
            <div className='moreTextBar'>
              {/* { onePoll.description.length > 144 &&
                <div className='moreText' onClick={expandText}>{truncate === 'truncateBlock' ? 'Expand' : 'Collapse'}</div>
              } */}
            </div>
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
          <div className='optionOnePercent' style={{ width: `${votePercent}%` }}>
            {votePercent ? `${votePercent}%` : `0%`}
            </div>
          <div className='optionTwoPercent' style={{ width: `${100 - votePercent}%` }}>
            {100 - votePercent ? `${100 - votePercent}%` : `0%`}
            </div>
        </div>
        <div className='pollDisplayBottomBar'>
          <div className='pollDisplayCommentNum'>{onePoll.Comments.length} Comments</div>
          {sessionUser?.id === onePoll.User.id &&
            <>
              <Link to={`/polls/${onePoll.id}/edit`} className='editDiv'>Edit Poll</Link>
              <div className='editDiv' onClick={deleteForm}>Delete Poll</div>
            </>
          }
          <div className='submitVote'>Submit Vote</div>
        </div>
            {showDelete &&
              <>
                <div className='deleteConfirmText'>Are you sure you want to delete this poll?</div>
                <div className='pollDeleteBar'>
                  <button onClick={deleteForm} className='pinkButton'>Cancel</button>
                  <button onClick={handleDelete} className='greenButton'>Delete</button>
                </div>
              </>
            }
      </div>
    </div>
  )
};

export default PollDisplay
