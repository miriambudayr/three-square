import {
  TOGGLE_STEP,
  INCREMENT_LAST_COLUMN,
  DECREMENT_LAST_COLUMN,
  NEXT_INSTRUMENT_TICK
} from '../actions/types';

const initialInstrumentsState = {
  leftInstrument: {
    steps: createInitialStepsState(),
    lastColumn: 7,
    currentTick: null,
    notes: ['B5', 'A5', 'E5', 'D5', 'B4', 'A4', 'D4', 'G3', 'C3']
  },
  middleInstrument: {
    steps: createInitialStepsState(),
    lastColumn: 7,
    currentTick: null,
    notes: ['B5', 'A5', 'E5', 'D5', 'B4', 'A4', 'D4', 'G3', 'C3']
  },
  rightInstrument: {
    steps: createInitialStepsState(),
    lastColumn: 7,
    currentTick: null,
    notes: ['B5', 'A5', 'E5', 'D5', 'B4', 'A4', 'D4', 'G3', 'C3']
  }
};

export default function update(state = initialInstrumentsState, action) {
  switch (action.type) {
    case TOGGLE_STEP: {
      return toggleStep(state, action);
    }
    case INCREMENT_LAST_COLUMN: {
      return incrementLastColumn(state, action);
    }
    case DECREMENT_LAST_COLUMN: {
      return decrementLastColumn(state, action);
    }
    case NEXT_INSTRUMENT_TICK: {
      return nextInstrumentTick(state, action);
    }
    default: {
      return state;
    }
  }
}

function toggleStep(state, action) {
  const { row, column, instrument } = action;
  const stateCopy = {
    ...state,
    [instrument]: { ...state[instrument], steps: [...state[instrument].steps] }
  };

  const newRow = stateCopy[instrument].steps[row].map((stepObj, index) => {
    if (index === column) {
      return Object.assign({}, stepObj, { active: !stepObj.active });
    } else {
      return stepObj;
    }
  });

  stateCopy[instrument].steps[row] = newRow;

  return stateCopy;
}

function incrementLastColumn(state, action) {
  const { instrument } = action;
  var stateCopy = { ...state };
  var newLastColumn = (stateCopy[instrument].lastColumn + 1) % 8;

  return {
    ...stateCopy,
    [instrument]: { ...state[instrument], lastColumn: newLastColumn }
  };
}

function decrementLastColumn(state, action) {
  const { instrument } = action;
  let stateCopy = { ...state };
  let newLastColumn;
  let lastColumn = stateCopy[instrument].lastColumn;

  if (lastColumn - 1 < 0) {
    newLastColumn = 7;
  } else {
    newLastColumn = lastColumn - 1;
  }

  return {
    ...stateCopy,
    [instrument]: { ...state[instrument], lastColumn: newLastColumn }
  };
}

function nextInstrumentTick(state, action) {
  const { instruments } = action;
  let stateCopy = { ...state };

  for (let i = 0; i < instruments.length; i++) {
    let instrument = instruments[i];
    let currentTick = stateCopy[instrument].currentTick;
    let lastColumn = stateCopy[instrument].lastColumn;

    let nextTick;

    if (currentTick === null) {
      nextTick = 0;
    } else {
      if (currentTick + 1 > lastColumn) {
        nextTick = currentTick % lastColumn || 0;
      } else {
        nextTick = currentTick + 1;
      }
    }

    stateCopy = {
      ...stateCopy,
      [instrument]: { ...stateCopy[instrument], currentTick: nextTick }
    };
  }

  return stateCopy;
}

function createInitialStepsState() {
  const state = [];
  const step = { active: false };

  for (let i = 0; i < 9; i++) {
    state.push([]);
  }

  for (let i = 0; i < state.length - 1; i++) {
    for (let j = 0; j < 9; j++) {
      state[j].push(Object.assign({}, step));
    }
  }

  return state;
}
