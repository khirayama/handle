import axios from 'axios';

export class Entry {
  constructor(resourceUrl) {
    this._cache = {
      response: null,
      configString: '{}',
    };
    this._resourceUrl = resourceUrl || null;
    this._request = axios.create();
  }
  _url(id = null) {
    if (id !== null) {
      return `${this._resourceUrl}/${id}`;
    }
    return this._resourceUrl;
  }
  fetch(config = {}, cache = true) {
    if (
      cache &&
      JSON.stringify(config) === this._cache.configString &&
      this._cache.response !== null
    ) {
      return new Promise(resolve => {
        resolve(this._cache.response);
      });
    }
    return new Promise((resolve, reject) => {
      this._request.get(this._url(), config).then(({data}) => {
        this._save(config, data);
        resolve(data);
      }).catch(error => reject(error));
    });
  }
  // Command
  update(data, config) {
    return new Promise((resolve, reject) => {
      this._request.put(this._url(), data, config).then(({data}) => {
        this._clear();
        resolve(data);
      }).catch(error => reject(error));
    });
  }

  // For cache
  _clear() {
    this._cache = {
      response: null,
      configString: '{}',
    };
  }
  _save(config = {}, response = null) {
    this._cache.response = response;
    this._cache.configString = JSON.stringify(config);
  }
}
