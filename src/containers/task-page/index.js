import React from 'react';
import {Container} from 'libs/container';

import {
  createTask,
  updateTask,
} from 'action-creators/task-action-creators';

import {Link} from 'components/link';
import {
  Icon,
  IconButton,
} from '@khirayama/handle-ui';

export class TaskPage extends Container {
  constructor(props) {
    super(props);

    const activeLabels = this.state.labels.filter(label => {
      return label.visibled;
    }).sort((labelA, labelB) => {
      return (labelA.priority > labelB.priority) ? 1 : -1;
    });

    const task = this.state.tasks.filter(task => {
      return (this.state.selectedTaskId === task.id);
    })[0];

    this.state = Object.assign({}, this.state, {
      content: (task) ? task.content : '',
      selectedLabelId: this.state.selectedLabelId || ((task) ? task.labelId : (activeLabels[0] || {}).id) || null,
    });
  }
  render() {
    const state = this.state;

    const activeLabels = state.labels.filter(label => {
      return label.visibled;
    }).sort((labelA, labelB) => {
      return (labelA.priority > labelB.priority) ? 1 : -1;
    });

    return (
      <section className="page task-page">
        <section className="page-content">
          <header className="task-page-header">
            <IconButton
              className="add-task-button"
              onClick={() => {
                if (this.state.content !== '') {
                  if (this.state.selectedTaskId === null) {
                    createTask(this.dispatch, this.state.content.trim(), this.state.selectedLabelId);
                  } else {
                    updateTask(this.dispatch, this.state.selectedTaskId, this.state.content.trim(), this.state.selectedLabelId);
                  }
                  this.props.changeLocation(`/dashboard?label-id=${state.selectedLabelId}&task-id=${state.selectedTaskId}`);
                }
              }}
              >add</IconButton>
            <Link
              href={`/dashboard?label-id=${state.selectedLabelId}&task-id=${state.selectedTaskId}`}
              className="close-task-button"
              ><Icon>close</Icon></Link>
          </header>
          <section className="task-form">
            <div className="task-form-label-select-container">
              <span className="task-form-label-select-label">Label</span>
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
            </div>
            <div className="task-form-content-input-container">
              <input
                type="text"
                className="task-form-content-input"
                placeholder="Task Content"
                value={this.state.content}
                onChange={event => {
                  this.setState({content: event.target.value});
                }}
                onKeyDown={event => {
                  const keyCode = event.keyCode;
                  const shift = event.shiftKey;
                  const ctrl = event.metaKey;

                  const ENTER_KEY = 13;
                  const ESC_KEY = 27;

                  switch (true) {
                    case (keyCode === ENTER_KEY && !shift && !ctrl):
                    case (keyCode === ENTER_KEY && shift && !ctrl):
                    case (keyCode === ENTER_KEY && !shift && ctrl): {
                      event.preventDefault();
                      if (this.state.content !== '') {
                        if (this.state.selectedTaskId === null) {
                          createTask(this.dispatch, this.state.content.trim(), this.state.selectedLabelId);
                        } else {
                          updateTask(this.dispatch, this.state.selectedTaskId, this.state.content.trim(), this.state.selectedLabelId);
                        }
                        this.props.changeLocation(`/dashboard?label-id=${state.selectedLabelId}&task-id=${state.selectedTaskId}`);
                      }
                      break;
                    }
                    case (keyCode === ESC_KEY && !shift && !ctrl):
                    case (keyCode === ESC_KEY && shift && !ctrl):
                    case (keyCode === ESC_KEY && !shift && ctrl): {
                      this.props.changeLocation(`/dashboard?label-id=${state.selectedLabelId}&task-id=${state.selectedTaskId}`);
                      break;
                    }
                    default: {
                      break;
                    }
                  }
                }}
                />
            </div>
          </section>
        </section>
      </section>
    );
  }
}

TaskPage.propTypes = {};
