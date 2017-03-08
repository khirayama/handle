import React from 'react';
import {Container} from 'libs/container';
import promiseConfirm from 'libs/promise-confirm';

import {Link} from 'components/link';
import {Icon} from '@khirayama/handle-ui';

export class ProfilePage extends Container {
  handleClickLink(event) {
    event.preventDefault();
    location.href = event.currentTarget.href;
  }
  render() {
    const profile = this.state.profile;

    return (
      <section className="page profile-page">
        <section className="page-content">
          <header className="profile-header">
            <Link
              className="close-profile-button"
              href="/dashboard"
              ><Icon>close</Icon></Link>
          </header>
          <section className="profile">
            <div className="profile-image-container">
              <img src={profile.imageUrl}/>
            </div>
            <div className="profile-username">{profile.username}</div>
            <ul className="profile-action-list">
              <li><a href="/logout" className="link" onClick={this.handleClickLink}>Logout</a></li>
              <li><a
                onClick={() => {
                  promiseConfirm('Delete account?').then(confirm_ => {
                    if (confirm_) {
                      location.href = '/destroy_user';
                    }
                  });
                }} className="link link__attention"
                   >Delete Account</a></li>
            </ul>
          </section>
        </section>
      </section>
    );
  }
}

ProfilePage.propTypes = {};
