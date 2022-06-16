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
    User: {id: 0, username: 'pollMaster', profileImageUrl: 'https://pixabay.com/get/gaf7a851b5beebe47b688a8dc58143ddd7483f0565a1f43ab9fdb94caa9aef5d7dc76a143905112a1f1ee47d2d5e5d9b5338049434726c0614310c308ea269d60_640.jpg'},
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
      </div>
      <div id='splashMidText'>
        Pulse is a community for sharing quick, 2 choice polls with everyone!
      </div>
      <div id='splashPollDisplay'>
        <PollDisplayDemo pollSend={demoPoll} type='demo'/>
      </div>
      <AboutFooter/>
      <div id='splashBackground'></div>
    </div>
  )
};

export default SplashPage
