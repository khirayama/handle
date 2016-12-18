import {Component, PropTypes} from 'react';

export default class MicroContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {store: this.props.store};

    this.updateState = this._updateState.bind(this);
  }
  componentDidMount() {
    this.props.store.addChangeListener(this.updateState);
    if (this._initialize !== undefined) {
      this._initialize();
    }
  }
  componentWillUnmount() {
    this.props.store.removeChangeListener(this.updateState);
  }
  _updateState() {
    this.setState({store: this.props.store});
  }
}

MicroContainer.propTypes = {
  store: PropTypes.object.isRequired,
};
