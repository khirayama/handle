import React, {Component} from 'react';

import Link from 'universal/views/universal/components/link';

import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from 'universal/actions/tasks-action-creators';
import {
  fetchLabels,
  createLabel,
  updateLabel,
  deleteLabel,
} from 'universal/actions/labels-action-creators';

export default class TopPage extends Component {
  constructor() {
    super();

    this.state = {
      content: '',
    };

    this.handleChange = this._handleChange.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }
  _handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      [key]: value,
    });
  }
  _handleSubmit(event) {
    event.preventDefault();
    fetchTasks();
    createTask();

    this.setState({
      content: '',
    });
  }
  render() {
    return (
      <section className="page">
        <h1>Handle</h1>
        <div>
          <Link href="/styleguide">styleguide</Link>
        </div>
        <a href="/logout">logout</a>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="content" value={this.state.content} onChange={this.handleChange}/>
        </form>
      </section>
    );
  }
}
