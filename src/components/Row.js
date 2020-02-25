import React from 'react';
import Pad from './Pad';
import { toggleStep } from '../actions';
import { connect } from 'react-redux';

function Row(props) {
  function renderPads() {
    const {
      currentColumn,
      instrument,
      row,
      rowIndex,
      toggleStep,
      lastColumn
    } = props;

    const padsArray = [];

    for (let i = 0; i < row.length; i++) {
      const step = row[i];

      padsArray.push(
        <Pad
          lastColumn={lastColumn}
          columnIndex={i}
          currentColumn={currentColumn}
          instrument={instrument}
          key={i}
          rowIndex={rowIndex}
          step={step}
          toggleStep={toggleStep}
        />
      );
    }

    return padsArray;
  }

  return <div className='row'>{renderPads()}</div>;
}

export default connect(null, {
  toggleStep
})(Row);
