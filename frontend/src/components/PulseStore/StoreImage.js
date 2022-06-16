import './PulseStore.css';
import { useState } from 'react';
import { bpmChange } from '../../store/session';
import { useDispatch } from "react-redux";
import { changeProfileImage } from '../../store/session';
import bpm_symbol from '../../images/bpm_symbol.svg'


const StoreImage = ({ image, user }) => {
  const dispatch = useDispatch();

  const [cost, setCost] = useState(image.likes * 1);
  // const [cost, setCost] = useState(1);
  const [purchaseConfirm, setPurchaseConfirm] = useState(false);

  const purchase = async (e) => {
    e.preventDefault();
    dispatch(changeProfileImage(user.id, image.webformatURL));
    dispatch(bpmChange(user.id, -cost, 'subtract'));
  }

  return (
    <div className='storeImage'  onClick={() => setPurchaseConfirm(prev => !prev)} style={{
      backgroundImage: `url(${image.webformatURL})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
      {purchaseConfirm ?
      <div className='storeSubDisplayTop'>
       {user.bpm >= cost ?
        <>
          <button className='smallGreenButton'>Cancel</button>
          <button className='smallPinkButton' onClick={purchase} >Buy</button>
        </> :
        <div className='storeImageText'>Not enough bpm</div>
        }
      </div> :
      <div></div>
      }
      <div className='storeSubDisplayBottom' >
        <img src={bpm_symbol} width="14" height="14" className='bpmIcon'/>
        <div className='storeImageText'>{cost}</div>
      </div>
    </div>
  )
};

export default StoreImage;
