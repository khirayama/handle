import React, {Component, PropTypes} from 'react';

export class TabContentListItem extends Component {
  render() {
    return (
      <li
        onTouchStart={this.context.handleTouchStart}
        onTouchMove={this.context.handleTouchMove}
        onTouchEnd={this.context.handleTouchEnd}
        className="tab-content-list-item"
        >{this.props.children}</li>
    );
  }
}

TabContentListItem.contextTypes = {
  handleTouchStart: PropTypes.func,
  handleTouchMove: PropTypes.func,
  handleTouchEnd: PropTypes.func,
  currentIndex: PropTypes.number,
};

TabContentListItem.propTypes = {
  children: PropTypes.node,
};

