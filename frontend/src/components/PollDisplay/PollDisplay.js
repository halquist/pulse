import './PollDisplay.css';
import * as React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOnePoll, getPolls } from '../../store/poll';
import { getVotes, clearOutVotes } from '../../store/uservote';
import { LoadingIcon, VotedSticker } from '../Logo';
import * as pollActions from '../../store/poll'
import * as voteActions from '../../store/uservote'
import XMark from '../XMark';

const PollDisplay = ({ pollId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { pollId } = useParams();

  const sessionUser = useSelector(state => state.session.user);
  const onePoll = useSelector(state => state.poll.singlePoll);
  const votes = useSelector(state => state.vote.pollVotes);
  const votes2 = useSelector(state => state.vote);

  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(false);
  const [votePercent, setVotePercent] = useState(50);
  const [showDelete, setShowDelete] = useState(false);
  const [optionOneVotes, setOptionOneVotes] = useState(Object.values(votes).filter((vote) => vote.voteSelection === 1 && vote.pollId === pollId).length);
  const [optionTwoVotes, setOptionTwoVotes] = useState(Object.values(votes).filter((vote) => vote.voteSelection === 2 && vote.pollId === pollId).length);
  const [voteSelection, setVoteSelection] = useState(0);
  const [userVote, setUserVote] = useState(Object.values(votes).filter((vote) => vote.userId === sessionUser.id))
  const [userVoteSticker, setUserVoteSticker] = useState(userVote.length > 0)
  const [canVote, setCanVote] = useState(userVote[0]?.voteSelection === 0 || userVote[0]?.voteSelection === undefined)
  const [voteId, setVoteId] = useState(canVote ? 'submitVote' : 'cannotSubmitVote')
  const [voteBarChange, setVoteBarChange] = useState(false)
  const [optionOneVotesDisplay, setOptionOneVotesDisplay] = useState(0);
  const [optionTwoVotesDisplay, setOptionTwoVotesDisplay] = useState(0);

  const [errors, setErrors] = useState([]);


  // console.log(userVote)
  // console.log('pollId', pollId)
  // console.log('uservote pollId', userVote[0]?.pollId)
  // console.log(parseInt(pollId) !== userVote[0]?.pollId)
  //  console.log('wooooooo', canVote, userVote[0]?.voteSelection)
  //  console.log(voteId)
  //  console.log('sticker', userVoteSticker)

  // strict dispatch and state setting order to make sure all data is properly presented in the poll display
   useEffect(() => {
    dispatch(clearOutVotes())
      .then(() => dispatch(getPolls()))
      .then(() => dispatch(getOnePoll(pollId)))
      .then(() => dispatch(getVotes(pollId))
        .then((returnVotes) => {
          // counts how many votes exist for option one
          const opOneVotes = returnVotes.filter((vote) => vote.voteSelection === 1).length
          setOptionOneVotes(opOneVotes);
          return { returnVotes, opOneVotes };
        })
        .then(({ returnVotes, opOneVotes }) => {
          // counts how many votes exist for option two
          const opTwoVotes = returnVotes.filter((vote) => vote.voteSelection === 2).length
          setOptionTwoVotes(opTwoVotes);
          return { returnVotes, opOneVotes, opTwoVotes };
        })
        .then(({ returnVotes, opOneVotes, opTwoVotes }) => {
          // creates a percentage value for option one to display, option 2 percent will also be based on this value
          setVotePercent(Math.floor((opOneVotes / (opOneVotes + opTwoVotes)) * 100));
          return returnVotes;
        })
        .then((returnVotes) => {
          // finds a vote if current user has already voted on this poll
          const userVoteSet = returnVotes.filter((vote) => vote.userId === sessionUser.id)
          setUserVote(userVoteSet);
          return { returnVotes, userVoteSet };
        })
        .then(({ returnVotes, userVoteSet }) => {
          // if current user has voted on this poll this value is true, and determines if voted sticker is displayed
          setUserVoteSticker(userVoteSet.length > 0)
          return { returnVotes, userVoteSet };
        })
        .then(({ returnVotes, userVoteSet }) => {
          // disables vote buttons if user has already voted on this poll
          const canVoteSet = userVoteSet[0]?.voteSelection === 0 || userVoteSet[0]?.voteSelection === undefined
          setCanVote(canVoteSet)
          return { returnVotes, userVoteSet, canVoteSet };
        })
        .then(({ returnVotes, userVoteSet, canVoteSet }) => {
          // sets which option the user has voted on so it can be displayed
          const voteIdSet = canVoteSet && userVoteSet?.voteSelection === 0 ? 'submitVote' : 'cannotSubmitVote'
          setVoteId(voteIdSet)
        })
        .then(() => setData(true))
        .then(() => setLoaded(true))
      )
  },[dispatch])


  useEffect(()=> {
    dispatch(getVotes(pollId))
      .then((returnVotes) => {
        // counts how many votes exist for option one
        const opOneVotes = returnVotes.filter((vote) => vote.voteSelection === 1).length
        setOptionOneVotes(opOneVotes);
        return { returnVotes, opOneVotes };
      })
      .then(({ returnVotes, opOneVotes }) => {
        // counts how many votes exist for option two
        const opTwoVotes = returnVotes.filter((vote) => vote.voteSelection === 2).length
        setOptionTwoVotes(opTwoVotes);
        return { returnVotes, opOneVotes, opTwoVotes };
      })
      .then(({ returnVotes, opOneVotes, opTwoVotes }) => {
        // creates a percentage value for option one to display, option 2 percent will also be based on this value
        setVotePercent(Math.floor((opOneVotes / (opOneVotes + opTwoVotes)) * 100));
        return returnVotes;
      })
    // setVotePercent(Math.floor((optionOneVotes / (optionOneVotes + optionTwoVotes)) * 100));
  },[optionOneVotes, optionTwoVotes, userVote])

  // useEffect(() => {
  //   dispatch(clearOutVotes())
  //   dispatch(getPolls())
  //   dispatch(getOnePoll(pollId))
  //     .then(() => setLoaded(true))
  //   dispatch(getVotes(pollId))
  //     .then(() => setUserVote(Object.values(votes).filter((vote) => vote.userId === sessionUser.id)))
  //     .then(() => setUserVoteSticker(userVote.length > 0))
  //     .then(() => setOptionOneVotes(Object.values(votes).filter((vote) => vote.voteSelection === 1 && vote.pollId === onePoll.id).length))
  //     .then(() => setOptionTwoVotes(Object.values(votes).filter((vote) => vote.voteSelection === 2 && vote.pollId === onePoll.id).length))
  //     .then(() => setUserVote(Object.values(votes).filter((vote) => vote.userId === sessionUser.id)))
  //     .then(() => setCanVote(userVote[0]?.voteSelection === 0 || userVote[0]?.voteSelection === undefined))
  //     .then(() => setVoteId('cannotSubmitVote'))
  //     .then(() => setVoteBarChange(optionOneVotes !== optionOneVotesDisplay || optionTwoVotes !== optionTwoVotesDisplay))
  //     .then(() => setData(true))
  // },[dispatch])


  // useEffect(() => {
  //   dispatch(getPolls())
  //   dispatch(getOnePoll(pollId))
  //     .then(() => setLoaded(true))
  //   dispatch(getVotes(pollId))
  //     .then(() => setUserVote(Object.values(votes).filter((vote) => vote.userId === sessionUser.id)))
  //     .then(() => setUserVoteSticker(userVote.length > 0))
  //     .then(() => setOptionOneVotes(Object.values(votes).filter((vote) => vote.voteSelection === 1 && vote.pollId === onePoll.id).length))
  //     .then(() => setOptionTwoVotes(Object.values(votes).filter((vote) => vote.voteSelection === 2 && vote.pollId === onePoll.id).length))
  //     .then(() => setUserVote(Object.values(votes).filter((vote) => vote.userId === sessionUser.id)))
  //     .then(() => setData(true))
  // },[dispatch, pollId, onePoll.id, sessionUser.id, userVote.length, votes]);

  // useEffect(() => {
  //   setOptionOneVotes(Object.values(votes).filter((vote) => vote.voteSelection === 1 && vote.pollId === onePoll.id).length)
  //   setOptionTwoVotes(Object.values(votes).filter((vote) => vote.voteSelection === 2 && vote.pollId === onePoll.id).length)
  //   setVotePercent(Math.floor((optionOneVotes / (optionOneVotes + optionTwoVotes)) * 100))
  //   setUserVote(Object.values(votes).filter((vote) => vote.userId === sessionUser.id))
  //   setUserVoteSticker(userVote.length > 0)
  //   setCanVote(userVote[0]?.voteSelection === 0 || userVote[0]?.voteSelection === undefined)
  //   setVoteId('cannotSubmitVote')
  // },[onePoll, optionOneVotes, optionTwoVotes, votes, sessionUser.id, userVote.length, pollId, userVote.pollId]);

  // useEffect(() => {
  //   setOptionOneVotes(Object.values(votes).filter((vote) => vote.voteSelection === 1 && vote.pollId === onePoll.id).length)
  //   setOptionTwoVotes(Object.values(votes).filter((vote) => vote.voteSelection === 2 && vote.pollId === onePoll.id).length)
  //   setVotePercent(Math.floor((optionOneVotes / (optionOneVotes + optionTwoVotes)) * 100))
  //   setUserVote(Object.values(votes).filter((vote) => vote.userId === sessionUser.id))
  //   // setUserVoteSticker(userVote.length > 0)
  //   setCanVote(userVote[0]?.voteSelection === 0 || userVote[0]?.voteSelection === undefined)
  //   setVoteId('cannotSubmitVote')
  // },[votes2, onePoll.id, optionOneVotes, optionTwoVotes, sessionUser.id, votes])

  // useEffect(() => {
  //   setVoteId(canVote ? 'submitVote' : 'cannotSubmitVote')
  //   console.log(canVote, voteId)
  // },[canVote])

  // console.log(voteId)

  // useEffect(() => {
  //   if (voteBarChange) {
  //     setInterval(() => {
  //       if (optionOneVotesDisplay !== optionOneVotes) {
  //         console.log('here')
  //         if (optionOneVotesDisplay < optionOneVotes) {
  //           setOptionOneVotesDisplay((prev) => prev + 1)
  //         }
  //         if (optionOneVotesDisplay > optionOneVotes) {
  //           setOptionOneVotesDisplay((prev) => prev - 1)
  //         }
  //       }
  //       if (optionTwoVotesDisplay !== optionTwoVotes) {
  //         if (optionTwoVotesDisplay < optionTwoVotes) {
  //           setOptionTwoVotesDisplay((prev) => prev + 1)
  //         }
  //         if (optionTwoVotesDisplay > optionTwoVotes) {
  //           setOptionTwoVotesDisplay((prev) => prev - 1)
  //         }
  //       }
  //       setVotePercent(Math.floor((optionOneVotesDisplay / (optionOneVotesDisplay + optionTwoVotesDisplay)) * 100))
  //     }, 1000);
  //   }
  // })

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

  // toggles checkmark display on the 2 choices if voting is allowed for user and sets the choice value for submission
  const handleSetVote = (vote) => {
    if (canVote && voteSelection === 1 && vote === 1) {
      setVoteSelection(0);
      setVoteId('cannotSubmitVote');
    } if (canVote && voteSelection === 0 && vote === 1) {
      setVoteSelection(1);
      setVoteId('submitVote');
    } else if (canVote && voteSelection === 1 && vote === 2) {
      setVoteSelection(2);
      setVoteId('submitVote');
    } else if (canVote && voteSelection === 2 && vote === 2) {
      setVoteSelection(0);
      setVoteId('cannotSubmitVote');
    } else if (canVote && voteSelection === 0 && vote === 2) {
      setVoteSelection(2);
      setVoteId('submitVote');
    } else if (canVote && voteSelection === 2 && vote === 1) {
      setVoteSelection(1);
      setVoteId('submitVote');
    }
  };

  // submits
  const handleVote = async () => {
    if(voteSelection > 0) {
      let newVote = await dispatch(voteActions.createVote({ userId: sessionUser.id, pollId, voteSelection }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
        if (newVote) {
          setUserVote(newVote);
          setOptionOneVotes(Object.values(votes).filter((vote) => vote.voteSelection === 1 && vote.pollId === onePoll.id).length);
          setOptionTwoVotes(Object.values(votes).filter((vote) => vote.voteSelection === 2 && vote.pollId === onePoll.id).length);
          setCanVote(false);
          setUserVoteSticker(true);
          setVoteId('cannotSubmitVote');
        }
    } else {
      return;
    }
  }

  if (!loaded || !data) {
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
          <div className='pollDisplayOptionOne' onClick={() => handleSetVote(1)}>
            <div className='voteBoxPink'>
              <div className={`voteCheck ${voteSelection === 1 || userVote[0]?.voteSelection === 1 ? 'visible' : 'invisible'}`}><XMark /></div>
            </div>
            {onePoll.optionOneTitle}
          </div>
          <div className='pollDisplayOptionTwo' onClick={() => handleSetVote(2)}>
            <div className='voteBoxGreen'>
              <div className={`voteCheck ${voteSelection === 2 || userVote[0]?.voteSelection === 2 ? 'visible' : 'invisible'}`}><XMark /></div>
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
          {userVoteSticker === true ?
          <>
            <div className={`${voteId}`}>Submit Vote <VotedSticker /> </div>
          </> :
          <div className={`${voteId}`} onClick={handleVote}>Submit Vote</div>
        }
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
      <div id='pollErrors'>
        {
          errors.map((error, i) => {
            return <div id={i} key={i} >{error}</div>
          })
        }
      </div>
    </div>
  )
};

export default PollDisplay
