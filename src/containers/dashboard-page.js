import React, {Component} from 'react';
import {Container} from '@khirayama/react-circuit';

import Link from 'components/link';
import ApplicationHeader from 'components/application-header';

export default class DashboardPage extends Container {
  render() {
    const state = this.state;

    return (
      <section className="page dashboard-page">
        <ApplicationHeader/>
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
