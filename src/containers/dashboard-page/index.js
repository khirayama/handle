import React from 'react';
import classNames from 'classnames';
import {Container} from 'libs/container';

import {
  createTask,
  updateTask,
  deleteTask,
  uncompletedTask,
  completedTask,
  sortTasks,
} from 'action-creators/task-action-creators';

import {ApplicationHeader} from 'components/application-header';
import {Icon} from 'components/icon';
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
import {
  Modal,
  ModalHeader,
} from 'components/modal';

export class DashboardPage extends Container {
  constructor(props) {
    super(props);

    const activeLabels = this.state.labels.filter(label => {
      return label.visibled;
    }).sort((labelA, labelB) => {
      return (labelA.priority > labelB.priority) ? 1 : -1;
    });

    this.state = Object.assign({}, this.state, {
      showTaskModal: false,
      content: '',
      selectedTaskId: null,
      selectedLabelId: (activeLabels[0] || {}).id || null,
    });
  }
  render() {
    const state = this.state;

    const labelTabElements = [];
    const labelTabContentElements = [];

    const activeLabels = state.labels.filter(label => {
      return label.visibled;
    }).sort((labelA, labelB) => {
      return (labelA.priority > labelB.priority) ? 1 : -1;
    });

    activeLabels.forEach((label, index) => {
      const filterdTasks = state.tasks.filter(task => {
        return (task.labelId === label.id);
      }).sort((taskA, taskB) => {
        return (taskA.priority > taskB.priority) ? 1 : -1;
      });

      labelTabElements.push(<TabListItem key={index} index={index}>{label.name}</TabListItem>);

      labelTabContentElements.push(
        <TabContentListItem key={index} index={index}>
          <div className="list-container">
            <List
              className="task-list"
              onSort={(from, to) => {
                sortTasks(this.dispatch, filterdTasks[from].id, to);
              }}
              >{filterdTasks.map(task => {
                return (
                  <ListItem
                    key={task.id}
                    onClick={() => {
                      this.setState({
                        showTaskModal: true,
                        content: task.content,
                        selectedTaskId: task.id,
                        selectedLabelId: label.id,
                      });
                    }}
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
                      <Icon>check</Icon>
                    </ListItemLeftBackground>
                    <ListItemContent
                      className={classNames({'list-item-content__completed': task.completed})}
                      >{task.content}</ListItemContent>
                    <ListItemRightBackground>
                      <Icon>delete</Icon>
                    </ListItemRightBackground>
                  </ListItem>
                );
              })}</List>
          </div>
          <div
            className="add-task-button" onClick={() => {
              this.setState({
                showTaskModal: true,
                selectedLabelId: label.id,
                selectedTaskId: null,
                content: '',
              });
            }}
            ><Icon>add</Icon>Add Task</div>
        </TabContentListItem>
      );
    });

    return (
      <section className="page dashboard-page">
        <section className="page-content">
          <ApplicationHeader imageUrl={state.user.imageUrl}/>
          <section className="tab-container">
            <Tab>
              <TabList>{labelTabElements}</TabList>
              <TabContentList>{labelTabContentElements}</TabContentList>
            </Tab>
          </section>
        </section>
        <Modal show={this.state.showTaskModal}>
          <ModalHeader onClickCloseButton={() => this.setState({showTaskModal: false})}/>
          <div>
            {(this.state.selectedLabelId) ? (
              <select
                value={this.state.selectedLabelId}
                onChange={event => {
                  this.setState({selectedLabelId: Number(event.target.value)});
                }}
                >
                {activeLabels.map(label => <option key={label.id} value={label.id}>{label.name}</option>)}
              </select>
            ) : null}
            <input
              type="text" value={this.state.content} onChange={event => {
                this.setState({content: event.target.value});
              }}
                                                     />
            <button
              onClick={() => {
                if (this.state.content !== '') {
                  if (this.state.selectedTaskId !== null) {
                    updateTask(this.dispatch, this.state.selectedTaskId, this.state.content, this.state.selectedLabelId);
                  } else {
                    createTask(this.dispatch, this.state.content, this.state.selectedLabelId);
                  }
                  this.setState({showTaskModal: false});
                }
              }}
              ><Icon>add</Icon>Add Task</button>
          </div>
        </Modal>
      </section>
    );
  }
}

DashboardPage.propTypes = {};
