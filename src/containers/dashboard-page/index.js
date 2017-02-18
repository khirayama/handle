import React from 'react';
import classNames from 'classnames';
import {Container} from 'libs/container';
import {parseTextToItem} from 'libs/parse-text-to-item';

import {
  updateSelectedLabelId,
} from 'action-creators/application-state-action-creators';

import {
  deleteTask,
  uncompletedTask,
  completedTask,
  sortTasks,
  fixTaskPriorities,
} from 'action-creators/task-action-creators';

import {ApplicationHeader} from 'components/application-header';
import {Link} from 'components/link';
import {LinkText} from 'components/link-text';
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

function updateQueryStringParameter(uri, key, value) {
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  const separator = uri.indexOf('?') === -1 ? '?' : '&';

  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  }
  return uri + separator + key + '=' + value;
}

export class DashboardPage extends Container {
  componentDidMount() {
    super.componentDidMount();

    fixTaskPriorities(this.dispatch);

    let href = updateQueryStringParameter(location.href, 'label-id', this.state.selectedLabelId);
    href = updateQueryStringParameter(href, 'task-id', this.state.selectedTaskId);
    history.replaceState(null, null, href);
  }
  componentDidUpdate() {
    let href = updateQueryStringParameter(location.href, 'label-id', this.state.selectedLabelId);
    href = updateQueryStringParameter(href, 'task-id', this.state.selectedTaskId);
    history.replaceState(null, null, href);
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

    let tabIndex = 0;
    activeLabels.forEach((label, index) => {
      if (label.id === state.selectedLabelId) {
        tabIndex = index;
      }
    });

    activeLabels.forEach((label, index) => {
      const filterdTasks = state.tasks.filter(task => {
        return (task.labelId === label.id);
      }).sort((taskA, taskB) => {
        return (taskA.priority > taskB.priority) ? 1 : -1;
      }).map(task => {
        const {schedule, text} = parseTextToItem(task.content, new Date(task.createdAt));
        return Object.assign({}, task, {
          content: text,
          schedule,
        });
      });
      let labelTabContentList = null;

      labelTabElements.push(<TabListItem
        key={index} index={index} onActive={() => {
          updateSelectedLabelId(this.dispatch, label.id);

          const href = updateQueryStringParameter(location.href, 'label-id', label.id);
          history.replaceState(null, null, href);
        }}
                                  >{label.name}</TabListItem>);

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
                    >
                    {(task.schedule) ? (
                      <span className="task-list-item-content-schedule-container">
                        <span className={`task-list-item-content-schedule task-list-item-content-schedule__${task.schedule.shortMonthName.toLowerCase()}`}>
                          <span className="task-list-item-content-schedule-month">
                            {task.schedule.shortMonthName}
                          </span>
                          <span className="task-list-item-content-schedule-date">
                            {task.schedule.date}
                          </span>
                          <span className="task-list-item-content-schedule-day">
                            {task.schedule.shortDayName}
                          </span>
                        </span>
                      </span>
                    ) : null}
                    <span className="task-list-item-content-text"><LinkText text={task.content}/></span>
                  </div>
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
                    >
                    {(task.schedule) ? (
                      <span className="task-list-item-content-schedule-container">
                        <span className={`task-list-item-content-schedule task-list-item-content-schedule__${task.schedule.shortMonthName.toLowerCase()}`}>
                          <span className="task-list-item-content-schedule-month">
                            {task.schedule.shortMonthName}
                          </span>
                          <span className="task-list-item-content-schedule-date">
                            {task.schedule.date}
                          </span>
                          <span className="task-list-item-content-schedule-day">
                            {task.schedule.shortDayName}
                          </span>
                        </span>
                      </span>
                    ) : null}
                    <span className="task-list-item-content-text"><LinkText text={task.content}/></span>
                  </ListItemContent>
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
            <Tab index={tabIndex}>
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
