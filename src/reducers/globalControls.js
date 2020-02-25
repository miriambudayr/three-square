import { TOGGLE_PLAY } from '../actions/types';

// Todo: Add tempo change option.

const initialGlobalControlsState = {
  playing: false
  // bpm: 250,
};

export default function update(state = initialGlobalControlsState, action) {
  switch (action.type) {
    case TOGGLE_PLAY: {
      return { ...state, playing: !state.playing };
    }
    default: {
      return state;
    }
  }
}
