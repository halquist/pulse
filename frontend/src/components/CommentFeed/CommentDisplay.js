import './CommentFeed.css'
import { useEffect, useState } from 'react';
import CommentForm from './CommentForm';


const CommentDisplay = ({ comment, comments }) => {
  const thisComment = comment[1]

  const [replyComments, setReplyComments] = useState(Object.entries(comments).filter(([key, value]) => {
    return (value.commentId === parseInt(thisComment.id) && !value.topLevel)
  }))

  const [showReply, setShowReply] = useState(false);


  useEffect(() => {
    setReplyComments(Object.entries(comments).filter(([key, value]) => {
      return (value.commentId === parseInt(thisComment.id) && !value.topLevel)
    }))
  },[comment])

  const showReplyFunc = () => {
    setShowReply(!showReply)
  }

  return (
    <div className='singleCommentContainer' >
      <div className='commentUserBar' >
        <div className='commentUser' >{thisComment.User.username}</div>
      </div>
      <div className='commentText' >{thisComment.body}</div>
      <div className='commentBottomBar'>
        <div className='commentReply' onClick={showReplyFunc}>Reply</div>
      </div>
      {showReply &&
        <div className='replyForm'>
          <CommentForm callback={showReplyFunc} commentId={thisComment.id} topLevel={false} />
        </div>
      }
      {replyComments.map((comment) => {
        return (
          <CommentDisplay comment={comment} comments={comments} key={comment[1].id}/>
        )
      })}
    </div>
  )
}

export default CommentDisplay
