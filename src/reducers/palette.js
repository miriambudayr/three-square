import {
  CHANGE_PALETTE,
  INCREMENT_NOTE,
  DECREMENT_NOTE
} from '../actions/types';

const initialPaletteState = {
  notes: ['B5', 'A5', 'E5', 'D5', 'B4', 'A4', 'D4', 'G3', 'C3'],
  palette: 'Option 1'
};

const palettes = {
  'Option 1': ['B5', 'A5', 'E5', 'D5', 'B4', 'A4', 'D4', 'G3', 'C3'],
  'Option 2': ['A5', 'F5', 'D5', 'C5', 'Bb4', 'F4', 'D4', 'Bb3', 'F3'],
  'Option 3': ['Bb5', 'G5', 'Eb5', 'C5', 'Ab4', 'Eb4', 'C4', 'Bb3', 'G3'],
  'Option 4': ['Bb5', 'Ab5', 'Gb5', 'Db5', 'Bb4', 'Gb4', 'Eb4', 'Db3', 'Bb3'],
  custom: ['B5', 'A5', 'E5', 'D5', 'B4', 'A4', 'D4', 'G3', 'C3']
};

export default function update(state = initialPaletteState, action) {
  switch (action.type) {
    case CHANGE_PALETTE: {
      return changePalette(state, action.palette);
    }
    case INCREMENT_NOTE: {
      return incrementNote(state, action.index);
    }
    case DECREMENT_NOTE: {
      return decrementNote(state, action.index);
    }

    default: {
      return state;
    }
  }
}

function changePalette(state, palette) {
  return { ...state, palette, notes: [...palettes[palette]] };
}

function incrementNote(state, index) {
  const names = [
    'A',
    'Bb',
    'B',
    'C',
    'Db',
    'D',
    'Eb',
    'E',
    'F',
    'Gb',
    'G',
    'Ab'
  ];
  const octaves = ['3', '4', '5'];

  let newNotesArray = [...state['notes']];
  const [, note, octave] = newNotesArray[index].match(/^([ABCDEFG][b#]?)(\d)/);
  let newNote = names[(names.indexOf(note) + 1) % 12];
  let nextOctave;

  if (newNote === 'C') {
    let nextOctaveIndex = octaves.indexOf(octave) + 1;

    if (nextOctaveIndex > octaves.length - 1) {
      nextOctave = octave;
      newNote = 'B';
    } else {
      nextOctave = octaves[nextOctaveIndex];
    }
  } else {
    nextOctave = octave;
  }

  newNote = newNote + nextOctave;
  newNotesArray[index] = newNote;
  return { ...state, notes: newNotesArray };
}

function decrementNote(state, index) {
  const names = [
    'A',
    'Bb',
    'B',
    'C',
    'Db',
    'D',
    'Eb',
    'E',
    'F',
    'Gb',
    'G',
    'Ab'
  ];
  const octaves = ['3', '4', '5'];

  const newNotesArray = [...state['notes']];
  const [, note, octave] = newNotesArray[index].match(/^([ABCDEFG][b#]?)(\d)/);
  let newNoteIndex = names.indexOf(note) - 1;
  let nextOctave;

  if (newNoteIndex < 0) {
    newNoteIndex = 11;
  }

  let newNote = names[newNoteIndex];

  if (newNote === 'B') {
    let nextOctaveIndex = octaves.indexOf(octave) - 1;
    if (nextOctaveIndex < 0) {
      nextOctave = octave;
      newNote = 'C';
    } else {
      nextOctave = octaves[nextOctaveIndex];
    }
  } else {
    nextOctave = octave;
  }

  newNote = newNote + nextOctave;
  newNotesArray[index] = newNote;

  return {
    ...state,
    notes: newNotesArray
  };
}
