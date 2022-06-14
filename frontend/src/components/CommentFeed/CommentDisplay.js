import './CommentFeed.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from '../../store/comment'

import CommentForm from './CommentForm';
import CommentEdit from './CommentEdit';


const CommentDisplay = ({ comment, comments }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const thisComment = comment[1]

  const [replyComments, setReplyComments] = useState(Object.entries(comments).filter(([key, value]) => {
    return (value.commentId === parseInt(thisComment.id) && !value.topLevel)
  }))

  const [showReply, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [expandedCheck, setExpandedCheck] = useState(false)
  const [expander, setExpander] = useState('[-]')


  useEffect(() => {
    setReplyComments(Object.entries(comments).filter(([key, value]) => {
      return (value.commentId === parseInt(thisComment.id) && !value.topLevel)
    }))
  },[comment, comments, thisComment.id])

  const showReplyFunc = () => {
    setShowReply(!showReply)
  }

  const showEditFunc = () => {
    setShowEdit(!showEdit)
  }

  const showDeleteFunc = () => {
    setShowDelete(!showDelete)
  }

  // handles deletion of comment
  const handleDelete = async () => {
    const id = thisComment.id;
    let deleteComment = await dispatch(commentActions.removeComment(id))
      if (deleteComment.comment.message === 'Success') {
        showDeleteFunc()
      }
  }

  const expanderFunc = () => {
    setExpandedCheck((prev) => !prev)
    setExpander((prev) => prev === '[-]' ? '[+]' : '[-]')
  }


  return (
    <div className='singleCommentContainer' >
      <div className='commentUserBar' >
        {replyComments.length ?
        <div className='expander' onClick={expanderFunc}>{expander}</div> :
        <div className='expander' >{expander}</div>
        }
        <div className='commentUser' >{thisComment.User.username}</div>
        {expandedCheck && replyComments.length > 0 && <div className='collapsed'>(collapsed)</div>}
      </div>
      {!showEdit ?
        <div className='commentText' >{thisComment.body}</div> :
        <CommentEdit comment={thisComment} callback={showEditFunc} />
      }
      <div className='commentBottomBar'>
        {sessionUser?.id === thisComment.User.id &&
          <>
            <div className='commentReply' onClick={showEditFunc}>Edit</div>
            <div className='commentReply' onClick={showDeleteFunc}>Delete</div>
          </>
        }
        <div className='commentReply' onClick={showReplyFunc}>Reply</div>
      </div>
      {showDelete &&
         <>
         <div className='commentDeleteConfirmText'>Are you sure you want to delete this comment?</div>
         <div className='pollDeleteBar'>
           <button onClick={showDeleteFunc} className='pinkButton'>Cancel</button>
           <button onClick={handleDelete} className='greenButton'>Delete</button>
         </div>
       </>
      }
      {showReply &&
        <div className='replyForm'>
          <CommentForm callback={showReplyFunc} commentId={thisComment.id} topLevel={false} labelColor='darkLabel'/>
        </div>
      }
      {!expandedCheck && replyComments.map((comment) => {
        return (
          <CommentDisplay comment={comment} comments={comments} key={comment[1].id}/>
        )
      })}
    </div>
  )
}

export default CommentDisplay
