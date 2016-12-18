import React, {Component} from 'react';

import Link from 'universal/views/universal/components/link';

export default class NotFoundPage extends Component {
  render() {
    return (
      <section className="page">
        <h1>Not Found</h1>
        <Link href="/">top</Link>
      </section>
    );
  }
}

NotFoundPage.propTypes = {};
