import test from 'ava';
import sinon from 'sinon';

import {EntryResource, CollectionResource} from './micro-resource';

import {
  createError,
  promiseStub,
} from '../test-helper';

test.beforeEach(t => {
  class Entry extends EntryResource {
    constructor() {
      super('/api/v1/item');
    }
  }
  class Collection extends CollectionResource {
    constructor() {
      super('/api/v1/items');
    }
  }

  t.context.entry = new Entry();
  t.context.collection = new Collection();
});

// _url
test('EntryResource > _url > call without id', t => {
  t.deepEqual(t.context.entry._url(), '/api/v1/item');
});

test('EntryResource > _url > call with id', t => {
  t.deepEqual(t.context.entry._url(1), '/api/v1/item/1');
  t.deepEqual(t.context.entry._url('1'), '/api/v1/item/1');
});

// fetch
test('EntryResource > fetch > success without cache', t => {
  sinon.stub(t.context.entry._request, 'get', promiseStub('success', {
    data: [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}],
  }));

  return t.context.entry.fetch().then(res => {
    t.deepEqual(res, [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}]);
    t.deepEqual(t.context.entry.data, [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}]);
    t.context.entry._request.get.restore();
  });
});

test('EntryResource > fetch > success with cache', t => {
  sinon.stub(t.context.entry._request, 'get', promiseStub('success', {
    data: [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}],
  }));

  return t.context.entry.fetch().then(res => {
    return t.context.entry.fetch().then(cache => {
      t.deepEqual(res, cache);
      t.context.entry._request.get.restore();
    });
  });
});

test('EntryResource > fetch > error with cache', t => {
  sinon.stub(t.context.entry._request, 'get', promiseStub('error', createError()));

  return t.context.entry.fetch().catch(res => {
    t.deepEqual(res, createError());
    t.deepEqual(t.context.entry._cache, null);
    t.context.entry._request.get.restore();
  });
});

// _url
test('CollectionResource > _url > call without id', t => {
  t.deepEqual(t.context.collection._url(), '/api/v1/items');
});

test('CollectionResource > _url > call with id', t => {
  t.deepEqual(t.context.collection._url(1), '/api/v1/items/1');
  t.deepEqual(t.context.collection._url('1'), '/api/v1/items/1');
});

// fetch
test('CollectionResource > fetch > success without cache', t => {
  sinon.stub(t.context.collection._request, 'get', promiseStub('success', {
    data: [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}],
  }));

  return t.context.collection.fetch().then(res => {
    t.deepEqual(res, [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}]);
    t.deepEqual(t.context.collection.data, [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}]);
    t.context.collection._request.get.restore();
  });
});

test('CollectionResource > fetch > success with cache', t => {
  sinon.stub(t.context.collection._request, 'get', promiseStub('success', {
    data: [{id: 54, name: 'Test1'}, {id: 57, name: 'Test2'}],
  }));

  return t.context.collection.fetch().then(res => {
    return t.context.collection.fetch().then(cache => {
      t.deepEqual(res, cache);
      t.context.collection._request.get.restore();
    });
  });
});

test('CollectionResource > fetch > error with cache', t => {
  sinon.stub(t.context.collection._request, 'get', promiseStub('error', createError()));

  return t.context.collection.fetch().catch(res => {
    t.deepEqual(res, createError());
    t.deepEqual(t.context.collection._cache, null);
    t.context.collection._request.get.restore();
  });
});

// create
test('CollectionResource > create > success', t => {
  sinon.stub(t.context.collection._request, 'post', promiseStub('success', {
    data: {id: 1, name: 'Test'},
  }));

  return t.context.collection.create({name: 'Test'}).then(res => {
    t.deepEqual(res, {id: 1, name: 'Test'});
    t.deepEqual(t.context.collection.data, [{id: 1, name: 'Test'}]);
    t.context.collection._request.post.restore();
  });
});

test('CollectionResource > create > error', t => {
  sinon.stub(t.context.collection._request, 'post', promiseStub('error', createError()));

  return t.context.collection.create({name: 'Test'}).catch(error => {
    t.deepEqual(error, createError());
    t.deepEqual(t.context.collection.data, null);
    t.context.collection._request.post.restore();
  });
});

// update
test('CollectionResource > update > success', t => {
  sinon.stub(t.context.collection._request, 'put', promiseStub('success', {
    data: {id: 1, name: 'Test'},
  }));

  return t.context.collection.update({name: 'Test'}).then(res => {
    t.deepEqual(res, {id: 1, name: 'Test'});
    t.deepEqual(t.context.collection.data, [{id: 1, name: 'Test'}]);
    t.context.collection._request.put.restore();
  });
});

test('CollectionResource > update > error', t => {
  sinon.stub(t.context.collection._request, 'put', promiseStub('error', createError()));

  return t.context.collection.update({name: 'Test'}).catch(error => {
    t.deepEqual(error, createError());
    t.deepEqual(t.context.collection.data, null);
    t.context.collection._request.put.restore();
  });
});

// delete
test('CollectionResource > delete > success', t => {
  sinon.stub(t.context.collection._request, 'delete', promiseStub('success', {
    data: {id: 1},
  }));

  return t.context.collection.delete().then(res => {
    t.deepEqual(res, {id: 1});
    t.deepEqual(t.context.collection.data, null);
    t.context.collection._request.delete.restore();
  });
});

test('CollectionResource > delete > error', t => {
  sinon.stub(t.context.collection._request, 'delete', promiseStub('error', createError()));

  return t.context.collection.delete().catch(error => {
    t.deepEqual(error, createError());
    t.deepEqual(t.context.collection.data, null);
    t.context.collection._request.delete.restore();
  });
});

// find
test('CollectionResource > find > success', t => {
  sinon.stub(t.context.collection._request, 'get', promiseStub('success', {
    data: {id: 1, name: 'Test'},
  }));

  return t.context.collection.find(1).then(res => {
    t.deepEqual(res, {id: 1, name: 'Test'});
    t.context.collection._request.get.restore();
  });
});
