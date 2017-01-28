import React, {Component, PropTypes} from 'react';

export class Tab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: props.index || 0,
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
};
