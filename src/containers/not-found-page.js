import React from 'react';
import {Container} from '@khirayama/react-circuit';

import Link from 'components/link';

export default class NotFoundPage extends Container {
  render() {
    return (
      <section className="page not-found-page">
        <h1>Not Found</h1>
        <Link href="/dashboard">to Dashboard</Link>
      </section>
    );
  }
}

NotFoundPage.propTypes = {};
