import {dispatch} from '@khirayama/circuit';

import HomePage from 'containers/home-page';
import DashboardPage from 'containers/dashboard-page';
import NotFoundPage from 'containers/not-found-page';

import {
  initializeHomePage,
  initializeDashboardPage,
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
  path: '/*',
  component: NotFoundPage,
  head: {title: 'Not Found'},
  options: {
    data: {dispatch},
  },
}];

export default routes;
