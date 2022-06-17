import './PollDisplay.css';
import * as React from 'react'
import { Link, useHistory, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPolls } from '../../store/poll';
import { getVotes, clearOutVotes } from '../../store/uservote';
import { VotedSticker, BpmCoin, SlotSpinner } from '../Logo';
import * as pollActions from '../../store/poll'
import * as voteActions from '../../store/uservote'
import { bpmChange } from '../../store/session';
import XMark from '../XMark';
import bpm_symbol from '../../images/bpm_symbol.svg'
import PrizeArr from './PrizeArr';
import user_icon from '../../images/user_icon.svg'



const PollDisplayDemo = ({ pollSend, type, deletedPoll }) => {

  // console.log('pollsend', pollSend)



  const sessionUser = (0);
  // const onePoll = useSelector(state => state.poll.singlePoll);
  // const votes = useSelector(state => state.vote.pollVotes);

  const pollId = pollSend.id
  const onePoll = pollSend
  const votes = pollSend.UserVotes
  const comments = pollSend.Comments


  const [showDelete, setShowDelete] = useState(false);
  const [optionOneVotes, setOptionOneVotes] = useState(Object.values(votes).filter((vote) => vote.voteSelection === 1).length);
  const [optionTwoVotes, setOptionTwoVotes] = useState(Object.values(votes).filter((vote) => vote.voteSelection === 2).length);
  const [voteSelection, setVoteSelection] = useState(0);
  const [userVote, setUserVote] = useState(Object.values(votes).filter((vote) => vote?.userId === sessionUser?.id));
  const [userVoteSticker, setUserVoteSticker] = useState(userVote.length > 0);
  const [votePercent, setVotePercent] = useState(50);
  const [canVote, setCanVote] = useState(userVote[0]?.voteSelection === 0 || userVote[0]?.voteSelection === undefined);
  const [voteId, setVoteId] = useState(canVote && !userVote ? 'submitVote' : 'cannotSubmitVote')
  const [errors, setErrors] = useState([]);
  const [bpmValue, setBpmValue] = useState(0);
  const [votePercentScroll, setVotePercentScroll] = useState(50);
  const [classPass, setClassPass] = useState('');
  const [spinnerTrigger, setSpinnerTrigger] = useState(false);
  const [prizeTrigger, setPrizeTrigger] = useState(false);
  const [demoTrigger, setDemoTrigger] = useState(false);


// adds bpm when spinner is done
useEffect(() => {
  let coinTimeout;
  let resetTimeout;
  const reset = () => {
    const resetTimeout = setTimeout(() => {
    setCanVote(true);
    setUserVoteSticker(false);
    setVoteId('cannotSubmitVote');
    setClassPass('');
    setVoteSelection(0);
    setSpinnerTrigger(false);
    setPrizeTrigger(false);
    setDemoTrigger(false);
    clearTimeout(coinTimeout);
    }, 5000);
  }
  if (bpmValue >= 0 && bpmValue < 10 && demoTrigger && prizeTrigger) {
    coinTimeout = setTimeout(setClassPass('coin'), 5000);
    reset();
  } else if (bpmValue >= 10 && bpmValue < 50 && demoTrigger && prizeTrigger) {
    coinTimeout = setTimeout(setClassPass('bigCoin'), 5000);
    reset();
  } else if (bpmValue >= 50  && demoTrigger && prizeTrigger) {
    coinTimeout = setTimeout(setClassPass('megaCoin'), 5000);
    reset();
  }
  if (classPass === 'coin' || classPass === 'bigCoin' || classPass === 'megaCoin') {
    clearTimeout(coinTimeout);
  };},[prizeTrigger]);


// const reset = () => {
//   const resetTimeout = setTimeout(() => {
//   setCanVote(true);
//   setUserVoteSticker(false);
//   setVoteId('submitVote');
//   setClassPass('');
//   setVoteSelection(0);
//   setSpinnerTrigger(false);
//   setPrizeTrigger(false);
//   setDemoTrigger(false);
//   }, 5000);
// }

// allows for a gradual change on the percent bar
useEffect(() => {
  let percentScrollTimeout;
  if (votePercent > votePercentScroll) {
    percentScrollTimeout = setTimeout(()=> setVotePercentScroll((prev)=> prev + 1), 1);
  } else if (votePercent < votePercentScroll) {
    percentScrollTimeout = setTimeout(()=> setVotePercentScroll((prev)=> prev - 1), 1);
  } else {
    clearTimeout(percentScrollTimeout);
  }
},[votePercent, votePercentScroll])

useEffect(() => {
  const opOneVotes = pollSend.UserVotes.filter((vote) => vote.voteSelection === 1).length
  setOptionOneVotes(opOneVotes);
  const opTwoVotes = pollSend.UserVotes.filter((vote) => vote.voteSelection === 2).length
      setOptionTwoVotes(opTwoVotes);
  const percent = Math.floor((opOneVotes / (opOneVotes + opTwoVotes)) * 100)
  setVotePercent(percent);
},[])


// useEffect(()=> {
//   setClassPass('')
//   dispatch(getVotes(pollId))
//     .then((returnVotes) => {
//       // counts how many votes exist for option one
//       const opOneVotes = returnVotes.filter((vote) => vote.voteSelection === 1).length
//       setOptionOneVotes(opOneVotes);
//       return { returnVotes, opOneVotes };
//     })
//     .then(({ returnVotes, opOneVotes }) => {
//       // counts how many votes exist for option two
//       const opTwoVotes = returnVotes.filter((vote) => vote.voteSelection === 2).length
//       setOptionTwoVotes(opTwoVotes);
//       return { returnVotes, opOneVotes, opTwoVotes };
//     })
//     .then(({ returnVotes, opOneVotes, opTwoVotes }) => {
//       // creates a percentage value for option one to display, option 2 percent will also be based on this value
//       const percent = Math.floor((opOneVotes / (opOneVotes + opTwoVotes)) * 100)
//       setVotePercent(percent);
//       // setVotePercentScroll(percent);
//       return { returnVotes, opOneVotes, opTwoVotes };
//     })
//     .then(({ returnVotes, opOneVotes, opTwoVotes }) => {
//       // sets how much bpm voting on a poll is worth based on how many votes already exist
//       // const numVotes = opOneVotes + opTwoVotes;
//       // let bpmValue = 1;
//       // if (numVotes <= 1) {
//       //   bpmValue = 10
//       // } else if (numVotes <= 2) {
//       //   bpmValue = 8
//       // } else if (numVotes <= 3) {
//       //   bpmValue = 6
//       // } else if (numVotes <= 4) {
//       //   bpmValue = 4
//       // } else if (numVotes <= 5) {
//       //   bpmValue = 2
//       // } else if (numVotes <= 10) {
//       //   bpmValue = 1
//       // }
//       // setBpmValue(bpmValue)
//       return { returnVotes, opOneVotes, opTwoVotes };
//     })
//     .then(({ returnVotes, opOneVotes, opTwoVotes }) => {
//       dispatch(pollActions.editPollVotes(pollId, opOneVotes, opTwoVotes))
//     })
// },[optionOneVotes, optionTwoVotes, userVote])


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

  // submits user poll vote
  const handleVote = async () => {
    if (voteSelection === 1){
    setOptionOneVotes(prev => prev +1);
    setVotePercent(Math.floor(((optionOneVotes + 1) / ((optionOneVotes + 1) + optionTwoVotes)) * 100));
    }
    if (voteSelection === 2){
      setOptionTwoVotes(prev => prev + 1);
      setVotePercent(Math.floor((optionOneVotes / (optionOneVotes + (optionTwoVotes + 1))) * 100));
    }
    setCanVote(false);
    setUserVoteSticker(true);
    setVoteId('cannotSubmitVote');
    setBpmValue(PrizeArr[Math.floor(Math.random() * 100)]);
    setSpinnerTrigger(true);
    setDemoTrigger(true);
  };

  // if (!loaded || !data) {
  //   return (
  //   <div className='loadingContainer'>
  //       <LoadingIcon />
  //   </div>
  //   )
  // };

  return (
    <div className='tempPollContainer'>
      <div className='pollDisplayDivFeed'>
        <div className='pollDisplayTopBar'>
            <Link to={`/pollfeed/${onePoll.User.id}/user`} className='pollDisplayUsernameLink'>
              <div className='profileIcon' style={{
                backgroundImage: `url(${pollSend.User.profileImageUrl || user_icon})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}></div>
              <div className='pollDisplayUsername'>{onePoll.User.username}</div>
            </Link>
         {spinnerTrigger &&
            <div className='spinnerContainer'>
              <BpmCoin classPass={classPass}/>
              <div className='bpmValueDisplaySpinner'>
              <div className='spinnerHighlight'></div>
                <img src={bpm_symbol} width="14" height="14" className='bpmIcon'/>
                <SlotSpinner number={bpmValue} trigger={setPrizeTrigger} />
                {/* <div className='bpmDisplayTextDark'>bpm</div> */}
              </div>
            </div>
          }
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
            <div className='pollVoteHighlight'></div>
            <div className='voteBoxPink'>
              <div className={`voteCheck ${voteSelection === 1 || userVote[0]?.voteSelection === 1 ? 'visible' : 'invisible'}`}><XMark /></div>
            </div>
            <div className='optionOneText'>{onePoll.optionOneTitle}</div>
          </div>
          <div className='pollDisplayOptionTwo' onClick={() => handleSetVote(2)}>
            <div className='pollVoteHighlight'></div>
            <div className='voteBoxGreen'>
              <div className={`voteCheck ${voteSelection === 2 || userVote[0]?.voteSelection === 2 ? 'visible' : 'invisible'}`}><XMark /></div>
            </div>
            <div className='optionTwoText'>{onePoll.optionTwoTitle}</div>
          </div>
        </div>
        <div className='votePercentageBar'>
          <div className='optionOnePercent' style={{ width: `${votePercentScroll}%` }}>
          <div className='percentText'>{votePercentScroll ? `${votePercentScroll}%` : `0%`}</div>
            </div>
          <div className='optionTwoPercent' style={{ width: `${100 - votePercentScroll}%` }}>
          <div className='percentText'>{100 - votePercentScroll ? `${100 - votePercentScroll}%` : `0%`}</div>
            </div>
        </div>
        <div className='pollDisplayBottomBar'>
          <Link to={`/polls/${pollSend.id}`}>
            <div className='pollDisplayCommentNum'>
              <div className='voteText'>
                {comments.length} Comments
              </div>
            </div>
          </Link>
          {userVoteSticker === true ?
            <div className={`${voteId}`} >
              <div className='voteText'>Vote -</div>
              <img src={bpm_symbol} width="14" height="14" className='bpmIcon'/>
              <div className='voteText'>1</div>
              <VotedSticker />
            </div> :
            <div className={`${voteId}`} onClick={handleVote}>
              <div className='voteText'>Vote -</div>
              <img src={bpm_symbol} width="14" height="14" className='bpmIcon'/>
              <div className='voteText'>1</div>
            </div>
          }
        </div>
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

export default PollDisplayDemo;
