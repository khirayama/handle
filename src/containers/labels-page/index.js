import React from 'react';
import classNames from 'classnames';
import {Container} from 'libs/container';

import {
  createLabel,
  updateLabel,
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
import {
  Modal,
  ModalHeader,
} from 'components/modal';

export class LabelsPage extends Container {
  constructor(props) {
    super(props);

    this.state = Object.assign({}, this.state, {
      showLabelModal: false,
      selectedLabelId: null,
      name: '',
    });
  }
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
                onClick={() => {
                  this.setState({
                    showLabelModal: true,
                    selectedLabelId: label.id,
                    name: label.name,
                  });
                }}
                >
                <IconButton
                  className="label-list-left-icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (label.visibled) {
                      unvisibledLabel(this.dispatch, label.id);
                    } else {
                      visibledLabel(this.dispatch, label.id);
                    }
                  }
                }>{(label.visibled) ? "visibility" : "visibility_off"}</IconButton>
                <div className="label-list-item-content">{label.name}</div>
                <IconButton
                  className="label-list-right-icon"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (confirm('Delete it?')) {
                      deleteLabel(this.dispatch, label.id);
                    }
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
                onClick={() => {
                  this.setState({
                    showLabelModal: true,
                    selectedLabelId: label.id,
                    name: label.name,
                  });
                }}
                onSwipeLeft={() => {
                  if (confirm('Delete it?')) {
                    deleteLabel(this.dispatch, label.id);
                  }
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
                <ListItemContent className={classNames({'list-item-content__unvisibled': !label.visibled})}>{label.name}</ListItemContent>
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
              >
              <IconButton>arrow_back</IconButton>
            </Link>
          </header>
          <div className="list-container">{labelList}</div>
          <div
            className="add-label-button" onClick={() => {
              this.setState({showLabelModal: true, name: '', selectedLabelId: null});
            }}
                                         ><Icon>add</Icon>Add Label</div>
        </section>
        <Modal show={this.state.showLabelModal}>
          <ModalHeader
            onClickCloseButton={() => this.setState({showLabelModal: false})}
            >
            <IconButton
              onClick={() => {
                if (this.state.selectedLabelId === null) {
                  createLabel(this.dispatch, this.state.name);
                } else {
                  updateLabel(this.dispatch, this.state.selectedLabelId, this.state.name);
                }
                this.setState({showLabelModal: false});
              }}
              className="action-button"
              >add</IconButton>
          </ModalHeader>
          <section className="label-form">
            <div className="label-form-content-textarea-container">
              <textarea
                autoFocus
                className="label-form-content-textarea"
                placeholder="Name"
                value={this.state.name}
                onChange={event => {
                  this.setState({name: event.target.value});
                }}
                />
            </div>
          </section>
        </Modal>
      </section>
    );
  }
}

LabelsPage.propTypes = {};
