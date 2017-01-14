import React, {Component} from 'react';

import {Link} from 'components/link';
import {IconButton} from 'components/icon-button';

export class ApplicationHeader extends Component {
  render() {
    return (
      <section className="application-header">
        <Link href="/setting" className="setting-link">
          <div className="setting-link-content"/>
        </Link>
        <div className="search-button-container">
          <IconButton className="search-button">search</IconButton>
        </div>
      </section>
    );
  }
}

ApplicationHeader.propTypes = {};
