import {EventEmitter} from 'events';

const ACTION_DISPATCH = '__ACTION_DISPATCH';

const dispatcher = new EventEmitter();

export function dispatch(action) {
  dispatcher.emit(ACTION_DISPATCH, action);
}

export function subscribe(callback) {
  dispatcher.addListener(ACTION_DISPATCH, callback);
}

export function unsubscribeAll() {
  dispatcher.removeAllListeners();
}

export default dispatcher;
