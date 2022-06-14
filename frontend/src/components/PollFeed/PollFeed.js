import './PollFeed.css';
import {PollDisplayFeed} from '../PollDisplay';
import { useDispatch, useSelector } from 'react-redux';
import TitleBar from '../TitleBar';
import { LoadingIcon } from '../Logo';
import { getOnePoll, getPolls, getPollsRecent, getPollsHot, getPollsUser } from '../../store/poll';
import { useEffect, useState } from 'react';


const PollFeed = ({ type, title }) => {
  const dispatch = useDispatch();


  const userId = useSelector(state => state.session.user.id)
  const polls = useSelector(state => state.poll.allPolls);
  const polls2 = useSelector(state => state.poll);

  const [loaded, setLoaded] = useState(false);
  const [allPolls, setAllPolls] = useState([])

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
    }
  },[dispatch, type])

  // useEffect(() => {
  //   // setAllPolls(Object.values(polls))
  //   dispatch(getPollsHot())
  //   .then((returnPolls) => {
  //     console.log(returnPolls)
  //     setAllPolls(returnPolls)
  //     return returnPolls
  //   })
  // },[polls, polls2])

    //scrolls window to top on page load
    const scrollToTop = () => {
      console.log('scrolling func')
      document.getElementById("root").scrollTo(0, 0);
      };

    useEffect(() => {
      console.log('scrolling')
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
          <PollDisplayFeed pollSend={poll} key={poll.id} />
        )
      })}
    </div>
  )
}

export default PollFeed;
