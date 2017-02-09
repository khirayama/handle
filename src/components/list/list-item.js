import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import {
  TRANSITION_TIME,
  THRESHOLD_HOLD_TIME,
  THRESHOLD_SCROLL_HEIGHT,
  transitionProperties,
} from '../constants';

export class ListItem extends Component {
  constructor() {
    super();

    this.touch = {
      startX: null,
      startY: null,
      startScrollTop: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
      timerId: null,
      holding: false,
    };

    this.handleTouchStart = this._handleTouchStart.bind(this);
    this.handleTouchMove = this._handleTouchMove.bind(this);
    this.handleTouchEnd = this._handleTouchEnd.bind(this);
    this.handleTouchHold = this._handleTouchHold.bind(this);

    this.setListItem = this._setListItem.bind(this);
  }
  componentDidMount() {
    // can't prevent event passive in Chrome.
    // because not use onTouchMove
    this.listItem.addEventListener('touchmove', this.handleTouchMove);
    this._enterListItemAnimation();
  }
  getChildContext() {
    return {
      listItemElement: () => this.listItem,
      holding: () => this.touch.holding,
      getProps: () => this.props,
      getTouch: () => this.touch,
    };
  }

  // handling event
  _handleTouchStart(event) {
    this.touch = Object.assign({}, this.touch, {
      startX: event.touches[0].clientX,
      startY: event.touches[0].clientY,
      startScrollTop: this.context.listElement().scrollTop,
      startTime: new Date(),
      timerId: setTimeout(this.handleTouchHold, THRESHOLD_HOLD_TIME),
    });
  }
  _handleTouchMove(event) {
    if (this.touch.holding) {
      event.stopPropagation();
      event.preventDefault();
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
  _handleTouchHold() {
    this.touch.holding = true;

    if (this.props.onTouchHold || this.context.onSort) {
      this._updateTouchHoldView();
    }

    if (this.props.onTouchHold) {
      this.props.onTouchHold();
    }
  }
  _handleTouchEnd() {
    clearTimeout(this.touch.timerId);

    this._updateTouchEndView();

    const {currentIndex, targetIndex} = this._calcIndex();
    if (this.touch.holding && currentIndex !== null && targetIndex !== null && this.context.onSort) {
      this.context.onSort(currentIndex, targetIndex);
    }

    this.touch = {
      startX: null,
      startY: null,
      startScrollTop: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
      timerId: null,
      holding: false,
    };
  }

  // update views
  _updateTouchMoveView() {
    if (this.touch.holding && this.context.onSort) {
      this.listItem.classList.add('list-item__sorting');

      this._moveCurrentListItemAnimation();
      this._moveListItemAnimation();
      this._scrollListView();
    }
  }
  _updateTouchHoldView() {
    if (!this.listItem.classList.contains('list-item__holding')) {
      this.listItem.style.transitionProperty = transitionProperties.ALL;
      this.listItem.classList.add('list-item__holding');
    }
  }
  _updateTouchEndView() {
    if (this.listItem.classList.contains('list-item__holding')) {
      this.listItem.classList.remove('list-item__holding');
    }
    if (this.listItem.classList.contains('list-item__sorting')) {
      this.listItem.classList.remove('list-item__sorting');
    }

    const listElement = this.context.listElement();
    const listItemElements = listElement.querySelectorAll('.list-item');

    for (let index = 0; index < listItemElements.length; index++) {
      const listItemElement = listItemElements[index];

      listItemElement.style.transitionProperty = transitionProperties.NONE;
      listItemElement.style.transform = 'translateY(0px)';
      setTimeout(() => {
        listItemElement.style.transitionProperty = transitionProperties.HEIGHT;
      }, TRANSITION_TIME);
    }
  }

  // animation
  _enterListItemAnimation() {
    setTimeout(() => {
      const el = this.listItem;
      const height = el.offsetHeight;

      this.listItem.style.height = height + 'px';
      if (el.classList.contains('list-item-transition-enter')) {
        this.listItem.style.transitionProperty = transitionProperties.MAX_HEIGHT;
        this.listItem.style.maxHeight = height + 'px';
        setTimeout(() => {
          this.listItem.style.transitionProperty = transitionProperties.HEIGHT;
        }, TRANSITION_TIME);
      }
    }, 0);
  }
  _moveCurrentListItemAnimation() {
    const diff = this._calcDiff();
    const scrollDiff = this.touch.startScrollTop - this.context.listElement().scrollTop;

    this.listItem.style.transitionProperty = transitionProperties.NONE;
    this.listItem.style.transform = `translateY(${diff.y - scrollDiff}px)`;
  }
  _moveListItemAnimation() {
    const listElement = this.context.listElement();
    const listItemElements = listElement.querySelectorAll('.list-item');

    const height = this.listItem.offsetHeight;

    const {currentIndex, targetIndex} = this._calcIndex();

    if (currentIndex !== null && targetIndex !== null) {
      if (currentIndex <= targetIndex) {
        for (let index = 0; index < listItemElements.length; index++) {
          const listItemElement = listItemElements[index];

          if (currentIndex < index && index <= targetIndex) {
            listItemElement.style.transitionProperty = transitionProperties.TRANSFORM;
            listItemElement.style.transform = `translateY(-${height}px)`;
          } else if (currentIndex !== index) {
            listItemElement.style.transitionProperty = transitionProperties.TRANSFORM;
            listItemElement.style.transform = 'translateY(0px)';
          }
        }
      }
      if (targetIndex <= currentIndex) {
        for (let index = 0; index < listItemElements.length; index++) {
          const listItemElement = listItemElements[index];

          if (targetIndex <= index && index < currentIndex) {
            listItemElement.style.transitionProperty = transitionProperties.TRANSFORM;
            listItemElement.style.transform = `translateY(${height}px)`;
          } else if (currentIndex !== index) {
            listItemElement.style.transitionProperty = transitionProperties.TRANSFORM;
            listItemElement.style.transform = 'translateY(0px)';
          }
        }
      }
    }
  }
  _scrollListView() {
    const listElement = this.context.listElement();
    const listContentElement = listElement.querySelector('.list-content');
    const listElementRect = listElement.getBoundingClientRect();

    if (!this.timerId) {
      this.timerId = setInterval(() => {
        if (
          this.touch.endY &&
          listElement.scrollTop > 0 &&
          this.touch.endY < listElementRect.top + THRESHOLD_SCROLL_HEIGHT
        ) {
          listElement.scrollTop -= 3;
          this._moveCurrentListItemAnimation();
          this._moveListItemAnimation();
        } else if (
          this.touch.endY &&
          listElement.scrollTop < listContentElement.offsetHeight - listElement.offsetHeight &&
          this.touch.endY > listElementRect.top + listElement.offsetHeight - THRESHOLD_SCROLL_HEIGHT
        ) {
          listElement.scrollTop += 3;
          this._moveCurrentListItemAnimation();
          this._moveListItemAnimation();
        } else {
          clearTimeout(this.timerId);
          this.timerId = null;
        }
      }, 1000 / 60);
    }
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
  _calcIndex() {
    const listElement = this.context.listElement();
    const listItemElements = listElement.querySelectorAll('.list-item');

    const scrollTop = listElement.scrollTop;
    const listTop = listElement.getBoundingClientRect().top;

    let currentIndex = null;
    let targetIndex = null;

    for (let index = 0; index < listItemElements.length; index++) {
      const listItemElement = listItemElements[index];
      const targetRect = {
        top: listTop + listItemElement.offsetTop,
        height: listItemElement.offsetHeight,
      };

      if (listItemElement === this.listItem) {
        currentIndex = index;
      }
      if (
        targetRect.top - scrollTop < this.touch.endY &&
        this.touch.endY < targetRect.top + targetRect.height - scrollTop
      ) {
        targetIndex = index;
      }
    }

    return {
      currentIndex,
      targetIndex,
    };
  }
  _setListItem(listItem) {
    this.listItem = listItem;
  }
  render() {
    const props = Object.assign({}, this.props);
    delete props.onSwipeLeft;
    delete props.onSwipeRight;
    delete props.througnRight;
    delete props.througnLeft;

    return (
      <div
        {...props}
        className={classNames(this.props.className, 'list-item')}
        ref={this.setListItem}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
        >{this.props.children}</div>
    );
  }
}

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onTouchHold: PropTypes.func,
};

ListItem.childContextTypes = {
  listItemElement: PropTypes.func,
  holding: PropTypes.func,
  getProps: PropTypes.func,
  getTouch: PropTypes.func,
};

ListItem.contextTypes = {
  listElement: PropTypes.func,
  onSort: PropTypes.func,
};
