import './CommentFeed.css'
import { useEffect, useState } from 'react';


const CommentDisplay = ({ comment, comments }) => {
  const thisComment = comment[1]

  const [replyComments, setReplyComments] = useState(Object.entries(comments).filter(([key, value]) => {
    return (value.commentId === parseInt(thisComment.id) && !value.topLevel)
  }))

  return (
    <div className='singleCommentContainer' >
      <div className='commentUserBar' >
        <div className='commentUser' >{thisComment.User.username}</div>
      </div>
      <div className='commentText' >{thisComment.body}</div>
      {replyComments.map((comment) => {
        return (
          <CommentDisplay comment={comment} comments={comments} key={comment[1].id}/>
        )
      })}
    </div>
  )
}

export default CommentDisplay
