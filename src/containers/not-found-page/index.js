import React from 'react';
import {Container} from 'libs/container';

import {Link} from 'components/link';

export class NotFoundPage extends Container {
  render() {
    return (
      <section className="page not-found-page">
        <section className="page-content">
          <h1>Not Found</h1>
          <Link href="/dashboard">to Dashboard</Link>
        </section>
      </section>
    );
  }
}

NotFoundPage.propTypes = {};
