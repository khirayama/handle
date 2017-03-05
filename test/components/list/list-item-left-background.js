import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export class ListItemLeftBackground extends Component {
  render() {
    return (
      <div
        className={
          classNames(
            this.props.className,
            'list-item-background',
            'list-item-left-background'
          )
        }
        >{this.props.children}</div>
    );
  }
}

ListItemLeftBackground.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
