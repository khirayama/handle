import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default function IconButton(props) {
  return <button {...props} className={classNames('icon-button', props.className)}>{props.children}</button>;
}

IconButton.defaultProps = {
  className: '',
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
