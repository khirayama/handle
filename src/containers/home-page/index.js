import React from 'react';
import {Container} from 'libs/container';

import i18n from 'libs/micro-i18n';

export class HomePage extends Container {
  handleClickLink(event) {
    event.preventDefault();
    location.href = event.currentTarget.href;
  }
  render() {
    return (
      <section className="page home-page">
        <section className="page-content">
          <header>
            <h1>Handle</h1>
            <p>{i18n.t('home.description')}</p>
            <ul className="login-button-list">
              <li><a href="/auth/twitter" onClick={this.handleClickLink}>Login with Twitter</a></li>
            </ul>
          </header>
          <div className="lang-list-container">
            <ul className="lang-list">
              <li><a href="/?lang=en" onClick={this.handleClickLink}><small>English</small></a></li>
              <li><a href="/?lang=ja" onClick={this.handleClickLink}><small>日本語</small></a></li>
            </ul>
          </div>
        </section>
      </section>
    );
  }
}

HomePage.propTypes = {};
