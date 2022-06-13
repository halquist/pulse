import './PollFeed.css';
import {PollDisplayFeed} from '../PollDisplay';
import { useDispatch, useSelector } from 'react-redux';
import TitleBar from '../TitleBar';
import { LoadingIcon } from '../Logo';
import { getOnePoll, getPolls } from '../../store/poll';
import { useEffect, useState } from 'react';


const PollFeed = () => {
  const dispatch = useDispatch();

  const polls = useSelector(state => state.poll.allPolls);
  const polls2 = useSelector(state => state.poll);

  const [loaded, setLoaded] = useState(false);
  const [allPolls, setAllPolls] = useState([])


  useEffect(() => {
    dispatch(getPolls())
      .then((returnPolls) => {
        setAllPolls(returnPolls)
        return returnPolls
      })
      .then(() => setLoaded(true))
  },[dispatch])

  useEffect(() => {
    setAllPolls(Object.values(polls).reverse())
  },[polls, polls2])


  if (!loaded) {
    return (
        <LoadingIcon />
    )
  };

  return (
    <div className='pollFeedDisplayDiv'>
      <TitleBar title='Latest Polls' />
      {allPolls.map((poll) => {
        return (
          <PollDisplayFeed pollSend={poll} key={poll.id} />
        )
      })}
    </div>
  )
}

export default PollFeed;
