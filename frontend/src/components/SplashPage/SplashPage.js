import './SplashPage.css'
import { Link } from 'react-router-dom';
import { PollDisplayDemo } from '../PollDisplay';
import AboutFooter from './AboutFooter';



const SplashPage = () => {

  const demoPoll = {
    id: 0,
    userId: 0,
    optionOneTitle: 'Spring',
    optionTwoTitle: 'Autumn',
    title: 'Spring or Autumn?',
    description: 'Budding plants and the smell of rain, or falling leaves and crisp air?',
    optionOneVotes: 6,
    optionTwoVotes: 9,
    Comments:[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    User: {id: 0, username: 'pollMaster', profileImageUrl: 'https://cdn.pixabay.com/photo/2018/12/25/12/22/dolphin-3894171_960_720.jpg'},
    UserVotes: [
      {userId: 0, pollId: 0, voteSelection: 1},
      {userId: 0, pollId: 0, voteSelection: 1},
      {userId: 0, pollId: 0, voteSelection: 1},
      {userId: 0, pollId: 0, voteSelection: 1},
      {userId: 0, pollId: 0, voteSelection: 1},
      {userId: 0, pollId: 0, voteSelection: 1},
      {userId: 0, pollId: 0, voteSelection: 2},
      {userId: 0, pollId: 0, voteSelection: 2},
      {userId: 0, pollId: 0, voteSelection: 2},
      {userId: 0, pollId: 0, voteSelection: 2},
      {userId: 0, pollId: 0, voteSelection: 2},
      {userId: 0, pollId: 0, voteSelection: 2},
      {userId: 0, pollId: 0, voteSelection: 2},
      {userId: 0, pollId: 0, voteSelection: 2},
      {userId: 0, pollId: 0, voteSelection: 2},
    ],
  }

  return (
    <div id='splashMainContainer'>
      <div id='splashTopBar'>
        <Link to='/login'>
          <div id='logInSplash'>Log In</div>
        </Link>
        <Link to='/signup'>
          <div id='signUpSplash'>Sign Up</div>
        </Link>
      </div>
      <div id='splashTopText'>
        Keep a finger on the Pulse!
      </div>
      <div id='splashMidText'>
        Have you ever wondered what other people think about, well, anything?
        Pulse is a community for sharing quick, 2 choice polls with everyone!
      </div>
      <div id='splashMidText'>
      </div>
      <div id='splashPollDisplay'>
        <PollDisplayDemo pollSend={demoPoll} type='demo'/>
      </div>
      <div id='splashBotText'>
        Vote on other user's polls to win bpm! Spend bpm to create your
        own polls or customize your profile in the Pulse store!
      </div>
      <AboutFooter/>
      <div id='splashBackground'></div>
    </div>
  )
};

export default SplashPage
