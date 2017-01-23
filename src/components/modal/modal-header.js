import React, {Component, PropTypes} from 'react';

import {IconButton} from 'components/icon-button';

export class ModalHeader extends Component {
  render() {
    return (
      <header className="modal-header">
        {this.props.children}
        <IconButton
          onClick={this.props.onClickCloseButton}
          className="close-modal-button"
          >close</IconButton>
      </header>
    );
  }
}

ModalHeader.propTypes = {
  children: PropTypes.node,
  onClickCloseButton: PropTypes.func.isRequired,
};
