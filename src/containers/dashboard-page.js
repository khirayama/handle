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
    return (
      <section className="page dashboard-page">
        <h1>Dashboard Page</h1>
        <div onClick={this.handleClick}>to Home Page</div>
      </section>
    );
  }
}

DashboardPage.propTypes = {
  changeLocation: PropTypes.func.isRequired,
};
