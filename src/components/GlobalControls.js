import React from 'react';
import { ReactComponent as PlayIcon } from '../icons/play.svg';
import { ReactComponent as PauseIcon } from '../icons/pause.svg';
import { connect } from 'react-redux';
import { togglePlay } from '../actions';
import './GlobalControls.css';

// Todo: add tempo slider.

function GlobalControls(props) {
  const { togglePlay, playing } = props;

  return (
    <div className='global-controls'>
      {playing ? (
        <PauseIcon className='player-button' onClick={togglePlay} />
      ) : (
        <PlayIcon className='player-button' onClick={togglePlay} />
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  playing: state.globalControls.playing
});

export default connect(mapStateToProps, {
  togglePlay
})(GlobalControls);
