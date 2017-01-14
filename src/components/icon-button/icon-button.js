import React, {PropTypes} from 'react';

export function IconButton(props) {
  const props_ = Object.assign({}, props);
  props_.className = (props_.className) ? props_.className + ' icon-button' : 'icon-button';

  return <button {...props_}>{props.children}</button>;
}

IconButton.propTypes = {
  children: PropTypes.node,
};

