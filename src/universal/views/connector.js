import React, {PropTypes} from 'react';
import classNames from 'classnames';

import Container from 'universal/libs/micro-container';

export default class Connector extends Container {
  _updateMetaInformation(meta) {
    if (meta.lang) {
      window.document.querySelector('html').lang = meta.locale;
    }
    if (meta.title) {
      window.document.title = meta.title;
    }
  }
  render() {
    const state = this.props.store.getState();
    const pageElement = this.props.getComponent(state.pathname, {state});

    if (typeof window === 'object') {
      this._updateMetaInformation(state.meta);
    }

    return (
      <section className={classNames('application-content', state.ui)}>
        <section className="page-container">{pageElement}</section>
      </section>
    );
  }
}

Connector.propTypes = {
  store: PropTypes.shape({
    state: PropTypes.shape({
      meta: PropTypes.shape({
        lang: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
      ui: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      isAuthenticated: PropTypes.bool.isRequired,
    }),
  }),
  getComponent: PropTypes.func.isRequired,
};
