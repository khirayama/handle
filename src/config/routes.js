import {dispatch} from '@khirayama/circuit';

import {HomePage} from 'containers/home-page';
import {DashboardPage} from 'containers/dashboard-page';
import {TaskPage} from 'containers/task-page';
import {ProfilePage} from 'containers/profile-page';
import {LabelsPage} from 'containers/labels-page';
import {LabelPage} from 'containers/label-page';
import {NotFoundPage} from 'containers/not-found-page';

import {
  initializeHomePage,
  initializeDashboardPage,
  initializeTaskPage,
  initializeLabelsPage,
  initializeLabelPage,
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
  className: 'connector-dashboard',
  options: {
    data: {dispatch},
    async: true,
  },
}, {
  path: '/tasks/new',
  initialize: initializeTaskPage,
  component: TaskPage,
  head: {title: 'Create task'},
  className: 'connector-tasks-new',
  options: {
    data: {dispatch},
    async: true,
  },
}, {
  path: '/tasks/:id/edit',
  initialize: initializeTaskPage,
  component: TaskPage,
  head: {title: 'Edit task'},
  className: 'connector-tasks-edit',
  options: {
    data: {dispatch},
    async: true,
  },
}, {
  path: '/labels',
  initialize: initializeLabelsPage,
  component: LabelsPage,
  head: {title: 'Labels'},
  className: 'connector-labels',
  options: {
    data: {dispatch},
  },
}, {
  path: '/labels/new',
  initialize: initializeLabelPage,
  component: LabelPage,
  head: {title: 'Create label'},
  className: 'connector-labels-new',
  options: {
    data: {dispatch},
    async: true,
  },
}, {
  path: '/labels/:id/edit',
  initialize: initializeLabelPage,
  component: LabelPage,
  head: {title: 'Edit label'},
  className: 'connector-labels-edit',
  options: {
    data: {dispatch},
    async: true,
  },
}, {
  path: '/profile',
  component: ProfilePage,
  head: {title: 'Your Profile'},
  className: 'connector-profile',
  options: {
    data: {dispatch},
  },
}, {
  path: '/*',
  component: NotFoundPage,
  head: {title: 'Not Found'},
  className: 'connector-not-found',
  options: {
    data: {dispatch},
  },
}];

export default routes;
