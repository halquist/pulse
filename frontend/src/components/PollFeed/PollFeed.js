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

  const [loaded, setLoaded] = useState(false);
  const [allPolls, setAllPolls] = useState([])


  useEffect(() =>{
    dispatch(getPolls())
      .then((returnPolls) => {
        setAllPolls(returnPolls)
        return returnPolls
      })
      .then(() => setLoaded(true))
  },[dispatch])

  if (!loaded) {
    return (
    <div className='loadingContainer'>
        <LoadingIcon />
    </div>
    )
  };

  return (
    <div className='pollFeedDisplayDiv'>
      {allPolls.map((poll) => {
        return (
          <PollDisplayFeed pollSend={poll} />
        )
      })}
    </div>
  )
}

export default PollFeed;
