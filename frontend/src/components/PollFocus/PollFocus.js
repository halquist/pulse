import { useParams } from 'react-router-dom';
import PollDisplay from "../PollDisplay"
import TitleBar from '../TitleBar';
import CommentFeed from '../CommentFeed';
import { CommentForm } from '../CommentFeed';
import { useEffect, useState } from 'react';


import './PollFocus.css'


const PollFocus = () => {
  const { pollId } = useParams();

  const [addComment, setAddComment] = useState(false);

  const showAddComment = () => {
    setAddComment(!addComment)
  }

  //scrolls window to top on page load
  const scrollToTop = () => {
  console.log('scrolling')
  document.getElementById("root").scrollTo(0, 0);
  };

useEffect(() => {
  scrollToTop()
},[])

  return (
    <div className='pollFeedDisplayDiv'>
      <TitleBar title='Poll Focus' />
        <PollDisplay pollId={pollId} />
      <TitleBar title='Comments' button='comment' callback={showAddComment} />
      {addComment &&
      <div id='addCommentContainer'>
        <CommentForm callback={showAddComment} commentId={null} topLevel={true} labelColor='lightLabel'/>
      </div>
      }
      <CommentFeed pollId={pollId} />
    </div>
  )
}

export default PollFocus
