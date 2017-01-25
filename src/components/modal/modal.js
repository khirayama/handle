import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export class Modal extends Component {
  render() {
    const openClassName = 'modal__open';
    return (
      <div
        className={classNames(
          'modal',
          {[openClassName]: this.props.show}
        )}
        >
        <div className="modal-content">
          {(this.props.show) ? this.props.children : null}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
};
