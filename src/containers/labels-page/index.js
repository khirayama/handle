import React from 'react';
import classNames from 'classnames';
import {Container} from 'libs/container';

import {
  unvisibledLabel,
  visibledLabel,
  deleteLabel,
  sortLabels,
} from 'action-creators/label-action-creators';

import {Link} from 'components/link';
import {IconButton} from 'components/icon-button';
import {Icon} from 'components/icon';
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

function promiseConfirm(message, approvalLabel = 'YES', denialLabel = 'NO') {
  return new Promise((resolve, reject) => {
    const html = `
      <div class="__promise-confirm">
        <div class="__promise-confirm-content">
          <div class="__promise-confirm-content-message">${message}</div>
          <div class="__promise-confirm-content-buttons">
            <button class="__promise-confirm-content-approval-button">${approvalLabel}</button>
            <button class="__promise-confirm-content-denial-button">${denialLabel}</button>
          </div>
        </div>
      </div>
    `;

    const wrapper= document.createElement('div');
    wrapper.innerHTML = html;

    const element = wrapper.querySelector('.__promise-confirm');
    const approvalButton = element.querySelector('.__promise-confirm-content-approval-button');
    const denialButton = element.querySelector('.__promise-confirm-content-denial-button');

    const handleKeyup = event => {
      if (event.keyCode === 27 /* ESC */) {
        element.parentNode.removeChild(element);
        resolve(false);
      }
    }

    approvalButton.addEventListener('keyup', handleKeyup);
    denialButton.addEventListener('keyup', handleKeyup);

    approvalButton.addEventListener('blur', () => {
      denialButton.focus();
    });
    denialButton.addEventListener('blur', () => {
      approvalButton.focus();
    });

    approvalButton.addEventListener('click', () => {
      element.parentNode.removeChild(element);
      resolve(true);
    });
    denialButton.addEventListener('click', () => {
      element.parentNode.removeChild(element);
      resolve(false);
    });

    const parent = document.querySelector('body');
    parent.insertBefore(element, parent.firstChild);
    approvalButton.focus();
  });
}

export class LabelsPage extends Container {
  render() {
    let labelList = null;

    if (this.state.ui === 'desktop') {
      labelList = (
        <SortableList
          className="label-list"
          onSort={(from, to) => {
            sortLabels(this.dispatch, this.state.labels[from].id, to);
          }}
          >{this.state.labels.sort((labelA, labelB) => {
            return (labelA.priority > labelB.priority) ? 1 : -1;
          }).map(label => {
            return (
              <SortableListItem
                key={label.id}
                className={classNames({'sortable-list-item__unvisibled': !label.visibled})}
                >
                <IconButton
                  className="label-list-left-icon"
                  onClick={event => {
                    event.stopPropagation();
                    if (label.visibled) {
                      unvisibledLabel(this.dispatch, label.id);
                    } else {
                      visibledLabel(this.dispatch, label.id);
                    }
                  }
                }
                  >{(label.visibled) ? 'visibility' : 'visibility_off'}</IconButton>
                <div
                  className="label-list-item-content"
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
                      this.props.changeLocation(`/labels/${label.id}/edit`);
                    }
                  }}
                  >{label.name}</div>
                <IconButton
                  className="label-list-right-icon"
                  onClick={event => {
                    event.stopPropagation();
                    promiseConfirm(`Delete ${label.name} label?`).then(confirm_ => {
                      if (confirm_) {
                        deleteLabel(this.dispatch, label.id);
                      }
                    });
                  }}
                  >delete</IconButton>
              </SortableListItem>
            );
          })}
        </SortableList>
      );
    } else if (this.state.ui === 'mobile') {
      labelList = (
        <List
          className="label-list"
          onSort={(from, to) => {
            sortLabels(this.dispatch, this.state.labels[from].id, to);
          }}
          >{this.state.labels.sort((labelA, labelB) => {
            return (labelA.priority > labelB.priority) ? 1 : -1;
          }).map(label => {
            return (
              <ListItem
                key={label.id}
                onSwipeLeft={() => {
                  promiseConfirm(`Delete ${label.name} label?`).then(confirm_ => {
                    if (confirm_) {
                      deleteLabel(this.dispatch, label.id);
                    }
                  });
                }}
                onSwipeRight={() => {
                  if (label.visibled) {
                    unvisibledLabel(this.dispatch, label.id);
                  } else {
                    visibledLabel(this.dispatch, label.id);
                  }
                }}
                througnLeft={false}
                througnRight={false}
                >
                <ListItemLeftBackground>
                  {(label.visibled) ?
                    (<Icon>visibility_off</Icon>) :
                    (<Icon>visibility</Icon>)
                  }
                </ListItemLeftBackground>
                <ListItemContent
                  className={classNames({'list-item-content__unvisibled': !label.visibled})}
                  onClick={() => {
                    this.props.changeLocation(`/labels/${label.id}/edit`);
                  }}
                  >{label.name}</ListItemContent>
                <ListItemRightBackground>
                  <Icon>delete</Icon>
                </ListItemRightBackground>
              </ListItem>
            );
          })}
        </List>
      );
    }

    return (
      <section className="page labels-page">
        <section className="page-content">
          <header className="labels-header">
            <Link
              className="close-labels-button"
              href="/dashboard"
              ><Icon>arrow_back</Icon></Link>
          </header>
          <div className="list-container">{labelList}</div>
          <Link
            href="/labels/new"
            className="add-label-button"
            ><Icon>add</Icon>Add Label</Link>
        </section>
      </section>
    );
  }
}

LabelsPage.propTypes = {};
