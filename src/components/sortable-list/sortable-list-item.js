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

    this.mouse = {
      down: false,
      clickable: true,
      startX: null,
      startY: null,
      startScrollTop: null,
      endX: null,
      endY: null,
    };

    this.handleMouseDown = this._handleMouseDown.bind(this);
    this.handleMouseMove = this._handleMouseMove.bind(this);
    this.handleMouseUp = this._handleMouseUp.bind(this);

    this.setListItem = this._setListItem.bind(this);
  }
  componentDidMount() {
    this._enterListItemAnimation();
  }

  // handling event
  _handleMouseDown(event) {
    this.mouse = Object.assign({}, this.mouse, {
      down: true,
      startX: event.clientX,
      startY: event.clientY,
      startScrollTop: this.context.listElement().scrollTop,
    });
  }
  _handleMouseMove(event) {
    if (this.mouse.down) {
      this.mouse = Object.assign({}, this.mouse, {
        clickable: false,
        endX: event.clientX,
        endY: event.clientY,
      });

      this._updateMouseMoveView();
    }
  }
  _handleMouseUp() {
    this._updateMouseUpView();

    const {currentIndex, targetIndex} = this._calcIndex();

    if (currentIndex !== null && targetIndex !== null && this.context.onSort) {
      this.context.onSort(currentIndex, targetIndex);
    }

    this.mouse = {
      down: false,
      clickable: this.mouse.clickable,
      startX: null,
      startY: null,
      startScrollTop: null,
      endX: null,
      endY: null,
    };
    setTimeout(() => {
      this.mouse.clickable = true;
    }, 0);
  }

  // update views
  _updateMouseMoveView() {
    if (this.context.onSort) {
      this.listItem.classList.add('sortable-list-item__sorting');

      this._moveCurrentListItemAnimation();
      this._moveListItemAnimation();
      this._scrollListView();
    }
  }
  _updateMouseUpView() {
    if (this.listItem.classList.contains('sortable-list-item__sorting')) {
      this.listItem.classList.remove('sortable-list-item__sorting');
    }

    const listElement = this.context.listElement();
    const listItemElements = listElement.querySelectorAll('.sortable-list-item');

    for (let index = 0; index < listItemElements.length; index++) {
      const listItemElement = listItemElements[index];

      listItemElement.style.transform = 'translateY(0px)';
      listItemElement.style.transitionProperty = transitionProperties.HEIGHT;
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
    const scrollDiff = this.mouse.startScrollTop - this.context.listElement().scrollTop;

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
          this.mouse.endY &&
          listElement.scrollTop > 0 &&
          this.mouse.endY < listElementRect.top + THRESHOLD_SCROLL_HEIGHT
        ) {
          listElement.scrollTop -= 3;
          this._moveCurrentListItemAnimation();
          this._moveListItemAnimation();
        } else if (
          this.mouse.endY &&
          listElement.scrollTop < listContentElement.offsetHeight - listElement.offsetHeight &&
          this.mouse.endY > listElementRect.top + listElement.offsetHeight - THRESHOLD_SCROLL_HEIGHT
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
    let x = this.mouse.endX - this.mouse.startX;
    let y = this.mouse.endY - this.mouse.startY;

    if (this.mouse.endX === null || this.mouse.endY === null) {
      x = 0;
      y = 0;
    }
    return {
      x,
      y,
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
        targetRect.top - scrollTop < this.mouse.endY &&
        this.mouse.endY < targetRect.top + targetRect.height - scrollTop
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
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onClick={(event) => {
          if (this.mouse.clickable && this.props.onClick) {
            this.props.onClick(event);
          }
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
