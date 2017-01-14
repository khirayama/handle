import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export class ListItemRightBackground extends Component {
  render() {
    return (
      <div
        className={
          classNames(
            this.props.className,
            'list-item-background',
            'list-item-right-background'
          )
        }
        >{this.props.children}</div>
    );
  }
}

ListItemRightBackground.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
