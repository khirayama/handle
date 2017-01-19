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
        <Link href="/labels" className="labels-link">
          <IconButton>add</IconButton>
        </Link>
      </section>
    );
  }
}

ApplicationHeader.propTypes = {};
