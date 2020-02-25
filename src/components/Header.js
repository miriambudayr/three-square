import React from 'react';
import './Header.css';
import ScaleSelector from './ScaleSelector';
import GlobalControls from './GlobalControls';

function Header(props) {
  const {
    changePalette,
    notes,
    incrementNoteName,
    decrementNoteName,
    incrementOctave,
    decrementOctave
  } = props;
  return (
    <div className='header'>
      <div className='header-inner'>
        <div className='title'>Three Square</div>
        <div className='controls-container'>
          <ScaleSelector
            changePalette={changePalette}
            notes={notes}
            incrementNoteName={incrementNoteName}
            decrementNoteName={decrementNoteName}
            incrementOctave={incrementOctave}
            decrementOctave={decrementOctave}
          />
          <GlobalControls />
        </div>
      </div>
    </div>
  );
}

export default Header;
