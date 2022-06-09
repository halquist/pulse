import { useParams } from 'react-router-dom';
import PollDisplay from "../PollDisplay"
import TitleBar from '../TitleBar';
import CommentFeed from '../CommentFeed';


import './PollFocus.css'


const PollFocus = () => {
  const { pollId } = useParams();

  return (
    <div className='pollFeedDisplayDiv'>
      <TitleBar title='Poll Focus' />
        <PollDisplay pollId={pollId} />
      <TitleBar title='Comments' button='comment'/>
      <CommentFeed pollId={pollId} />
    </div>
  )
}

export default PollFocus
