import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Header from './components/Header';
import Instrument from './components/Instrument';
import Player from './components/Player';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <div className='main-view'>
          <Player />
          <Header />
          <div className='container'>
            <div className='instrument-container'>
              <Instrument instrumentName='leftInstrument' />
              <Instrument instrumentName='middleInstrument' />
              <Instrument instrumentName='rightInstrument' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    playing: state.globalControls.playing,
    instruments: state.instruments,
    palette: state.palette
  };
}

export default connect(mapStateToProps)(App);
