import React from 'react';
import {Container} from '@khirayama/react-circuit';

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

export class DashboardPage extends Container {
  render() {
    const state = this.state;

    const labelTabElements = [];
    const labelTabContentElements = [];

    state.labels.forEach((label, index) => {
      const filterdTasks = state.tasks.filter(task => {
        return (task.labelId === label.id);
      });

      labelTabElements.push(<TabListItem key={index} index={index}>{label.name}</TabListItem>);

      labelTabContentElements.push(
        <TabContentListItem key={index} index={index}>
          <List
            onSort={(from, to) => console.log(from, to)}
            >{filterdTasks.map(task => {
              return (
                <ListItem
                  key={task.id}
                  onTouchHold={() => console.log('hold!')}
                  onSwipeLeft={() => console.log('swipe left!')}
                  onSwipeRight={() => console.log('swipe right!')}
                  througnRight={false}
                  >
                  <ListItemLeftBackground>
                    <div>L</div>
                  </ListItemLeftBackground>
                  <ListItemContent>{task.content}</ListItemContent>
                  <ListItemRightBackground>
                    <div>R</div>
                  </ListItemRightBackground>
                </ListItem>
              );
            })}</List>
        </TabContentListItem>
      );
    });

    return (
      <section className="page dashboard-page">
        <section className="page-content">
          <ApplicationHeader/>
          <Tab>
            <TabList>{labelTabElements}</TabList>
            <TabContentList>{labelTabContentElements}</TabContentList>
          </Tab>
        </section>
      </section>
    );
  }
}

DashboardPage.propTypes = {};
