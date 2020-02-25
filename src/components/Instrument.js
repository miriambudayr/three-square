import React from 'react';
import Row from './Row';
import { connect } from 'react-redux';
import { incrementLastColumn, decrementLastColumn } from '../actions';
import { ReactComponent as UpArrowIcon } from '../icons/up-arrow.svg';
import { ReactComponent as DownArrowIcon } from '../icons/down-arrow.svg';

import './Instrument.css';

function Instrument(props) {
  const {
    instrumentName,
    instruments,
    incrementLastColumn,
    decrementLastColumn
  } = props;
  const instrument = instruments[instrumentName];
  const { steps, currentTick, lastColumn } = instrument;

  function getRows() {
    const { instrumentName } = props;

    const rowsArray = [];

    for (let i = 0; i < steps.length; i++) {
      rowsArray.push(
        <Row
          rowIndex={i}
          row={steps[i]}
          currentColumn={currentTick}
          instrument={instrumentName}
          key={i}
          lastColumn={lastColumn}
        />
      );
    }
    return rowsArray;
  }

  return (
    <div className='instrument'>
      <div className='upper-controls'>
        Last Column: <div className='last-column'>{lastColumn + 1}</div>
        <UpArrowIcon
          className='plus-icon'
          onClick={() => {
            incrementLastColumn(instrumentName);
          }}
        />
        <DownArrowIcon
          className='minus-icon'
          onClick={() => {
            decrementLastColumn(instrumentName);
          }}
        />
      </div>
      <div className='right-controls'></div>
      {getRows()}
    </div>
  );
}

const mapStateToProps = state => ({
  instruments: state.instruments
});

export default connect(mapStateToProps, {
  incrementLastColumn,
  decrementLastColumn
})(Instrument);
