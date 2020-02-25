import React from 'react';
import NotesControls from './NotesControls';
import { connect } from 'react-redux';
import { ReactComponent as Edit } from '../icons/pen.svg';
import { changePalette } from '../actions';

import './ScaleSelector.css';

class ScaleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotesControls: false,
      custom: false
    };

    this.onSelection = this.onSelection.bind(this);
    this.toggleNotesControls = this.toggleNotesControls.bind(this);
  }

  onSelection(event) {
    const { changePalette } = this.props;
    if (event.target.value === 'Custom') {
      this.setState({ showNotesControls: true, custom: true });
    } else {
      this.setState({ showNotesControls: false, custom: false });
      changePalette(event.target.value);
    }
  }

  toggleNotesControls() {
    const { showNotesControls } = this.state;
    this.setState({ showNotesControls: !showNotesControls });
  }

  render() {
    const { showNotesControls, custom } = this.state;

    return (
      <div className='scale-selector'>
        {custom ? (
          <Edit
            className='edit'
            onClick={() => {
              this.toggleNotesControls();
            }}
          />
        ) : null}
        <select
          onChange={event => {
            this.onSelection(event);
          }}
        >
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
          <option>Option 4</option>
          <option>Custom</option>
        </select>

        {showNotesControls ? (
          <NotesControls toggleNotesControls={this.toggleNotesControls} />
        ) : null}
      </div>
    );
  }
}

export default connect(null, {
  changePalette
})(ScaleSelector);
