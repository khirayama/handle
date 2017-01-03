import React, {PropTypes} from 'react';
import {Link as SpectrometerLink} from 'spectrometer';

export default function Link(props) {
  const props_ = Object.assign({}, props);
  props_.className = (props_.className) ? props_.className + ' link' : 'link';

  return <SpectrometerLink {...props_}>{props.children}</SpectrometerLink>;
}

Link.propTypes = {
  children: PropTypes.node,
};
