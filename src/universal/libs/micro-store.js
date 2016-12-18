/* global window */

import {EventEmitter} from 'events';

const EVENT_CHANGE = '__CHANGE_STORE';

export default class MicroStore extends EventEmitter {
  constructor() {
    super();

    this.state = this._load();
  }
  _save() {
    const key = '__' + this.constructor.name + 'Cache';
    if (typeof window === 'object') {
      if (window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(this.state));
      }
    }
  }
  _load() {
    const key = '__' + this.constructor.name + 'Cache';
    if (typeof window === 'object') {
      if (window.localStorage) {
        const cacheString = window.localStorage.getItem(key);
        if (cacheString) {
          return JSON.parse(cacheString);
        }
      }
    }
    return {};
  }
  dispatchChange() {
    this._save();
    this.emit(EVENT_CHANGE);
  }
  addChangeListener(listener) {
    this.addListener(EVENT_CHANGE, listener);
  }
  removeChangeListener(listener) {
    this.removeListener(EVENT_CHANGE, listener);
  }
  getState() {
    return Object.assign({}, this.state);
  }
}
