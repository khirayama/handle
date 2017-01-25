import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import {
  TRANSITION_TIME,
  THRESHOLD_SCROLL_HEIGHT,
  transitionProperties,
} from '../constants';

export class SortableListItem extends Component {
  constructor() {
    super();

    this.clickable = true;
    this.touch = {
      down: false,
      startX: null,
      startY: null,
      startScrollTop: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
    };

    this.handleTouchStart = this._handleTouchStart.bind(this);
    this.handleTouchMove = this._handleTouchMove.bind(this);
    this.handleTouchEnd = this._handleTouchEnd.bind(this);

    this.setListItem = this._setListItem.bind(this);
  }
  componentDidMount() {
    this._enterListItemAnimation();
  }

  // handling event
  _handleTouchStart(event) {
    this.touch = Object.assign({}, this.touch, {
      down: true,
      startX: event.clientX,
      startY: event.clientY,
      startScrollTop: this.context.listElement().scrollTop,
      startTime: new Date(),
    });
  }
  _handleTouchMove(event) {
    if (this.touch.down) {
      this.touch = Object.assign({}, this.touch, {
        endX: event.clientX,
        endY: event.clientY,
        endTime: new Date(),
      });

      this._updateTouchMoveView();
    }
  }
  _handleTouchEnd() {
    this._updateTouchEndView();

    const {currentIndex, targetIndex} = this._calcIndex();

    this.clickable = (currentIndex === null || targetIndex === null);
    if (currentIndex !== null && targetIndex !== null && this.context.onSort) {
      this.context.onSort(currentIndex, targetIndex);
    }

    this.touch = {
      down: false,
      startX: null,
      startY: null,
      startScrollTop: null,
      startTime: new Date(),
      endX: null,
      endY: null,
      endTime: new Date(),
    };
  }

  // update views
  _updateTouchMoveView() {
    if (this.context.onSort) {
      this.listItem.classList.add('sortable-list-item__sorting');

      this._moveCurrentListItemAnimation();
      this._moveListItemAnimation();
      this._scrollListView();
    }
  }
  _updateTouchEndView() {
    if (this.listItem.classList.contains('sortable-list-item__sorting')) {
      this.listItem.classList.remove('sortable-list-item__sorting');
    }

    const listElement = this.context.listElement();
    const listItemElements = listElement.querySelectorAll('.sortable-list-item');

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
    const el = this.listItem;
    const height = el.offsetHeight;

    this.listItem.style.transitionProperty = transitionProperties.HEIGHT;
    this.listItem.style.height = height + 'px';
    setTimeout(() => {
      if (el.classList.contains('sortable-list-item-transition-enter')) {
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
    const listItemElements = listElement.querySelectorAll('.sortable-list-item');

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
    const listContentElement = listElement.querySelector('.sortable-list-content');
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
    const listItemElements = listElement.querySelectorAll('.sortable-list-item');

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

    return (
      <div
        {...props}
        className={classNames(this.props.className, 'sortable-list-item')}
        ref={this.setListItem}
        onMouseDown={this.handleTouchStart}
        onMouseMove={this.handleTouchMove}
        onMouseUp={this.handleTouchEnd}
        onClick={event => {
          if (this.clickable) {
            this.props.onClick(event);
          }
          this.clickable = true;
        }}
        >{this.props.children}</div>
    );
  }
}

SortableListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

SortableListItem.contextTypes = {
  listElement: PropTypes.func,
  onSort: PropTypes.func,
};
