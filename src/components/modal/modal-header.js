import React, {Component, PropTypes} from 'react';

import {IconButton} from 'components/icon-button';

export class ModalHeader extends Component {
  render() {
    return (
      <header className="modal-header">
        <IconButton
          onClick={this.props.onClickCloseButton}
          className="close-modal-button"
          >close</IconButton>
      </header>
    );
  }
}

ModalHeader.propTypes = {
  onClickCloseButton: PropTypes.func.isRequired,
};
