import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import {changeLocation} from 'universal/actions/application-action-creators';

export default class Link extends Component {
  constructor() {
    super();

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick(event) {
    event.preventDefault();

    const pathname = this.props.href;

    if (history) {
      history.pushState(null, null, pathname);
    }
    changeLocation(pathname);
  }
  render() {
    return (
      <a
        href={this.props.href}
        onClick={this.handleClick}
        className={classNames('link', this.props.className)}
        >{this.props.children}</a>
    );
  }
}

Link.defaultProps = {
  className: '',
};

Link.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
};
