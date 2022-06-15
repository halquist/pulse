import './PollFeed.css';
import { PollDisplayFeed } from '../PollDisplay';
import { useDispatch, useSelector } from 'react-redux';
import TitleBar from '../TitleBar';
import { LoadingIcon } from '../Logo';
import { getOnePoll, getPolls, getPollsRecent, getPollsHot, getPollsUser } from '../../store/poll';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";


const PollFeed = ({ type, title }) => {
  const dispatch = useDispatch();

  let { otherUserId } = useParams();

  // console.log(otherUserId);

  console.log('pollfeed hot', type, title )

  const userId = useSelector(state => state.session.user.id);
  const polls = useSelector(state => state.poll.allPolls);

  const [loaded, setLoaded] = useState(false);
  const [allPolls, setAllPolls] = useState([]);
  const [deletePoll, setDeletePoll] = useState([]);

  useEffect(() => {
    if (type === 'latest') {
    dispatch(getPollsRecent())
      .then((returnPolls) => {
        setAllPolls(returnPolls)
        return returnPolls
      })
      .then(() => setLoaded(true))
    } else if (type === 'hot') {
    dispatch(getPollsHot())
      .then((returnPolls) => {
        setAllPolls(returnPolls)
        return returnPolls
      })
      .then(() => setLoaded(true))
    } else if (type === 'user') {
    dispatch(getPollsUser(userId))
      .then((returnPolls) => {
        setAllPolls(returnPolls)
        return returnPolls
      })
      .then(() => setLoaded(true))
    }  else if (type === 'otherUser') {
    dispatch(getPollsUser(otherUserId))
      .then((returnPolls) => {
        setAllPolls(returnPolls)
        return returnPolls
      })
      .then(() => setLoaded(true))
    } else {
      return
    }
  },[dispatch, type, polls, userId, deletePoll, otherUserId])

  // useEffect(() => {
  //     setAllPolls(polls)
  // },[polls])

    //scrolls window to top on page load
    const scrollToTop = () => {
      document.getElementById("root").scrollTo(0, 0);
      };

    useEffect(() => {
      scrollToTop()
    },[type])


  if (!loaded) {
    return (
        <LoadingIcon />
    )
  };

  return (
    <div className='pollFeedDisplayDiv'>
      <TitleBar title={title} />
      {allPolls.map((poll) => {
        return (
          <PollDisplayFeed pollSend={poll} type={type} deletedPoll={setDeletePoll} key={poll.id} />
        )
      })}
      <div id='feedSpacerDiv'></div>
    </div>
  )
}

export default PollFeed;
