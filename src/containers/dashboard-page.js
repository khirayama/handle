import React, {PropTypes} from 'react';
import {Container} from '@khirayama/react-circuit';

export default class DashboardPage extends Container {
  constructor(props) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick() {
    this.props.changeLocation('/', {dispatch: this.dispatch});
  }
  render() {
    const state = this.state;

    return (
      <section className="page dashboard-page">
        <h1>Dashboard Page</h1>
        <div onClick={this.handleClick}>to Home Page</div>
        <h2>Tasks</h2>
        <ul>{state.tasks.map((task) => <li key={task.id}>{task.content}</li>)}</ul>
        <h2>Labels</h2>
        <ul>{state.labels.map((label) => <li key={label.id}>{label.name}</li>)}</ul>
      </section>
    );
  }
}

DashboardPage.propTypes = {
  changeLocation: PropTypes.func.isRequired,
};
