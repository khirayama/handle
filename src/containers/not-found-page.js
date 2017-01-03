import React, {PropTypes} from 'react';
import {Container} from '@khirayama/react-circuit';

export default class NotFoundPage extends Container {
  constructor(props) {
    super(props);

    this.handleClick = this._handleClick.bind(this);
  }
  _handleClick() {
    this.props.changeLocation('/', {dispatch: this.dispatch});
  }
  render() {
    return (
      <section className="page not-found-page">
        <h1>Not Found</h1>
        <div onClick={this.handleClick}>to Home Page</div>
      </section>
    );
  }
}

NotFoundPage.propTypes = {
  changeLocation: PropTypes.func.isRequired,
};
