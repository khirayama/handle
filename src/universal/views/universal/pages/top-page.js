import React, {Component} from 'react';

import Link from 'universal/views/universal/components/link';

export default class TopPage extends Component {
  render() {
    return (
      <section className="page">
        <h1>Handle</h1>
        <div>
          <Link href="/styleguide">styleguide</Link>
        </div>
        <a href="/logout">logout</a>
      </section>
    );
  }
}
