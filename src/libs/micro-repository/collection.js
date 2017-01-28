import axios from 'axios';

export class Collection {
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
  find(id, config, cache = true) {
    if (this._cache.response !== null) {
      return new Promise((resolve, reject) => {
        for (let index = 0; index < this._cache.response.length; index++) {
          const item = this._cache.response[index];
          if (item.id === id) {
            resolve(item);
          }
        }
        this._find(id, config, resolve, reject);
      });
    }
    return new Promise((resolve, reject) => {
      this._find(id, config, resolve, reject);
    });
  }
  _find(id, config, resolve, reject) {
    this._request.get(this._url(id), config).then(({data}) => {
      resolve(data);
    }).catch(error => reject(error));
  }
  // command
  create(data, config) {
    return new Promise((resolve, reject) => {
      this._request.post(this._url(), data, config).then(({data}) => {
        this._clear();
        resolve(data);
      }).catch(error => reject(error));
    });
  }
  update(data, config) {
    return new Promise((resolve, reject) => {
      this._request.put(this._url(data.id), data, config).then(({data}) => {
        this._clear();
        resolve(data);
      }).catch(error => reject(error));
    });
  }
  delete(id, config) {
    return new Promise((resolve, reject) => {
      this._request.delete(this._url(id), config).then(({data}) => {
        this._clear();
        resolve(data);
      }).catch(error => reject(error));
    });
  }

  // for cache
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
