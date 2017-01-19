import React from 'react';
import {Container} from '@khirayama/react-circuit';

import {Link} from 'components/link';

export class LabelsPage extends Container {
  render() {
    return (
      <section className="page labels-page">
        <section className="page-content">
          <h1>Labels</h1>
          <Link href="/dashboard">to DashboardPage</Link>
        </section>
      </section>
    );
  }
}

LabelsPage.propTypes = {};
