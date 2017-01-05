import React from 'react';
import {Container} from '@khirayama/react-circuit';

import Link from 'components/link';
import ApplicationHeader from 'components/application-header';
import {
  Tab,
  TabList,
  TabListItem,
  TabContentList,
  TabContentListItem,
} from 'components/tab';
import {
  List,
  ListItem,
} from 'components/list';

export default class DashboardPage extends Container {
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
          <List>{filterdTasks.map(task => {
            return (
              <ListItem
                key={task.id}
                onClick={() => console.log('tap')}
                onHold={() => console.log('hold!')}
                onSwipeLeft={() => console.log('swipe left!')}
                onSwipeRight={() => console.log('swipe right!')}
              >{task.content}</ListItem>
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
