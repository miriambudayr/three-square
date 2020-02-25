import React from 'react';
import Tone from 'tone';
import { connect } from 'react-redux';
import { togglePlay, nextInstrumentTick } from '../actions';
import { pianoSamples, padSamples } from './constants';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.pianoPlayer = new Tone.Players(pianoSamples).toMaster();
    this.padPlayer = new Tone.Players(padSamples).toMaster();
    this.timer = null;
    this.count = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.playing !== nextProps.playing) {
      this.toggleLoop(nextProps.playing);
    }
  }

  toggleLoop(playing) {
    if (playing) {
      this.timer = setInterval(() => {
        if (this.count === 0 || this.count === 16) {
          this.nextTick([
            'leftInstrument',
            'middleInstrument',
            'rightInstrument'
          ]);
        } else {
          this.nextTick(['leftInstrument', 'middleInstrument']);
        }

        this.count++;
        this.count = this.count % 16;
      }, 350);
    } else {
      clearInterval(this.timer);
      clearInterval(this.bottomTimer);
      this.timer = null;
      this.count = 0;
    }
  }

  nextTick(instruments) {
    const { nextInstrumentTick } = this.props;
    nextInstrumentTick(instruments);

    instruments.forEach(instrument => this.playNotes(instrument));
  }

  playNotes(instrumentName) {
    const { instruments, palette } = this.props;
    const instrument = instruments[instrumentName];

    for (let i = 0; i < instrument['steps'].length; i++) {
      const row = instrument['steps'][i];
      const currentTick = instrument.currentTick;
      const lastColumn = instrument.lastColumn;

      for (let column = 0; column < lastColumn + 1; column++) {
        const stepActive = row[column].active;
        if (stepActive && column === currentTick) {
          this.playNote(palette.notes[i], instrumentName);
        }
      }
    }
  }

  playNote(noteName, instrument) {
    if (instrument === 'rightInstrument') {
      this.padPlayer.get(noteName).start();
    } else {
      this.pianoPlayer.get(noteName).start();
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  playing: state.globalControls.playing,
  instruments: state.instruments,
  palette: state.palette
});

export default connect(mapStateToProps, {
  togglePlay,
  nextInstrumentTick
})(Player);
