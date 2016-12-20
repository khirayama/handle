const PATH_REGEXP = new RegExp([
  '(\\\\.)',
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))',
].join('|'), 'g');

export function parse(str) {
  const tokens = [];
  let index = 0;
  let path = '';
  let res;

  /*eslint-disable */
  while ((res = PATH_REGEXP.exec(str)) !== null) {
    let offset = res.index;

    path += str.slice(index, offset);
    index = offset + res[0].length;

    // if not exist path or empty string
    if (path) {
      tokens.push(path);
    }
    path = '';

    const token = {
      name: res[3],
      pattern: '[^/]+?',
    };
    tokens.push(token);
  }
  /*eslint-enable */

  if (index < str.length) {
    path += str.substr(index);
  }
  if (path) {
    tokens.push(path);
  }

  return tokens;
}

export function tokensToRegexp(tokens) {
  let route = '';
  const lastToken = tokens[tokens.length - 1];
  const endsWithSlash = (typeof lastToken === 'string' && /\/$/.test(lastToken));

  tokens.forEach(token => {
    if (typeof token === 'string') {
      route += token;
    } else {
      let capture = token.pattern;

      capture = '/(' + capture + ')';
      route += capture;
    }
  });
  route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
  route += '$';

  return new RegExp('^' + route, 'i');
}

export function pathToRegexp(path) {
  const tokens = parse(path);
  const regexp = tokensToRegexp(tokens);

  regexp.keys = [];
  tokens.forEach(token => {
    if (typeof token !== 'string') {
      regexp.keys.push(token);
    }
  });

  return regexp;
}

export function _getParams(keys, matches) {
  const params = {};

  if (matches) {
    keys.forEach((key, index) => {
      if (!params[key.name]) {
        params[key.name] = [];
      }
      params[key.name].push(matches[index + 1]);
    });
  }
  return params;
}

export function exec(regexp, path) {
  const matches = regexp.exec(path);
  const params = _getParams(regexp.keys, matches);

  if (!matches) {
    return null;
  }

  matches.params = params;
  return matches;
}

export default class MicroFluxRouter {
  constructor() {
    this._componentRoutes = [];
    this._nomatchComponent = null;

    this._actionRoutes = [];
    this._nomatchAction = null;
  }

  register(path, options) {
    if (typeof path === 'object') {
      const options_ = path;
      if (options_.action) {
        this.registerAction(options_.action);
      }
      if (options_.component) {
        this.registerComponent(options_.component);
      }
    } else {
      if (options.action) {
        this.registerAction(path, options.action);
      }
      if (options.component) {
        this.registerComponent(path, options.component);
      }
    }
  }

  registerComponent(path, callback) {
    if (typeof path === 'function') {
      const callback_ = path;
      this._nomatchComponent = callback_;

      return this;
    }
    const regexp = pathToRegexp(path);
    this._componentRoutes.push({regexp, callback});

    return this;
  }

  getComponent(path, data) {
    for (let index = 0; index < this._componentRoutes.length; index++) {
      const componentRoute = this._componentRoutes[index];
      const matches = exec(componentRoute.regexp, path);
      if (matches) {
        return componentRoute.callback(matches.params, data);
      }
    }
    if (this._nomatchComponent !== null) {
      return this._nomatchComponent(data);
    }
    return null;
  }

  registerAction(path, callback) {
    if (typeof path === 'function') {
      const callback_ = path;
      this._nomatchAction = callback_;

      return this;
    }
    const regexp = pathToRegexp(path);
    this._actionRoutes.push({regexp, callback});

    return this;
  }

  dispatchAction(path, data) {
    for (let index = 0; index < this._actionRoutes.length; index++) {
      const actionRoute = this._actionRoutes[index];
      const matches = exec(actionRoute.regexp, path);
      if (matches) {
        return actionRoute.callback(matches.params, data);
      }
    }
    if (this._nomatchAction !== null) {
      return this._nomatchAction(data);
    }
    return null;
  }
}
