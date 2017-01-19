import React from 'react';
import {Container} from '@khirayama/react-circuit';

import {
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

export class LabelsPage extends Container {
  render() {
    return (
      <section className="page labels-page">
        <section className="page-content">
          <header className="labels-header">
            <Link
              className="close-labels-button"
              href="/dashboard"
              >
              <IconButton>close</IconButton>
            </Link>
          </header>
          <div className="list-container">
            <List
              onSort={(from, to) => {
                sortLabels(this.dispatch, this.state.labels[from].id, to);
              }}
              >{this.state.labels.sort((labelA, labelB) => {
                return (labelA.order > labelB.order) ? 1 : -1;
              }).map(label => {
                return (
                  <ListItem
                    key={label.id}
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
        </section>
      </section>
    );
  }
}

LabelsPage.propTypes = {};
