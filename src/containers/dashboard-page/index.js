import React from 'react';
import classNames from 'classnames';
import {Container} from 'libs/container';
import {parseTextToItem} from 'libs/parse-text-to-item';

import {
  deleteTask,
  uncompletedTask,
  completedTask,
  sortTasks,
  fixTaskPriorities,
} from 'action-creators/task-action-creators';

import {ApplicationHeader} from 'components/application-header';
import {Link} from 'components/link';
import {Icon} from 'components/icon';
import {IconButton} from 'components/icon-button';
import {
  List,
  ListItem,
  ListItemContent,
  ListItemLeftBackground,
  ListItemRightBackground,
} from 'components/list';
import {
  SortableList,
  SortableListItem,
} from 'components/sortable-list';
import {
  Tab,
  TabList,
  TabListItem,
  TabContentList,
  TabContentListItem,
} from 'components/tab';

export class DashboardPage extends Container {
  componentDidMount() {
    super.componentDidMount();
    fixTaskPriorities(this.dispatch);
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
      }).map(task => {
        const {schedule, text} = parseTextToItem(task.content, new Date(task.createdAt));
        const newTask = (schedule) ? {
          content: text,
          schedule: `${('0' + schedule.month).slice(-2)}/${('0' + schedule.date).slice(-2)}(${schedule.shortDayName}.)`,
        } : {};

        return Object.assign({}, task, newTask);
      });
      let labelTabContentList = null;

      labelTabElements.push(<TabListItem key={index} index={index}>{label.name}</TabListItem>);

      if (this.state.ui === 'desktop') {
        labelTabContentList = (
          <SortableList
            className="task-list"
            onSort={(from, to) => {
              sortTasks(this.dispatch, filterdTasks[from].id, to);
            }}
            >
            {filterdTasks.map(task => {
              return (
                <SortableListItem
                  key={task.id}
                  className={classNames({'sortable-list-item__completed': task.completed})}
                  >
                  <IconButton
                    className="task-list-left-icon"
                    onClick={event => {
                      event.stopPropagation();
                      if (task.completed) {
                        uncompletedTask(this.dispatch, task.id);
                      } else {
                        completedTask(this.dispatch, task.id);
                      }
                    }
                  }
                    >done</IconButton>
                  <div
                    className="task-list-item-content"
                    onMouseDown={() => {
                      this.down = true;
                      this.clickable = true;
                    }}
                    onMouseMove={() => {
                      if (this.down) {
                        this.clickable = false;
                      } else {
                        this.clickable = true;
                      }
                    }}
                    onMouseUp={() => {
                      setTimeout(() => {
                        this.down = false;
                        this.clickable = true;
                      }, 0);
                    }}
                    onClick={() => {
                      if (this.clickable) {
                        this.props.changeLocation(`/tasks/${task.id}/edit`);
                      }
                    }}
                    >{(task.schedule) ? <span className="task-list-item-content-schedule">{task.schedule}</span> : null}{task.content}</div>
                  <IconButton
                    className="task-list-right-icon"
                    onClick={event => {
                      event.stopPropagation();
                      deleteTask(this.dispatch, task.id);
                    }}
                    >delete</IconButton>
                </SortableListItem>
              );
            })}</SortableList>
        );
      } else if (this.state.ui === 'mobile') {
        labelTabContentList = (
          <List
            className="task-list"
            onSort={(from, to) => {
              sortTasks(this.dispatch, filterdTasks[from].id, to);
            }}
            >
            {filterdTasks.map(task => {
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
                    <Icon>check</Icon>
                  </ListItemLeftBackground>
                  <ListItemContent
                    onClick={() => {
                      this.props.changeLocation(`/tasks/${task.id}/edit`);
                    }}
                    className={classNames({'list-item-content__completed': task.completed})}
                    >{(task.schedule) ? <span className="task-list-item-content-schedule">{task.schedule}</span> : null}{task.content}</ListItemContent>
                  <ListItemRightBackground>
                    <Icon>delete</Icon>
                  </ListItemRightBackground>
                </ListItem>
              );
            })}</List>
        );
      }

      labelTabContentElements.push(
        <TabContentListItem key={index} index={index}>
          <div className="list-container">{labelTabContentList}</div>
          <Link
            href={`/tasks/new?label-id=${label.id}`}
            className="add-task-button"
            ><Icon>add</Icon>Add Task</Link>
        </TabContentListItem>
      );
    });

    return (
      <section className="page dashboard-page">
        <section className="page-content">
          <ApplicationHeader imageUrl={state.profile.imageUrl}/>
          <section className="tab-container">
            <Tab index={state.dashboardTabIndex}>
              <TabList>{labelTabElements}</TabList>
              <TabContentList>{labelTabContentElements}</TabContentList>
            </Tab>
          </section>
        </section>
      </section>
    );
  }
}

DashboardPage.propTypes = {};
