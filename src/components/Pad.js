import React from 'react';
import './Pad.css';

function Pad(props) {
  const {
    rowIndex,
    columnIndex,
    toggleStep,
    instrument,
    step,
    currentColumn,
    lastColumn
  } = props;

  const className = getClassName();

  function getClassName() {
    const triggered = columnIndex === currentColumn ? true : false;
    const stepActive = step.active;

    if (columnIndex > lastColumn) {
      return 'pad-disabled';
    }

    if (stepActive && triggered) {
      return 'pad-triggered';
    } else if (stepActive && !triggered) {
      return 'pad-active';
    } else {
      return 'pad-inactive';
    }
  }

  if (className === 'pad-disabled') {
    return <div className={className}></div>;
  }

  return (
    <div
      className={className}
      onClick={() => {
        toggleStep(rowIndex, columnIndex, instrument);
      }}
    ></div>
  );
}

export default Pad;
