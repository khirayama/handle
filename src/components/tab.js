import React, {Component, PropTypes} from 'react';

import Link from 'components/link';
import IconButton from 'components/icon-button';

export class TabList extends Component {
  render() {
    return (
      <ul className="tab-list">{this.props.children}</ul>
    );
  }
}

export class TabListItem extends Component {
  constructor() {
    super();

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick() {
    this.context.setCurrentIndex(Number(this.props.index))
  }
  render() {
    const index = Number(this.props.index);

    if (index === this.context.currentIndex) {
      return <li className="tab-list-item tab-list-item__active" onClick={this.handleClick}>{this.props.children}</li>
    }
    return <li className="tab-list-item" onClick={this.handleClick}>{this.props.children}</li>
  }
}

TabListItem.contextTypes = {
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
};

export class TabContentList extends Component {
  render() {
    return (
      <ul className="tab-content-list">{this.props.children}</ul>
    );
  }
}

export class TabContentListItem extends Component {
  render() {
    const index = Number(this.props.index);

    if (index === this.context.currentIndex) {
      return <li className="tab-content-list-item">{this.props.children}</li>;
    }
    return null;
  }
}

TabContentListItem.contextTypes = {
  currentIndex: PropTypes.number,
};

export class Tab extends Component {
  constructor() {
    super();

    this.state = {
      currentIndex: 0,
    };

    this.setCurrentIndex = this._setCurrentIndex.bind(this);
  }
  _setCurrentIndex(index) {
    this.setState({currentIndex: index});
  }
  getChildContext() {
    return {
      currentIndex: this.state.currentIndex,
      setCurrentIndex: this.setCurrentIndex,
    };
  }
  render() {
    return (
      <section className="tab">{this.props.children}</section>
    );
  }
}

Tab.childContextTypes = {
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
};

Tab.propTypes = {};
