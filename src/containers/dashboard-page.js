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
          <ul>{filterdTasks.map(task => <li key={task.id}>{task.content}</li>)}</ul>
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
