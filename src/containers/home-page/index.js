import React from 'react';
import {Container} from '@khirayama/react-circuit';

import i18n from 'libs/micro-i18n';

export class HomePage extends Container {
  render() {
    return (
      <section className="page home-page">
        <section className="page-content">
          <header>
            <h1>Handle</h1>
            <p>{i18n.t('home.description')}</p>
            <ul className="login-button-list">
              <li><a href="/auth/twitter">Login with Twitter</a></li>
              <li><a href="/auth/instagram">Login with Instagram</a></li>
            </ul>
          </header>
          <div className="lang-list-container">
            <ul className="lang-list">
              <li><a href="/?lang=en"><small>English</small></a></li>
              <li><a href="/?lang=ja"><small>日本語</small></a></li>
            </ul>
          </div>
        </section>
      </section>
    );
  }
}

HomePage.propTypes = {};
