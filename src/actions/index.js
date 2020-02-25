import {
  TOGGLE_PLAY,
  TOGGLE_STEP,
  INCREMENT_LAST_COLUMN,
  DECREMENT_LAST_COLUMN,
  NEXT_INSTRUMENT_TICK,
  INCREMENT_NOTE,
  DECREMENT_NOTE,
  CHANGE_PALETTE
} from './types';

export function togglePlay() {
  return { type: TOGGLE_PLAY };
}

export function toggleStep(row, column, instrument) {
  return {
    type: TOGGLE_STEP,
    row,
    column,
    instrument
  };
}

export function incrementLastColumn(instrument) {
  return {
    type: INCREMENT_LAST_COLUMN,
    instrument
  };
}

export function decrementLastColumn(instrument) {
  return {
    type: DECREMENT_LAST_COLUMN,
    instrument
  };
}

export function nextInstrumentTick(instruments) {
  return {
    type: NEXT_INSTRUMENT_TICK,
    instruments
  };
}

export function incrementNote(index) {
  return {
    type: INCREMENT_NOTE,
    index
  };
}

export function decrementNote(index) {
  return {
    type: DECREMENT_NOTE,
    index
  };
}

export function changePalette(palette) {
  return {
    type: CHANGE_PALETTE,
    palette
  };
}
