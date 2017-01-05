import React, {Component, PropTypes} from 'react';
// import ReactDOM from 'react-dom';
import classNames from 'classnames';

export class ListItemContent extends Component {
  render() {
    const diff = this.context.getDiff();
    const style = {};
    if (this.context.isTarget()) {
      style.transform = `translateX(${diff.x}px)`;
    } else {
      style.transition = 'transform .2s ease-out';
    }

    return (
      <span
        style={style}
        className="list-item-content"
        >{this.props.children}</span>
    );
  }
}

ListItemContent.contextTypes = {
  getDiff: PropTypes.func,
  isTarget: PropTypes.func,
};

ListItemContent.propTypes = {
  children: PropTypes.node,
};

export class ListItemLeftBackground extends Component {
  render() {
    return (
      <div
        className={classNames(
          'list-item-background',
          'list-item-left-background',
          {'list-item-background__over': (this.context.getDirection() === 'right')}
        )}
        >{this.props.children}</div>
    );
  }
}

ListItemLeftBackground.contextTypes = {
  getDirection: PropTypes.func,
};

ListItemLeftBackground.propTypes = {
  children: PropTypes.node,
};

export class ListItemRightBackground extends Component {
  render() {
    return (
      <div
        className={classNames(
          'list-item-background',
          'list-item-right-background',
          {'list-item-background__over': (this.context.getDirection() === 'left')}
        )}
        >{this.props.children}</div>
    );
  }
}

ListItemRightBackground.contextTypes = {
  getDirection: PropTypes.func,
};

ListItemRightBackground.propTypes = {
  children: PropTypes.node,
};

export class ListItem extends Component {
  constructor() {
    super();

    this.state = {
      _isTarget: false,
    };

    this.handleTouchStart = this._handleTouchStart.bind(this);
    this.handleTouchMove = this._handleTouchMove.bind(this);
    this.handleTouchEnd = this._handleTouchEnd.bind(this);
  }
  getChildContext() {
    return {
      isTarget: () => this.state._isTarget,
    };
  }
  _getCallBacks() {
    return {
      holdEventCallback: this.props.onHold || (() => {}),
      swipeLeftCallback: this.props.onSwipeLeft || (() => {}),
      swipeRightCallback: this.props.onSwipeRight || (() => {}),
    };
  }
  _handleTouchStart(event) {
    this.setState({_isTarget: true});
    this.context.handleTouchStart(event, this._getCallBacks());
  }
  _handleTouchMove(event) {
    this.context.handleTouchMove(event, this._getCallBacks());
  }
  _handleTouchEnd(event) {
    this.setState({_isTarget: false});
    this.context.handleTouchEnd(event, this._getCallBacks());
  }
  render() {
    const props = Object.assign({}, this.props);

    delete props.onHold;
    delete props.onSwipeLeft;
    delete props.onSwipeRight;

    return (
      <li
        {...props}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        className={classNames('list-item', {'list-item__holding': (this.context.holding && this.state._isTarget)})}
        >{this.props.children}</li>
    );
  }
}

ListItem.childContextTypes = {
  isTarget: PropTypes.func,
};

ListItem.contextTypes = {
  handleTouchStart: PropTypes.func,
  handleTouchMove: PropTypes.func,
  handleTouchEnd: PropTypes.func,
  getDiff: PropTypes.func,
  holding: PropTypes.bool,
};

ListItem.propTypes = {
  children: PropTypes.node,
  onHold: PropTypes.func,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
};

export class List extends Component {
  constructor() {
    super();

    this.state = {
      _startX: null,
      _startY: null,
      _startTime: new Date(),
      _endX: null,
      _endY: null,
      _endTime: new Date(),
      _direction: 'left',
      _holding: false,
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
      getDiff: this._getDiff.bind(this),
      getDirection: () => this.state._direction,
      holding: this.state._holding,
    };
  }
  _handleTouchStart(event, callbacks) {
    event.stopPropagation();

    const THRESHOLD_TIME = 750;

    this.setState({
      _startX: event.touches[0].clientX,
      _startY: event.touches[0].clientY,
      _startTime: new Date(),
    });

    this._timerId = setTimeout(() => {
      this.setState({_holding: true});
      callbacks.holdEventCallback();
    }, THRESHOLD_TIME);
  }
  _handleTouchMove(event) {
    event.stopPropagation();

    clearTimeout(this._timerId);

    // TODO: sort
    // if (this.state._holding) {
    //   const listItemElements = ReactDOM.findDOMNode(this).querySelectorAll('.list-item');
    //   console.log(listItemElements);
    //   listItemElements.forEach(listItemElement => {
    //     const rect = listItemElement.getBoundingClientRect();
    //     console.log(rect, rect.top, event.touches[0].clientY);
    //   });
    // }

    const diff = this._getDiff();
    let direction = 'left';
    if (diff.x > 0) {
      direction = 'right';
    }

    this.setState({
      _endX: event.touches[0].clientX,
      _endY: event.touches[0].clientY,
      _endTime: new Date(),
      _direction: direction,
    });
  }
  _handleTouchEnd(event, callbacks) {
    event.stopPropagation();

    clearTimeout(this._timerId);

    const THRESHOLD_WIDTH = window.screen.width / 4;
    const THRESHOLD_DELTAX = 0.6;

    const diff = this._getDiff();

    if (THRESHOLD_WIDTH < Math.abs(diff.x)) {
      if (diff.x > 0) {
        this._swipeRightHandler(callbacks.swipeRightCallback);
      } else {
        this._swipeLeftHandler(callbacks.swipeLeftCallback);
      }
    } else if (THRESHOLD_DELTAX < Math.abs(diff.delta.x)) {
      if (diff.delta.x > 0) {
        this._swipeRightHandler(callbacks.swipeRightCallback);
      } else {
        this._swipeLeftHandler(callbacks.swipeLeftCallback);
      }
    }

    this.setState({
      _startX: null,
      _startY: null,
      _startTime: new Date(),
      _endX: null,
      _endY: null,
      _endTime: new Date(),
      _holding: false,
    });
  }
  _getDiff() {
    let x = this.state._endX - this.state._startX;
    let y = this.state._endY - this.state._startY;
    let time = this.state._endTime.getTime() - this.state._startTime.getTime();

    time = (time < 0) ? 0 : time;

    if (this.state._endX === null || this.state._endY === null) {
      x = 0;
      y = 0;
    }
    return {
      x,
      y,
      time,
      delta: {
        x: Number((x / time).toFixed(2)),
        y: Number((y / time).toFixed(2)),
      },
    };
  }
  _swipeLeftHandler(callback) {
    callback();
  }
  _swipeRightHandler(callback) {
    callback();
  }
  render() {
    return (
      <ul
        {...this.props}
        className="list"
        >{this.props.children}</ul>
    );
  }
}

List.childContextTypes = {
  handleTouchStart: PropTypes.func,
  handleTouchMove: PropTypes.func,
  handleTouchEnd: PropTypes.func,
  getDiff: PropTypes.func,
  getDirection: PropTypes.func,
  holding: PropTypes.bool,
};

List.propTypes = {
  children: PropTypes.node,
};
