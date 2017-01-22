import React from 'react';
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
import {
  List,
  ListItem,
  ListItemContent,
  ListItemLeftBackground,
  ListItemRightBackground,
} from 'components/list';
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
          <div className="list-container">
            <List
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
                        unvisibledLabel(this.dispatch, label.id)
                      } else {
                        visibledLabel(this.dispatch, label.id)
                      }
                    }}
                    througnLeft={false}
                    througnRight={false}
                    >
                    <ListItemLeftBackground>
                      <div>L</div>
                    </ListItemLeftBackground>
                    <ListItemContent>{label.name}</ListItemContent>
                    <ListItemRightBackground>
                      <div>R</div>
                    </ListItemRightBackground>
                  </ListItem>
                );
              })}
            </List>
          </div>
          <div
            className="add-label-button" onClick={() => {
              this.setState({showLabelModal: true, name: '', selectedLabelId: null});
            }}>Add label</div>
        </section>
        <Modal show={this.state.showLabelModal}>
          <ModalHeader onClickCloseButton={() => this.setState({showLabelModal: false})}/>
          <div>
            <input type="text" value={this.state.name} onChange={(event) => {this.setState({name: event.target.value})}}/>
            <button onClick={() => {
              if (this.state.selectedLabelId !== null) {
                updateLabel(this.dispatch, this.state.selectedLabelId, this.state.name);
              } else {
                createLabel(this.dispatch, this.state.name);
              }
              this.setState({showLabelModal: false});
            }}>Add label</button>
          </div>
        </Modal>
      </section>
    );
  }
}

LabelsPage.propTypes = {};
