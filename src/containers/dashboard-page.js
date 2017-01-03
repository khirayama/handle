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
      labelTabElements.push(<TabListItem key={index} index={index}>{label.name}</TabListItem>);
      labelTabContentElements.push(<TabContentListItem key={index} index={index}><h1>{label.name}</h1></TabContentListItem>);
    });

    return (
      <section className="page dashboard-page">
        <ApplicationHeader/>
        <Tab>
          <TabList>{labelTabElements}</TabList>
          <TabContentList>{labelTabContentElements}</TabContentList>
        </Tab>
        <h1>Dashboard Page</h1>
        <Link href="/">to Home Page</Link>
        <h2>Tasks</h2>
        <ul>{state.tasks.map(task => <li key={task.id}>{task.content}</li>)}</ul>
        <h2>Labels</h2>
        <ul>{state.labels.map(label => <li key={label.id}>{label.name}</li>)}</ul>
      </section>
    );
  }
}

DashboardPage.propTypes = {};
