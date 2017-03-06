import React from 'react';
import classNames from 'classnames';
import {Container} from 'libs/container';
import promiseConfirm from 'libs/promise-confirm';

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
  Tabs,
  TabList,
  TabListItem,
  TabContentList,
  TabContentListItem,
  List,
  ListItem,
  SwipeableView,
  SwipeableViewContent,
  SwipeableViewBackground,
} from '@khirayama/handle-ui';

export class LabelsPage extends Container {
  render() {
    let labelList = null;

    if (this.state.ui === 'desktop') {
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
                className={classNames({'list-item__unvisibled': !label.visibled})}
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
              </ListItem>
            );
          })}
        </List>
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
              <ListItem key={label.id}>
                <SwipeableView
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
                  >
                  <SwipeableViewBackground position='left'>
                    {(label.visibled) ?
                      (<Icon>visibility_off</Icon>) :
                      (<Icon>visibility</Icon>)
                    }
                  </SwipeableViewBackground>
                  <SwipeableViewContent
                    className={classNames({'swipeable-view-content__unvisibled': !label.visibled})}
                    onClick={() => {
                      this.props.changeLocation(`/labels/${label.id}/edit`);
                    }}
                    >{label.name}</SwipeableViewContent>
                  <SwipeableViewBackground position='right'>
                    <Icon>delete</Icon>
                  </SwipeableViewBackground>
                </SwipeableView>
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
