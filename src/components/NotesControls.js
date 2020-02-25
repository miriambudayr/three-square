import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { incrementNote, decrementNote } from '../actions';
import { ReactComponent as UpArrowIcon } from '../icons/up-arrow.svg';
import { ReactComponent as DownArrowIcon } from '../icons/down-arrow.svg';

import './NotesControls.css';

const modalRoot = document.getElementById('modal-root');

function NotesControls(props) {
  function renderNotes() {
    const { palette, incrementNote, decrementNote } = props;
    const notesArray = [];

    palette.notes.forEach(function(note, i) {
      notesArray.push(
        <div className='note'>
          <div className='controls'>
            <UpArrowIcon
              className='increment-note'
              onClick={() => {
                incrementNote(i);
              }}
            />
            <div className='note-name'>{note}</div>

            <DownArrowIcon
              className='decrement-note'
              onClick={() => {
                decrementNote(i);
              }}
            />
          </div>
        </div>
      );
    });

    return notesArray;
  }

  const { toggleNotesControls } = props;
  return ReactDOM.createPortal(
    <div
      className='notes-controls-overlay'
      onClick={e => {
        if (e.target.className === 'notes-controls-overlay') {
          toggleNotesControls();
        }
      }}
    >
      <div className='notes-controls'>
        <div className='notes-controls-inner'>
          <div className='notes'> {renderNotes()}</div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}

const mapStateToProps = state => ({
  palette: state.palette
});

export default connect(mapStateToProps, {
  incrementNote,
  decrementNote
})(NotesControls);
