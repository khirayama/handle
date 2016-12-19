import types from 'universal/constants/action-types';
import {subscribe} from 'universal/libs/micro-dispatcher';
import MicroStore from 'universal/libs/micro-store';

const READY_APPLICATION = '__READY_APPLICATION';

export default class Store extends MicroStore {
  constructor(state) {
    super();

    this.state = Object.assign({
      meta: {
        lang: '',
        title: '',
      },
      ui: '',
      pathname: '',
      isAuthenticated: false,
    }, state);

    this._subscribe();
  }
  _subscribe() {
    subscribe(action => {
      switch (action.type) {
        case types.START_APP:
          this.state.meta.lang = action.locale;
          this.state.ui = action.ui;
          this.state.pathname = action.pathname;
          this.state.isAuthenticated = action.isAuthenticated;

          this._dispatchReady();
          break;
        case types.CHANGE_LOCATION:
          this.state.pathname = action.pathname;
          break;
        case types.UPDATE_TITLE:
          this.state.meta.title = action.title;
          break;
        default:
          break;
      }

      if (typeof window === 'object') {
        console.log('%cAction:', 'color: #b71c1c; font-weight: bold;', action);
        console.log('%cState:', 'color: #0d47a1; font-weight: bold;', this.state);
      }
      this.dispatchChange();
    });
  }
  _dispatchReady() {
    this.emit(READY_APPLICATION);
  }
  ready(callback) {
    this.addListener(READY_APPLICATION, callback);
  }
}
