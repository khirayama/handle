import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import {
  TRANSITION_TIME,
  THRESHOLD_DELTA,
  transitionProperties,
} from '../constants';

export class ListItemContent extends Component {
  constructor() {
    super();

    this.touch = {
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
    };

    this.handleTouchStart = this._handleTouchStart.bind(this);
    this.handleTouchMove = this._handleTouchMove.bind(this);
    this.handleTouchEnd = this._handleTouchEnd.bind(this);

    this.setListItemContent = this._setListItemContent.bind(this);
  }
  _handleTouchStart(event) {
    this.touch = Object.assign({}, this.touch, {
      startX: event.touches[0].clientX,
      startY: event.touches[0].clientY,
      startTime: new Date(),
    });
  }
  _handleTouchMove(event) {
    const diff = this._calcDiff();
    const props = this.context.getProps();
    const touch = this.context.getTouch();

    if (touch.startScrollTop !== this.context.listElement().scrollTop) {
      return;
    }
    clearTimeout(touch.timerId);
    if (Math.abs(diff.x) >= Math.abs(diff.y) && !this.context.holding() && diff.x <= 0 && props.onSwipeLeft) {
      event.stopPropagation();
    }
    if (Math.abs(diff.x) >= Math.abs(diff.y) && !this.context.holding() && diff.x >= 0 && props.onSwipeRight) {
      event.stopPropagation();
    }

    const distance = Math.sqrt(
      Math.pow(event.touches[0].clientX - this.touch.startX, 2) +
      Math.pow(event.touches[0].clientY - this.touch.startY, 2)
    );

    if (distance > 10) {
      clearTimeout(this.touch.timerId);

      this.touch = Object.assign({}, this.touch, {
        endX: event.touches[0].clientX,
        endY: event.touches[0].clientY,
        endTime: new Date(),
      });

      this._updateTouchMoveView();
    }
  }
  _handleTouchEnd() {
    this._updateTouchEndView();

    const currentIndex = this._calcCurrentIndex();
    const props = this.context.getProps();

    if (this._isRightSwipe()) {
      setTimeout(() => {
        if (props.onSwipeRight) {
          props.onSwipeRight(currentIndex);
        }
      }, TRANSITION_TIME);
    } else if (this._isLeftSwipe()) {
      setTimeout(() => {
        if (props.onSwipeLeft) {
          props.onSwipeLeft(currentIndex);
        }
      }, TRANSITION_TIME);
    }

    this.touch = {
      startX: null,
      startY: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
    };
  }
  _updateTouchMoveView() {
    if (!this.context.holding()) {
      this._updateListItemContentView();
      this._updateBackgroundView();
    }
  }
  _updateTouchEndView() {
    const diff = this._calcDiff();
    const listItemElement = this.context.listItemElement();
    const props = this.context.getProps();

    this.listItemContent.style.transitionProperty = transitionProperties.TRANSFORM;

    if (this._isRightSwipe() && props.througnRight !== false) {
      if (diff.x > 0 && !props.onSwipeRight) {
        this.listItemContent.style.transform = `translateX(100%)`;
      }
    } else if (this._isLeftSwipe() && props.througnLeft !== false) {
      if (diff.x < 0 && props.onSwipeLeft) {
        this.listItemContent.style.transform = `translateX(-100%)`;
      }
    } else {
      this.listItemContent.style.transform = `translateX(0px)`;
    }
    if (listItemElement.classList.contains('list-item__moving')) {
      setTimeout(() => {
        listItemElement.classList.remove('list-item__moving');
        this.listItemContent.classList.remove('list-item-content__swipe');
        this.listItemContent.classList.remove('list-item-content__swipe_left');
        this.listItemContent.classList.remove('list-item-content__swipe_right');
      }, TRANSITION_TIME);
    }
  }
  _isLeftSwipe() {
    const diff = this._calcDiff();
    const THRESHOLD_WIDTH = window.innerWidth / 4;

    return (
      (Math.abs(diff.x) > THRESHOLD_WIDTH && diff.x < 0) ||
      (Math.abs(diff.delta.x) > THRESHOLD_DELTA && diff.x < 0)
    );
  }
  _isRightSwipe() {
    const diff = this._calcDiff();
    const THRESHOLD_WIDTH = window.innerWidth / 4;

    return (
      (Math.abs(diff.x) > THRESHOLD_WIDTH && diff.x > 0) ||
      (Math.abs(diff.delta.x) > THRESHOLD_DELTA && diff.delta.x > 0)
    );
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
  _calcCurrentIndex() {
    const listElement = this.context.listElement();
    const listItemElements = listElement.querySelectorAll('.list-item');

    let currentIndex = null;

    for (let index = 0; index < listItemElements.length; index++) {
      const listItemElement = listItemElements[index];
      const scrollTop = listElement.scrollTop;
      const targetRect = {
        top: listElement.offsetTop + listItemElement.offsetTop,
        height: listItemElement.offsetHeight,
      };

      if (
        targetRect.top - scrollTop < this.touch.startY &&
        this.touch.startY < targetRect.top + targetRect.height - scrollTop
      ) {
        currentIndex = index;
        break;
      }
    }

    return currentIndex;
  }
  _updateListItemContentView() {
    const diff = this._calcDiff();
    const props = this.context.getProps();
    const listItemElement = this.context.listItemElement();

    if (Math.abs(diff.x) > Math.abs(diff.y)) {
      let diffX = diff.x;
      if (diff.x < 0 && !props.onSwipeLeft) {
        diffX = 0;
      }
      if (diff.x > 0 && !props.onSwipeRight) {
        diffX = 0;
      }
      listItemElement.classList.add('list-item__moving');
      this.listItemContent.style.transitionProperty = transitionProperties.NONE;
      this.listItemContent.style.transform = `translateX(${diffX}px)`;
    }
    if (this._isLeftSwipe()) {
      this.listItemContent.classList.add('list-item-content__swipe');
      this.listItemContent.classList.add('list-item-content__swipe_left');
    } else if (this._isRightSwipe()) {
      this.listItemContent.classList.add('list-item-content__swipe');
      this.listItemContent.classList.add('list-item-content__swipe_right');
    } else {
      this.listItemContent.classList.remove('list-item-content__swipe');
      this.listItemContent.classList.remove('list-item-content__swipe_left');
      this.listItemContent.classList.remove('list-item-content__swipe_right');
    }
  }
  _updateBackgroundView() {
    const diff = this._calcDiff();
    const listItemElement = this.context.listItemElement();
    const leftBackgroundElement = listItemElement.querySelector('.list-item-left-background');
    const rightBackgroundElement = listItemElement.querySelector('.list-item-right-background');

    if (diff.x > 0) {
      if (leftBackgroundElement) {
        leftBackgroundElement.style.display = 'inline-block';
      }
      if (rightBackgroundElement) {
        rightBackgroundElement.style.display = 'none';
      }
    } else if (diff.x < 0) {
      if (leftBackgroundElement) {
        leftBackgroundElement.style.display = 'none';
      }
      if (rightBackgroundElement) {
        rightBackgroundElement.style.display = 'inline-block';
      }
    }

    if (this._isRightSwipe()) {
      if (leftBackgroundElement) {
        if (!leftBackgroundElement.classList.contains('list-item-background__will-swipe')) {
          leftBackgroundElement.classList.add('list-item-background__will-swipe');
        }
      }
    } else if (this._isLeftSwipe()) {
      if (rightBackgroundElement) {
        if (!rightBackgroundElement.classList.contains('list-item-background__will-swipe')) {
          rightBackgroundElement.classList.add('list-item-background__will-swipe');
        }
      }
    } else {
      if (leftBackgroundElement) {
        if (leftBackgroundElement.classList.contains('list-item-background__will-swipe')) {
          leftBackgroundElement.classList.remove('list-item-background__will-swipe');
        }
      }
      if (rightBackgroundElement) {
        if (rightBackgroundElement.classList.contains('list-item-background__will-swipe')) {
          rightBackgroundElement.classList.remove('list-item-background__will-swipe');
        }
      }
    }
  }
  _setListItemContent(listItemContent) {
    this.listItemContent = listItemContent;
  }
  render() {
    return (
      <div
        className={classNames(this.props.className, 'list-item-content')}
        ref={this.setListItemContent}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        >{this.props.children}</div>
    );
  }
}

ListItemContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

ListItemContent.contextTypes = {
  listElement: PropTypes.func,
  listItemElement: PropTypes.func,
  holding: PropTypes.func,
  getProps: PropTypes.func,
  getTouch: PropTypes.func,
};
