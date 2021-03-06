import { csrfFetch } from './csrf';

const ADD = 'user/ADD';
const REMOVE = 'user/REMOVE';
const ADDBPM = 'user/ADDBPM';
const CHANGEIMAGE = 'user/CHANGEIMAGE';


const setSessionUser = (user) => {
  return {
    type: ADD,
    user
  }
};

const removeSessionUser = () => {
  return {
    type: REMOVE
  }
};

const addBpm = (user) => {
  return {
    type: ADDBPM,
    user
  }
};

const changeImage = (user) => {
  return {
    type: ADDBPM,
    user
  }
};

export const login = (user) => async dispatch => {
  const { credential, password } = user
  const response = await csrfFetch('/api/session',
    {method:'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });

    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return response;
}

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setSessionUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  })

    dispatch(removeSessionUser());
  return response;
};

export const bpmChange = (id, bpm, addOrSubtract) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      bpm,
      addOrSubtract
    })
  });

  const data = await response.json();
  dispatch(addBpm(data))
}

export const changeProfileImage = (id, profileImageUrl) => async (dispatch) => {
  const response = await csrfFetch(`/api/users/${id}/image`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      profileImageUrl
    })
  });
  const data = await response.json();
  dispatch(changeImage(data))
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ADD:
      // newState = Object.assign({}, state);
      newState = {...state};
      newState.user = action.user;
      return newState;
    ;
    case REMOVE:
      // newState = Object.assign({}, state);
      newState = {...state};
      newState.user = null;
      return newState;
    case ADDBPM:
      // newState = Object.assign({}, state);
      newState = {...state};
      newState.user = action.user;
      return newState;
    case CHANGEIMAGE:
      // newState = Object.assign({}, state);
      newState = {...state};
      newState.user = action.user;
      return newState;
    default:
      return state;
  }
}

export default sessionReducer;
