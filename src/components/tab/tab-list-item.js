import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  const separator = uri.indexOf('?') === -1 ? '?' : '&';

  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  }
  return uri + separator + key + '=' + value;
}

export class TabListItem extends Component {
  constructor() {
    super();

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick() {
    const href = updateQueryStringParameter(location.href, 'tab-index', this.props.index);
    if (history) {
      history.replaceState(null, null, href);
    }
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

