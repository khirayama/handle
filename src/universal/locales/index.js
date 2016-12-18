import path from 'path';

class I18n {
  constructor(config) {
    this._locales = config.locales;
    this._defaultLocale = config.defaultLocale;
    this._path = config.path;

    this._locale = this._defaultLocale;
    this._dictionary = {};

    this._import();
  }
  get defaultLocale() {
    return this._defaultLocale;
  }
  _import() {
    this._locales.forEach(locale => {
      const dictionaryPath = path.join(this._path, locale);

      const dic = require(dictionaryPath);
      this._dictionary[locale] = dic;
    });
  }
  t(path) {
    const paths = path.split('.');
    let index = 0;
    let result = this._dictionary[this._locale];

    while (paths[index]) {
      const key = paths[index];
      result = result[key];
      index++;
    }
    return result;
  }
  setLocale(locale) {
    this._locale = locale;
  }
}

export default new I18n({
  locales: ['en', 'ja'],
  defaultLocale: 'en',
  path: 'universal/locales',
  // for browserify
  requires: [
    require('universal/locales/en'),
    require('universal/locales/ja'),
  ],
});
