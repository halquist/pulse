import { csrfFetch } from './csrf';

const LOAD = 'vote/LOAD';
const ADD = 'vote/ADD';
const DELETE = 'vote/DELETE';

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

// load votes from database on load of poll focus page
export const getVotes = (pollId) => async dispatch => {
  const id = parseInt(pollId, 10);
  const response = await fetch(`/api/votes/${id}`);
  if (response.ok) {
    const votes = await response.json();
    dispatch(loadVotes(votes));
  }
};

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
    default:
      return state;
  }
}

export default voteReducer;
