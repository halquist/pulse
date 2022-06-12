import { csrfFetch } from './csrf';

const LOAD = 'vote/LOAD';
const ADD = 'vote/ADD';
const DELETE = 'vote/DELETE';
const CLEAR = 'vote/CLEAR';

const loadVotes = (votes) => {
  return {
    type: LOAD,
    votes
  }
};

const addVote = (vote) => {
  return {
    type: ADD,
    vote
  }
};

const deleteVote = (id) => {
  return {
    type: DELETE,
    id
  }
};

const clearVotes = () => {
  return {
    type: CLEAR
  }
};



// load votes from database on load of poll focus page
export const getVotes = (pollId) => async dispatch => {
  const id = parseInt(pollId, 10);
  const response = await fetch(`/api/votes/${id}`);
  if (response.ok) {
    const votes = await response.json();
    dispatch(loadVotes(votes));
    return votes;
  }
};

// add a new vote
export const createVote = (vote) => async (dispatch) => {
  const { userId, pollId, voteSelection } = vote;
  const response = await csrfFetch('/api/votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId,
      pollId,
      voteSelection
    })
  });
  const data = await response.json();
  dispatch(addVote(data));

  return data;
}

export const clearOutVotes = () => async (dispatch) =>{
  dispatch(clearVotes())
}

const initialState = {
  pollVotes: {}
};

const voteReducer = (state = initialState, action) => {
  let newState;
  switch(action.type) {
    case LOAD:
      newState = Object.assign({}, state);
      action.votes.forEach(vote => {
        newState.pollVotes[vote.id] = vote
      });
      return newState;
    case CLEAR:
      newState = Object.assign({}, state);
        newState.pollVotes = {}
      return newState;
    default:
      return state;
  }
}

export default voteReducer;
