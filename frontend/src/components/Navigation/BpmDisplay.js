import './Navigation.css';

const BpmDisplay = ({ bpmCount }) => {
  return (
    <div id='bpmDisplayDiv'>
      <div id='bpmDisplayText'>{bpmCount}</div>
    </div>
  )
};

export default BpmDisplay;
