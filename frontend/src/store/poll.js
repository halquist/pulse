import { csrfFetch } from './csrf';

const LOAD = 'poll/LOAD';
const LOAD_ONE = 'poll/LOAD_ONE'
const ADD = 'poll/ADD';
const UPDATE = 'poll/UPDATE'
const DELETE = 'poll/DELETE'

const loadPolls = (polls) => {
  return {
    type: LOAD,
    polls
  }
};

const loadOnePoll = (poll) => {
  return {
    type: LOAD_ONE,
    poll
  }
};

const addPoll = (poll) => {
  return {
    type: ADD,
    poll
  }
};

const updatePoll = (poll) => {
  return {
    type: UPDATE,
    poll
  }
};

const deletePoll = (pollId) => {
  return {
    type: DELETE,
    pollId
  }
};

// load polls from database
export const getPolls = () => async dispatch => {
  const response = await fetch(`/api/polls`);
  if (response.ok) {
    const polls = await response.json();
    dispatch(loadPolls(polls));
  }
};

// loads a particular poll into the store
export const getOnePoll = (id) => async dispatch => {
  const sendId = parseInt(id, 10);
  const response = await fetch(`/api/polls/${sendId}`)
  const poll = await response.json();
  dispatch(loadOnePoll(poll));
}

// creates a new poll
export const createPoll = (poll) => async (dispatch) => {
  const { title, description, optionOneTitle, optionTwoTitle, userId } = poll;
  const response = await csrfFetch('/api/polls', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      userId,
      optionOneTitle,
      optionTwoTitle
    })
  });
  const data = await response.json();
  dispatch(addPoll(data.poll));
  return data;
}

// updates a poll
export const editPoll = (poll) => async (dispatch) => {
  const { pollId, title, description, optionOneTitle, optionTwoTitle, userId, optionOneVotes, optionTwoVotes } = poll;
  const response = await csrfFetch(`/api/polls/${pollId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pollId,
      title,
      description,
      optionOneTitle,
      optionTwoTitle,
      userId,
      optionOneVotes,
      optionTwoVotes
    })
  });
  const data = await response.json();
  await dispatch(updatePoll(data.poll));
  return data;
}

export const removePoll = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/polls/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  dispatch(deletePoll(id));
  return data;
}


const initialState = {
  allPolls: {},
  singlePoll: {},
};

const pollReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD:
      newState = Object.assign({}, state);
      action.polls.forEach(poll => {
        newState.allPolls[poll.id] = poll
      });
      return newState;
    case LOAD_ONE:
      newState = Object.assign({}, state);
      newState.singlePoll = action.poll;
      return newState;
    case ADD:
      newState = Object.assign({}, state);
      newState.allPolls[action.poll.id] = action.poll;
      return newState;
    case UPDATE:
      newState = Object.assign({}, state);
      newState.allPolls[action.poll.id] = action.poll;
      return newState;
    case DELETE:
      newState = Object.assign({}, state);
      delete newState.allPolls[action.pollId];
      return newState;
    default:
      return state;
  }
};

export default pollReducer
