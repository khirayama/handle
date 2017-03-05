import React, {Component, PropTypes} from 'react';

function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  const separator = uri.indexOf('?') === -1 ? '?' : '&';

  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  }
  return uri + separator + key + '=' + value;
}

export class Tab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: props.index || 0,
    };

    this.setCurrentIndex = this._setCurrentIndex.bind(this);
  }
  _setCurrentIndex(index) {
    if (history && this.props.enableQueryString) {
      const href = updateQueryStringParameter(location.href, 'tab-index', index);
      history.replaceState(null, null, href);
    }
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
      <section
        className="tab"
        >{this.props.children}</section>
    );
  }
}

Tab.childContextTypes = {
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
};

Tab.propTypes = {
  index: PropTypes.number,
  children: PropTypes.node,
  enableQueryString: PropTypes.bool,
};
