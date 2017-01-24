import {dispatch} from '@khirayama/circuit';

import {HomePage} from 'containers/home-page';
import {DashboardPage} from 'containers/dashboard-page';
import {ProfilePage} from 'containers/profile-page';
import {LabelsPage} from 'containers/labels-page';
import {NotFoundPage} from 'containers/not-found-page';

import {
  initializeHomePage,
  initializeDashboardPage,
  initializeLabelsPage,
} from 'action-creators/page-initialize-action-creators';

const routes = [{
  path: '/',
  initialize: initializeHomePage,
  component: HomePage,
  head: {title: 'Handle'},
  options: {
    data: {dispatch},
  },
}, {
  path: '/dashboard',
  initialize: initializeDashboardPage,
  component: DashboardPage,
  head: {title: 'Handle'},
  options: {
    data: {dispatch},
  },
}, {
  path: '/labels',
  initialize: initializeLabelsPage,
  component: LabelsPage,
  head: {title: 'Labels'},
  options: {
    data: {dispatch},
  },
}, {
  path: '/profile',
  component: ProfilePage,
  head: {title: 'Your Profile'},
  options: {
    data: {dispatch},
  },
}, {
  path: '/*',
  component: NotFoundPage,
  head: {title: 'Not Found'},
  options: {
    data: {dispatch},
  },
}];

export default routes;
