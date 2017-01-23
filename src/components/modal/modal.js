import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export class Modal extends Component {
  render() {
    return (
      <div
        className={classNames(
          'modal',
          {modal__open: this.props.show}
        )}
        >{this.props.children}</div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
};
