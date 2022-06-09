import { csrfFetch } from './csrf';

const LOAD = 'comment/LOAD';
const ADD = 'comment/ADD';
const UPDATE = 'comment/UPDATE'
const DELETE = 'comment/DELETE';

const loadComments = (comments) => {
  return {
    type: LOAD,
    comments
  }
};

const addComment = (comment) => {
  return {
    type: ADD,
    comment
  }
};

const updateComment = (comment) => {
  return {
    type: UPDATE,
    comment
  }
};

const deleteComment = (comment) => {
  return {
    type: DELETE,
    comment
  }
}

// load comments from database on load of poll focus page
export const getComments = (pollId) => async dispatch => {
  const id = parseInt(pollId, 10);
  const response = await fetch(`/api/comments/${id}`);
  if (response.ok) {
    const comments = await response.json();
    dispatch(loadComments(comments));
  }
};


// posts a new comment
export const postComment = (comment) => async (dispatch) => {
  const { body, userId, pollId, commentId, topLevel } = comment;
  const response = await csrfFetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      body,
      userId,
      pollId,
      commentId,
      topLevel
    })
  });
  const data = await response.json();
  dispatch(addComment(data));

  return data;
}

// updates a poll
export const editComment = (comment) => async (dispatch) => {
  const { body, userId, pollId, commentId, topLevel } = comment;
  const response = await csrfFetch(`/api/polls/${pollId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      body,
      userId,
      pollId,
      commentId,
      topLevel
    })
  });
  const data = await response.json();
  await dispatch(updateComment(data.comment));
  return data;
}

// deletes a comment
export const removeComment = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id
    })
  });
  const data = await response.json();
  dispatch(deleteComment(id));

  return data;
}

// returns an array of comments ordered by created date, Ascending
// const sortList = (list) => {
//   return list.sort((commentA, commentB) => {
//     return new Date(commentA.createdAt) - new Date(commentB.createdAt);
//   }).map((comment) => comment);
// };

const initialState = {
  pollComments: {}
};

const commentReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD:
      newState = Object.assign({}, state);
      action.comments.forEach(comment => {
        newState.pollComments[comment.id] = comment
      });
      return newState;
    case ADD:
      newState = Object.assign({}, state);
      newState.pollComments[action.comment.id] = action.comment;
      return newState;
    case UPDATE:
      newState = Object.assign({}, state);
      newState.pollComments[action.comment.id] = action.comment;
      return newState;
    case DELETE:
      newState = Object.assign({}, state);
      delete newState.pollComments[action.comment.id];
      return newState;
    default:
      return state;
  }
}

export default commentReducer;
