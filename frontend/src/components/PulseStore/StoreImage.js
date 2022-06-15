import './PulseStore.css';
import { useState } from 'react';
import bpm_symbol from '../../images/bpm_symbol.svg'

const StoreImage = ({ image }) => {
  const [cost, setCost] = useState(image.likes * 4);
  const [purchaseConfirm, setPurchaseConfirm] = useState(false);

  const purchase = () => {

  }

  return (
    <div className='storeImage'  onClick={() => setPurchaseConfirm(prev => !prev)} style={{
      backgroundImage: `url(${image.largeImageURL})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    }}>
      {purchaseConfirm ?
      <div className='storeSubDisplayTop' >
       <button className='smallGreenButton'>Cancel</button>
       <button className='smallPinkButton'>Buy</button>
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
