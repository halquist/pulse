import './SplashPage.css';
import linkedin_icon from '../../images/linkedInIcon.png';
import github_icon from '../../images/githubIcon.svg';

const AboutFooter = () => {
  return (
    <div className='aboutFooter'>
      <div className='creator_container'>
          <div className='creator_name'>Created By: Jon Halquist</div>
          <div className='git_link_container'>
            <a href='https://github.com/halquist' target="_blank">
              <img src={github_icon} height="32px" alt='github_icon'></img>
            </a>
            <a href='https://www.linkedin.com/in/jonathan-halquist-24380681/' target="_blank">
              <img src={linkedin_icon} height="32px" alt='linkedin_icon'></img>
            </a>
          </div>
      </div>
      <div className='spacerDivVert'></div>
      <div className='creator_container'>
          <div className='creator_name'>Pulse was built with:</div>
          <div className='image_container'>
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' height='35' alt='use_icon'/>
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' height='35'alt='use_icon'/>
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg' height='35'alt='use_icon'/>
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' height='35'alt='use_icon'/>
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' height='35'alt='use_icon'/>
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' height='35'alt='use_icon'/>
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' height='35'alt='use_icon'/>
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' height='35'alt='use_icon'/>
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' height='35'alt='use_icon'/>
            <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg' height='60'alt='use_icon'/>
          </div>
      </div>
      <div className='spacerDivVert'></div>
      <div className='creator_container'>
      <a href='https://github.com/halquist/pulse' target="_blank" id='git_link'>Site Github Link</a>
      </div>
    </div>
  )
};

export default AboutFooter;
