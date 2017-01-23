import React, {PropTypes} from 'react';

export function Icon(props) {
  const props_ = Object.assign({}, props);
  props_.className = (props_.className) ? props_.className + ' icon-button' : 'icon';

  return <span {...props_}>{props.children}</span>;
}

Icon.propTypes = {
  children: PropTypes.node,
};

