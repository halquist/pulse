import { useParams } from 'react-router-dom';
import PollDisplay from "../PollDisplay"
import TitleBar from '../TitleBar';
import CommentDisplay from '../CommentDisplay';
import './PollFocus.css'


const PollFocus = () => {
  const { pollId } = useParams();

  return (
    <div className='pollFeedDisplayDiv'>
      <TitleBar title='Poll Focus' />
      <PollDisplay pollId={pollId} />
      <TitleBar title='Comments' />
      <CommentDisplay />
    </div>
  )
}

export default PollFocus
