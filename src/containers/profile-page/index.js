import React from 'react';
import {Container} from 'libs/container';

import i18n from 'libs/micro-i18n';

import {Link} from 'components/link';
import {IconButton} from 'components/icon-button';

export class ProfilePage extends Container {
  render() {
    const profile = this.state.profile;

    return (
      <section className="page profile-page">
        <section className="page-content">
          <header>
            <Link href="/dashboard" className="setting-link">
              <IconButton
                onClick={this.props.onClickCloseButton}
                >close</IconButton>
            </Link>
          </header>
          <div>{profile.username}</div>
          <img src={profile.imageUrl}/>
          <a href="/logout">Logout</a>
          <a href="/user">Delete your account</a>
        </section>
      </section>
    );
  }
}

ProfilePage.propTypes = {};
