import {Component, PropTypes} from 'react';

export class Container extends Component {
  constructor(props) {
    super(props);

    const store = this.props.store;

    this.state = store.getState();

    this.dispatch = store.dispatch.bind(store);
    this.updateState = this._updateState.bind(this);
  }

  componentDidMount() {
    const store = this.props.store;

    store.addChangeListener(this.updateState);
  }

  componentWillUnmount() {
    const store = this.props.store;

    store.removeChangeListener(this.updateState);
  }

  _updateState() {
    const store = this.props.store;

    this.setState(store.getState());
  }
}

Container.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func.isRequired,
    addChangeListener: PropTypes.func.isRequired,
    removeChangeListener: PropTypes.func.isRequired,
  }),
};
