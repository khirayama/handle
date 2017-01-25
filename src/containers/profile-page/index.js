import React from 'react';
import {Container} from 'libs/container';

import {Link} from 'components/link';
import {IconButton} from 'components/icon-button';

export class ProfilePage extends Container {
  render() {
    const profile = this.state.profile;

    return (
      <section className="page profile-page">
        <section className="page-content">
          <header className="profile-header">
            <Link
              className="close-profile-button"
              href="/dashboard"
              >
              <IconButton>close</IconButton>
            </Link>
          </header>
          <section className="profile">
            <div className="profile-image-container">
              <img src={profile.imageUrl}/>
            </div>
            <div className="profile-username">{profile.username}</div>
            <ul className="profile-action-list">
              <li><a href="/logout" className="link">Logout</a></li>
            </ul>
          </section>
        </section>
      </section>
    );
  }
}

ProfilePage.propTypes = {};
