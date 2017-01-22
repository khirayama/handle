/* global window */

import axios from 'axios';

export class Entry {
  constructor(resourceUrl) {
    this._cache = this._load();
    this._resourceUrl = resourceUrl || null;
    this._request = axios.create();
  }
  _url(id = null) {
    if (id !== null) {
      return `${this._resourceUrl}/${id}`;
    }
    return this._resourceUrl;
  }
  get data() {
    return this._cache;
  }
  fetch(config, cache = true) {
    if (cache && this._cache !== null) {
      return new Promise(resolve => {
        resolve(this._cache);
      });
    }
    return new Promise((resolve, reject) => {
      this._request.get(this._url(), config).then(res => {
        this._cache = res.data;
        this._save();
        resolve(res.data);
      }).catch(error => {
        reject(error);
      });
    });
  }
  // command
  update(data, config) {
    return new Promise((resolve, reject) => {
      this._request.put(this._url(), data, config).then(res => {
        this._clear();
        this._save();
        resolve(res.data);
      }).catch(error => reject(error));
    });
  }

  // for cache
  _clear() {
    this._cache = null;
  }
  _save() {
    const key = '__' + this.constructor.name + 'Cache';
    if (typeof window === 'object') {
      if (window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(this._cache));
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
    return null;
  }
}

export class Collection {
  constructor(resourceUrl) {
    this._cache = this._load();
    this._cacheQuery = null;
    this._resourceUrl = resourceUrl || null;
    this._request = axios.create();
  }
  _url(id = null) {
    if (id !== null) {
      return `${this._resourceUrl}/${id}`;
    }
    return this._resourceUrl;
  }
  get data() {
    return this._cache;
  }
  fetch(config, cache = true) {
    if (
      cache &&
      JSON.stringify(config) === this._cacheQuery &&
      this._cache !== null
    ) {
      return new Promise(resolve => {
        resolve(this._cache);
      });
    }
    return new Promise((resolve, reject) => {
      this._request.get(this._url(), config).then(res => {
        this._clear();
        this._cacheQuery = JSON.stringify(config);
        this._save();
        resolve(res.data);
      }).catch(error => reject(error));
    });
  }
  find(id, config) {
    if (this._cache !== null) {
      return new Promise((resolve, reject) => {
        for (let index = 0; index < this._cache.length; index++) {
          const item = this._cache[index];
          if (item.id === id) {
            resolve(item);
          }
        }
        this._find(id, config, resolve, reject);
      });
    }
    return new Promise((resolve, reject) => {
      this._find(id, resolve, reject);
    });
  }
  _find(id, config, resolve, reject) {
    this._request.get(this._url(id), config).then(res => {
      this._save();
      resolve(res.data);
    }).catch(error => reject(error));
  }
  // command
  create(data, config) {
    return new Promise((resolve, reject) => {
      this._request.post(this._url(), data, config).then(res => {
        this._clear();
        this._save();
        resolve(res.data);
      }).catch(error => reject(error));
    });
  }
  update(data, config) {
    return new Promise((resolve, reject) => {
      this._request.put(this._url(data.id), data, config).then(res => {
        this._clear();
        this._save();
        resolve(res.data);
      }).catch(error => reject(error));
    });
  }
  delete(id, config) {
    return new Promise((resolve, reject) => {
      this._request.delete(this._url(id), config).then(res => {
        this._clear();
        this._save();
        resolve(res.data);
      }).catch(error => reject(error));
    });
  }

  // for cache
  _clear() {
    this._cache = null;
  }
  _save() {
    const key = '__' + this.constructor.name + 'Cache';
    if (typeof window === 'object') {
      if (window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(this._cache));
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
    return null;
  }
}
