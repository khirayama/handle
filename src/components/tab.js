import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export class TabList extends Component {
  render() {
    return (
      <div className="tab-list">{this.props.children}</div>
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

    return (
      <button
        className={classNames("tab-list-item", {"tab-list-item__active": (index === this.context.currentIndex)})}
        onClick={this.handleClick}
        >{this.props.children}</button>
    );
  }
}

TabListItem.contextTypes = {
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
};

export class TabContentList extends Component {
  constructor() {
    super();

    this.state = {
      _startX: null,
      _startY: null,
      _startTime: new Date(),
      _endX: null,
      _endY: null,
      _endTime: new Date(),
      _moving: false,
      _transitionProperty: 'left .2s ease-out',
    };

    this.handleTouchStart = this._handleTouchStart.bind(this);
    this.handleTouchMove = this._handleTouchMove.bind(this);
    this.handleTouchEnd = this._handleTouchEnd.bind(this);
  }
  getChildContext() {
    return {
      handleTouchStart: this.handleTouchStart,
      handleTouchMove: this.handleTouchMove,
      handleTouchEnd: this.handleTouchEnd,
    };
  }
  _handleTouchStart(event) {
    event.stopPropagation();

    this.setState({
      _startX: event.touches[0].clientX,
      _startY: event.touches[0].clientY,
      _startTime: new Date(),
      _transitionProperty: 'none',
    });
  }
  _handleTouchMove(event) {
    event.stopPropagation();

    this.setState({
      _endX: event.touches[0].clientX,
      _endY: event.touches[0].clientY,
      _endTime: new Date(),
      _moving: true,
      _transitionProperty: 'none',
    });
  }
  _handleTouchEnd(event) {
    event.stopPropagation();

    const THRESHOLD_WIDTH = window.screen.width / 3;
    const THRESHOLD_DELTAX = 0.6;

    const diff = this._getDiff();

    if (THRESHOLD_WIDTH < Math.abs(diff.x)) {
      if (diff.x > 0) {
        this._swipeLeftHandler();
      } else {
        this._swipeRightHandler();
      }
    } else if (THRESHOLD_DELTAX < Math.abs(diff.delta.x)) {
      if (diff.delta.x > 0) {
        this._swipeLeftHandler();
      } else {
        this._swipeRightHandler();
      }
    }

    this.setState({
      _startX: null,
      _startY: null,
      _startTime: new Date(),
      _endX: null,
      _endY: null,
      _endTime: new Date(),
      _moving: false,
      _transitionProperty: 'left .2s ease-out',
    });
  }
  _getDiff() {
    let x = this.state._endX - this.state._startX;
    let y = this.state._endY - this.state._startY;
    let time = this.state._endTime.getTime() - this.state._startTime.getTime();

    time = (time < 0) ? 0 : time;

    if (this.state._endX !== null && this.state._endY !== null) {
      if (this.context.currentIndex === 0 && x > 0) {
        x = 0;
      } else if (this.context.currentIndex === this.props.children.length - 1 && x < 0) {
        x = 0;
      }
    } else {
      x = 0;
      y = 0;
    }
    return {
      x,
      y,
      time,
      delta: {
        x: Number((x/time).toFixed(2)),
        y: Number((y/time).toFixed(2)),
      }
    };
  }
  _swipeLeftHandler() {
    this.context.setCurrentIndex(this.context.currentIndex - 1);
  }
  _swipeRightHandler() {
    this.context.setCurrentIndex(this.context.currentIndex + 1);
  }
  render() {
    const diff = this._getDiff();
    const style = {
      width: (this.props.children.length * 100) + '%',
      left: `calc(-${this.context.currentIndex * 100}% + ${diff.x}px)`,
      transition: this.state._transitionProperty,
    };
    return (
      <ul
      style={style}
      className={classNames("tab-content-list", {"tab-content-list__moving": (this.state._moving && diff.x !== 0)})}>{this.props.children}</ul>
    );
  }
}

TabContentList.childContextTypes = {
  handleTouchStart: PropTypes.func,
  handleTouchMove: PropTypes.func,
  handleTouchEnd: PropTypes.func,
};

TabContentList.contextTypes = {
  currentIndex: PropTypes.number,
  setCurrentIndex: PropTypes.func,
};

export class TabContentListItem extends Component {
  render() {
    const index = Number(this.props.index);

    return (
      <li
      onTouchStart={this.context.handleTouchStart}
      onTouchMove={this.context.handleTouchMove}
      onTouchEnd={this.context.handleTouchEnd}
      className="tab-content-list-item">{this.props.children}</li>
    );
  }
}

TabContentListItem.contextTypes = {
  handleTouchStart: PropTypes.func,
  handleTouchMove: PropTypes.func,
  handleTouchEnd: PropTypes.func,
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
