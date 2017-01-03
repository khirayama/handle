import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import {Link} from 'spectrometer';
import {Container} from '@khirayama/react-circuit';

function IconButton(props) {
  return <button {...props} className={classNames('icon-button', props.className)}>{props.children}</button>;
}

class ApplicationHeader extends Component {
  render() {
    return (
      <section className="application-header">
        <Link href="/setting" className="setting-link">
          <div style={{width: '44px', height: '44px'}} className="setting-link-content"/>
        </Link>
        <div className="search-button-container">
          <IconButton className="search-button">search</IconButton>
        </div>
      </section>
    );
  }
}

export default class DashboardPage extends Container {
  render() {
    const state = this.state;

    return (
      <section className="page dashboard-page">
        <ApplicationHeader />
        <h1>Dashboard Page</h1>
        <Link href="/" className="link">to Home Page</Link>
        <h2>Tasks</h2>
        <ul>{state.tasks.map((task) => <li key={task.id}>{task.content}</li>)}</ul>
        <h2>Labels</h2>
        <ul>{state.labels.map((label) => <li key={label.id}>{label.name}</li>)}</ul>
      </section>
    );
  }
}

DashboardPage.propTypes = {};
