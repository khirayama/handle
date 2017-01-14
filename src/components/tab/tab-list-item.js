import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export class TabListItem extends Component {
  constructor() {
    super();

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick() {
    this.context.setCurrentIndex(Number(this.props.index));
  }
  render() {
    const index = Number(this.props.index);

    return (
      <button
        className={classNames(
          'tab-list-item',
          {'tab-list-item__active': (index === this.context.currentIndex)}
        )}
        onClick={this.handleClick}
        >{this.props.children}</button>
    );
  }
}

TabListItem.contextTypes = {
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
};

TabListItem.propTypes = {
  index: PropTypes.number.isRequired,
  children: PropTypes.node,
};

