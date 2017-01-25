import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

import {TRANSITION_TIME} from '../constants';

export class SortableList extends Component {
  constructor() {
    super();

    this.setListElement = this._setListElement.bind(this);
  }
  componentDidMount() {
    this.listElement.querySelector('.sortable-list-content').addEventListener('contextmenu', event => {
      event.preventDefault();
    });
  }
  getChildContext() {
    return {
      listElement: () => this.listElement,
      onSort: this.props.onSort,
    };
  }
  _setListElement(listElement) {
    this.listElement = listElement;
  }
  render() {
    return (
      <section
        className={classNames('sortable-list', this.props.className)}
        ref={this.setListElement}
        >
        <div className="sortable-list-content">
          <ReactCSSTransitionGroup
            transitionAppear={false}
            transitionName="sortable-list-item-transition"
            transitionEnterTimeout={TRANSITION_TIME}
            transitionLeaveTimeout={TRANSITION_TIME}
            >{this.props.children}</ReactCSSTransitionGroup>
        </div>
      </section>
    );
  }
}

SortableList.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onSort: PropTypes.func,
};

SortableList.childContextTypes = {
  listElement: PropTypes.func,
  onSort: PropTypes.func,
};
