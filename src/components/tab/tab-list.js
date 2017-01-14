import React, {Component, PropTypes} from 'react';

export class TabList extends Component {
  render() {
    return (
      <div className="tab-list">{this.props.children}</div>
    );
  }
}

TabList.propTypes = {
  children: PropTypes.node,
};
