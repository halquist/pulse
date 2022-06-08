import * as pollActions from '../../store/poll'
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import TitleBar from '../TitleBar';

import './PollForm.css';

const PollForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [optionOneTitle, setOptionOneTitle] = useState('');
  const [optionTwoTitle, setOptionTwoTitle] = useState('');
  const [errors, setErrors] = useState([]);

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

  return (
    <div id='createPollContainer'>
      <TitleBar title='Create A Poll' />
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
              <label htmlFor='description'>Poll Description (not required)</label>
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
          <div id='pollButtonBar'>
            <button type="submit" className='pinkButton'>Create Poll</button>
            <button className='greenButton' onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default PollForm;
