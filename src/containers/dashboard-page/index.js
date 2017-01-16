import React, {Component} from 'react';
import classNames from 'classnames';
import {Container} from '@khirayama/react-circuit';

import {
  deleteTask,
  uncompletedTask,
  completedTask,
  sortTasks,
} from 'action-creators/task-action-creators';

import {
  ApplicationHeader,
} from 'components/application-header';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemLeftBackground,
  ListItemRightBackground,
} from 'components/list';
import {
  Tab,
  TabList,
  TabListItem,
  TabContentList,
  TabContentListItem,
} from 'components/tab';

class Modal extends Component {
  render() {
    return (
      <div className={classNames("modal", {"modal__open": this.props.show})}>{this.props.children}</div>
    );
  }
}

export class DashboardPage extends Container {
  constructor() {
    super();

    this.state = Object.assign({}, this.state, {
      showLabelModal: false,
      showTaskModal: false,
    });
  }
  _setShowLabelModal(showLabelModal) {
    this.setState({showLabelModal});
  }
  _setShowTaskModal(showTaskModal) {
    this.setState({showTaskModal});
  }
  render() {
    const state = this.state;

    const labelTabElements = [];
    const labelTabContentElements = [];

    state.labels.forEach((label, index) => {
      const filterdTasks = state.tasks.filter(task => {
        return (task.labelId === label.id);
      }).sort((taskA, taskB) => {
        return (taskA.order > taskB.order) ? 1 : -1;
      });

      labelTabElements.push(<TabListItem key={index} index={index}>{label.name}</TabListItem>);

      labelTabContentElements.push(
        <TabContentListItem key={index} index={index}>
          <div className="list-container">
            <List
              onSort={(from, to) => {
                sortTasks(this.dispatch, filterdTasks[from].id, to);
              }}
              >{filterdTasks.map(task => {
                return (
                  <ListItem
                    key={task.id}
                    onSwipeLeft={() => {
                      deleteTask(this.dispatch, task.id);
                    }}
                    onSwipeRight={() => {
                      if (task.completed) {
                        uncompletedTask(this.dispatch, task.id);
                      } else {
                        completedTask(this.dispatch, task.id);
                      }
                    }}
                    througnRight={false}
                    >
                    <ListItemLeftBackground>
                      <div>L</div>
                    </ListItemLeftBackground>
                    <ListItemContent
                      className={classNames({'list-item-content__completed': task.completed})}
                      >{task.content}</ListItemContent>
                    <ListItemRightBackground>
                      <div>R</div>
                    </ListItemRightBackground>
                  </ListItem>
                );
              })}</List>
            </div>
            <div className="add-task-button" onClick={() => {this._setShowTaskModal(true)}}>add task</div>
        </TabContentListItem>
      );
    });

    return (
      <section className="page dashboard-page">
        <section className="page-content">
          <ApplicationHeader onClickAddLabelButton={() => {
            this._setShowLabelModal(true);
          }}/>
          <section className="tab-container">
            <Tab>
              <TabList>{labelTabElements}</TabList>
              <TabContentList>{labelTabContentElements}</TabContentList>
            </Tab>
          </section>
        </section>
        <Modal show={this.state.showLabelModal}><div onClick={() => {this._setShowLabelModal(false)}}>close</div>create label</Modal>
        <Modal show={this.state.showTaskModal}><div onClick={() => {this._setShowTaskModal(false)}}>close</div>create task</Modal>
      </section>
    );
  }
}


DashboardPage.propTypes = {};
