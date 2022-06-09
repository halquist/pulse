import * as pollActions from '../../store/poll'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { getOnePoll } from '../../store/poll';
import TitleBar from '../TitleBar';
import { LoadingIcon } from '../Logo';

import './PollForm.css';

const PollForm = ({ mode }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);
  const editPoll = useSelector((state) => state.poll.singlePoll);

  let { pollId } = useParams();

  if (mode === 'edit') {
    pollId = parseInt(pollId);
  }

  const [title, setTitle] = useState(editPoll.title || '');
  const [description, setDescription] = useState(editPoll.description || '');
  const [optionOneTitle, setOptionOneTitle] = useState(editPoll.optionOneTitle || '');
  const [optionTwoTitle, setOptionTwoTitle] = useState(editPoll.optionTwoTitle || '');
  const [optionOneVotes, setOptionOneVotes] = useState(editPoll.optionOneVotes || 0);
  const [optionTwoVotes, setOptionTwoVotes] = useState(editPoll.optionTwoVotes || 0);
  const [barTitle, setBarTitle] = useState(mode === 'edit' ? 'Edit Poll' : 'Create Poll');
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [canChange, setCanChange] = useState(false);

  useEffect(() => {
    dispatch(getOnePoll(pollId))
      .then(() => setTitle(editPoll.title))
      .then(() => setDescription(editPoll.description))
      .then(() => setOptionOneTitle(editPoll.optionOneTitle))
      .then(() => setOptionTwoTitle(editPoll.optionTwoTitle))
      .then(() => setOptionOneVotes(editPoll.optionOneVotes))
      .then(() => setOptionTwoVotes(editPoll.optionTwoVotes))
      .then(() => setBarTitle('Edit Poll'))
      .then(() => setCanChange(!editPoll.optionOneVotes && !editPoll.optionTwoVotes))
      .then(() => setLoaded(true))
  },[dispatch, editPoll.title, editPoll.description, editPoll.optionOneTitle, editPoll.optionTwoTitle])



    // submits new poll to database
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors([]);

        let newPoll = await dispatch(pollActions.createPoll({ title, description, optionOneTitle, optionTwoTitle, userId: sessionUser.id }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
          if (newPoll) {
            history.push(`/polls/${newPoll.poll.id}`);
          }
    };

    // submits edit request for poll to database
    const handleEdit = async (e) => {
      e.preventDefault();
      setErrors([]);
        let newPoll = await dispatch(pollActions.editPoll({ pollId, title, description, optionOneTitle, optionTwoTitle, userId: sessionUser.id }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
          if (newPoll) {
            console.log('pollform newpollid', newPoll)
            history.push(`/polls/${newPoll.poll.id}`);
          }
    };

    const handleCancel = (e) => {
      e.preventDefault();
      history.goBack();
    };

  // if the user is not logged in, redirect to the login page
  if (!sessionUser) return <Redirect to='/login' />;

  // shows loading icon if not loaded
  if (!loaded) {
    return (
    <div className='loadingContainer'>
        <LoadingIcon />
    </div>
    );
  }

  return (
    <div id='createPollContainer'>
      <TitleBar title={barTitle} />
      <div id='createPollFormDiv'>
        <div id='pollErrors'>
        {
          errors.map((error, i) => {
            return <div id={i} key={i} >{error}</div>
          })
        }
        </div>
        <form onSubmit={handleSubmit}>
          <div id='pollFormTitleDesc'>
            <div id='titleDiv'>
              <label htmlFor='title'>Poll Title</label>
              <input
                id='titleInput'
                name='title'
                type='text'
                value={title}
                onChange={e => setTitle(e.target.value)}
                autoFocus={true}
              >
              </input>
            </div>
            <div id='descDiv'>
              <label htmlFor='description'>Poll Description (optional)</label>
              <textarea
                id='descriptionInput'
                name='description'
                type='text'
                value={description}
                onChange={e => setDescription(e.target.value)}
              >
              </textarea>
            </div>
          </div>
          <div id='formOptionsDiv'>
            <div id='optionOneDiv'>
              <div id='optionTwoSubDiv'>

                <label htmlFor='optionOneTitle'>Choice #1</label>
                <input
                  id='optionOneTitleInput'
                  name='optionOneTitle'
                  type='text'
                  value={optionOneTitle}
                  onChange={e => setOptionOneTitle(e.target.value)}
                >
                </input>
              </div>
            </div>
            <div id='optionTwoDiv'>
              <div id='optionTwoSubDiv'>
                <label htmlFor='optionTwoTitle'>Choice #2</label>
                <input
                  id='optionTwoTitleInput'
                  name='optionTwoTitle'
                  type='text'
                  value={optionTwoTitle}
                  onChange={e => setOptionTwoTitle(e.target.value)}
                >
                </input>
              </div>
            </div>
          </div>
          {!canChange && <div id='editWarningDiv'>Warning: changing the title or either of the choices will remove all current votes on this poll. You can change the description without losing votes.</div>}
          <div id='pollButtonBar'>
            {mode === 'edit' ?
            <button onClick={handleEdit} className='pinkButton'>Submit Edit</button> :
            <button onClick={handleSubmit} className='pinkButton'>Create Poll</button> }
            <button className='greenButton' onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default PollForm;
