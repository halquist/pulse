import { useParams } from 'react-router-dom';
import PollDisplay from "../PollDisplay"
import TitleBar from '../TitleBar';
import CommentFeed from '../CommentFeed';
import { CommentForm } from '../CommentFeed';
import { useState } from 'react';


import './PollFocus.css'


const PollFocus = () => {
  const { pollId } = useParams();

  const [addComment, setAddComment] = useState(false);



  const showAddComment = () => {
    setAddComment(!addComment)
  }

  return (
    <div className='pollFeedDisplayDiv'>
      <TitleBar title='Poll Focus' />
        <PollDisplay pollId={pollId} />
      <TitleBar title='Comments' button='comment' callback={showAddComment} />
      {addComment &&
      <div id='addCommentContainer'>
        <CommentForm callback={showAddComment} commentId={null} topLevel={true} />
      </div>
      }
      <CommentFeed pollId={pollId} />
    </div>
  )
}

export default PollFocus
