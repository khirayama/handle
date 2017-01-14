import React, {Component, PropTypes} from 'react';

import {THRESHOLD_DELTAX} from '../constants';

export class TabContentList extends Component {
  constructor() {
    super();

    this.touch = {
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
      moving: false,
    };

    this.handleTouchStart = this._handleTouchStart.bind(this);
    this.handleTouchMove = this._handleTouchMove.bind(this);
    this.handleTouchEnd = this._handleTouchEnd.bind(this);

    this.setTabContentList = this._setTabContentList.bind(this);
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

    this.touch = Object.assign({}, this.touch, {
      startX: event.touches[0].clientX,
      startY: event.touches[0].clientY,
      startTime: new Date(),
    });
  }
  _handleTouchMove(event) {
    event.stopPropagation();
    event.preventDefault();

    this.touch = Object.assign({}, this.touch, {
      endX: event.touches[0].clientX,
      endY: event.touches[0].clientY,
      endTime: new Date(),
      moving: true,
    });

    this._updateTouchMoveView();
  }
  _handleTouchEnd(event) {
    event.stopPropagation();

    const THRESHOLD_WIDTH = window.screen.width / 3;
    const diff = this._calcFilteredDiff();

    this._updateTouchEndView();

    if (THRESHOLD_WIDTH < Math.abs(diff.x)) {
      if (diff.x > 0) {
        this._swipeRightHandler();
      } else {
        this._swipeLeftHandler();
      }
    } else if (THRESHOLD_DELTAX < Math.abs(diff.delta.x)) {
      if (diff.delta.x > 0) {
        this._swipeRightHandler();
      } else {
        this._swipeLeftHandler();
      }
    }

    this.touch = Object.assign({}, this.touch, {
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
      moving: false,
    });
  }
  _calcFilteredDiff() {
    const diff = this._calcDiff();

    if (this.touch.endX !== null && this.touch.endY !== null) {
      if (
        (this.context.currentIndex === 0 && diff.x > 0) ||
        (this.context.currentIndex === this.props.children.length - 1 && diff.x < 0)
      ) {
        diff.x = 0;
        diff.delta.x = 0;
      }
    }

    return diff;
  }
  _calcDiff() {
    let x = this.touch.endX - this.touch.startX;
    let y = this.touch.endY - this.touch.startY;
    let time = this.touch.endTime.getTime() - this.touch.startTime.getTime();

    time = (time < 0) ? 0 : time;

    if (this.touch.endX === null || this.touch.endY === null) {
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
  _swipeLeftHandler() {
    this.context.setCurrentIndex(this.context.currentIndex + 1);
  }
  _swipeRightHandler() {
    this.context.setCurrentIndex(this.context.currentIndex - 1);
  }
  _updateTouchMoveView() {
    const diff = this._calcFilteredDiff();

    if (this.touch._moving && diff.x !== 0) {
      this.tabContentList.classList.add('tab-content-list__moving');
    }

    this.tabContentList.style.left = `calc(-${this.context.currentIndex * 100}% + ${diff.x}px)`;
    this.tabContentList.style.transition = 'none';
  }
  _updateTouchEndView() {
    if (this.tabContentList.classList.contains('tab-content-list__moving')) {
      this.tabContentList.classList.remove('tab-content-list__moving');
    }

    this.tabContentList.style.left = `calc(-${this.context.currentIndex * 100}%)`;
    this.tabContentList.style.transition = 'left .2s ease-out';
  }
  _setTabContentList(tabContentList) {
    this.tabContentList = tabContentList;
  }
  render() {
    const diff = this._calcFilteredDiff();
    const style = {
      width: (this.props.children.length * 100) + '%',
      left: `calc(-${this.context.currentIndex * 100}% + ${diff.x}px)`,
      transition: 'left .2s ease-out',
    };

    return (
      <ul
        className="tab-content-list"
        style={style}
        ref={this.setTabContentList}
        >{this.props.children}</ul>
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

TabContentList.propTypes = {
  children: PropTypes.node,
};
