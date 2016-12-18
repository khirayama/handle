import test from 'ava';

import React from 'react';
import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {jsdom} from 'jsdom';

import MicroStore from 'libs/micro-store';

import MicroContainer from './micro-container';

class Container extends MicroContainer {
  render() {
    return React.createElement('div');
  }
}

test.beforeEach(t => {
  global.document = jsdom('');
  global.window = global.document.defaultView;
  global.navigator = {userAgent: 'node.js'};

  t.context.keys = [];
  Object.keys(global.document.defaultView).forEach(property => {
    if (typeof global[property] === 'undefined') {
      t.context.keys.push(property);
      global[property] = global.document.defaultView[property];
    }
  });

  t.context.store = new MicroStore();
  t.context.container = React.createElement(
    Container,
    {store: t.context.store}
  );
});

test.afterEach(t => {
  delete global.document;
  delete global.window;
  delete global.navigator;

  t.context.keys.forEach(property => {
    delete global[property];
  });
});

test('renderable', t => {
  const wrapper = shallow(t.context.container);

  t.is(wrapper.find('div').length, 1);
});

test('Dispatch updateSate', t => {
  const updateState = sinon.spy(Container.prototype, '_updateState');
  mount(t.context.container);

  t.is(updateState.callCount, 0);
  t.context.store.dispatchChange();
  t.is(updateState.callCount, 1);

  updateState.restore();
});
