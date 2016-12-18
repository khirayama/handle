import test from 'ava';

import MicroStore from './micro-store';

test.beforeEach(t => {
  t.context.store = new MicroStore();
});

test('MicroStore: addChangeListener and dispatchChange', t => {
  const store = t.context.store;
  let isCalled = false;

  store.addChangeListener(() => {
    isCalled = true;
  });
  store.dispatchChange();
  t.true(isCalled);
});

test('MicroStore: addChangeListener', t => {
  const store = t.context.store;
  const callback = () => {};

  store.addChangeListener(callback);
  t.is(store._listeners.__CHANGE_STORE.length, 1);
});

test('MicroStore: removeChangeListener', t => {
  const store = t.context.store;
  const callback = () => {};

  store.addChangeListener(callback);
  store.removeChangeListener(callback);
  t.is(store._listeners.__CHANGE_STORE.length, 0);
});

test('MicroStore: getState', t => {
  const store = t.context.store;
  const state = store.getState();

  t.not(state, store.state);
  t.deepEqual(state, store.state);
});
