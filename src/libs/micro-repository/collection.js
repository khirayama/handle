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
    if (cache && this._cache.response !== null) {
      return new Promise((resolve, reject) => {
        for (let index = 0; index < this._cache.response.length; index++) {
          const item = this._cache.response[index];
          if (item.id === id) {
            resolve(item);
            return;
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
  // Command
  create(data, config) {
    // Return new Promise((resolve, reject) => {
    //   this._request.post(this._url(), data, config).then(res => {
    //     resolve(res.data);
    //     setTimeout(() => {
    //       if (this._cache.response !== null) {
    //         this._cache.response.push(res.data);
    //       }
    //     }, 0);
    //   }).catch(error => reject(error));
    // });
    this._clear();
    return new Promise((resolve, reject) => {
      this._request.post(this._url(), data, config).then(res => {
        resolve(res.data);
      }).catch(error => reject(error));
    });
  }
  update(data, config) {
    // Return new Promise((resolve, reject) => {
    //   this.find(data.id, config).then(item => {
    //     Object.assign(item, data);
    //     this._request.put(this._url(data.id), data, config).then(res => {
    //       Object.assign(item, res.data);
    //       resolve(res.data)
    //     });
    //   }).catch(error => reject(error));
    // });
    this._clear();
    return new Promise((resolve, reject) => {
      this._request.put(this._url(data.id), data, config).then(({data}) => {
        resolve(data);
      }).catch(error => reject(error));
    });
  }
  bulkUpdate(data, config) {
    this._clear();
    return new Promise((resolve, reject) => {
      this._request.put(this._url(), data, config).then(({data}) => {
        resolve(data);
      }).catch(error => reject(error));
    });
  }
  delete(id, config) {
    // Return new Promise((resolve, reject) => {
    //   if (this._cache.response !== null) {
    //     this._cache.response = this._cache.response.filter(res => {
    //       return res.id !== id;
    //     });
    //     this._request.delete(this._url(id), config).then(res => {
    //       resolve(res.data);
    //       setTimeout(() => {
    //         this._cache.response = this._cache.response.filter(res_ => {
    //           return res_.id !== id;
    //         });
    //       }, 0);
    //     }).catch(error => reject(error));
    //   } else {
    //     this._request.delete(this._url(id), config).then(res => {
    //       resolve(res.data);
    //     }).catch(error => reject(error));
    //   }
    // });
    this._clear();
    return new Promise((resolve, reject) => {
      this._request.delete(this._url(id), config).then(({data}) => {
        resolve(data);
      }).catch(error => reject(error));
    });
  }

  // For cache
  _clear() {
    // This._cache = {
    //   response: null,
    //   configString: '{}',
    // };
  }
  // _save(config = {}, response = null) {
  _save() {
    // This._cache.response = response;
    // this._cache.configString = JSON.stringify(config);
  }
}
