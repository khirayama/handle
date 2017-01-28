import React, {Component, PropTypes} from 'react';

import {Link} from 'components/link';
import {Icon} from 'components/icon';

export class ApplicationHeader extends Component {
  render() {
    return (
      <section className="application-header">
        <Link href="/profile" className="setting-link">
          <div className="setting-link-content">
            <img src={this.props.imageUrl}/>
          </div>
        </Link>
        <Link href="/labels" className="labels-link">
          <Icon>label</Icon>
        </Link>
      </section>
    );
  }
}

ApplicationHeader.propTypes = {
  imageUrl: PropTypes.string,
};
