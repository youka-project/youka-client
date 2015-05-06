import Router from '../common/router';
import Radio from 'backbone.radio';

import IndexRoute from './index/route';
import CreateRoute from './create/route';
import ShowRoute from './show/route';
import EditRoute from './edit/route';

export default Router.extend({
  initialize(options) {
    this.container = options.container;

    Radio.command('header', 'add', {
      name: 'Users',
      path: 'users',
      type: 'primary'
    });
  },

  onBeforeEnter() {
    Radio.command('header', 'activate', { path: 'users' });
  },

  routes: {
    'users'          : 'index',
    'users/new'      : 'create',
    'users/:id'      : 'show',
    'users/:id/edit' : 'edit'
  },

  index() {
    return new IndexRoute({
      container: this.container
    });
  },

  create() {
    return new CreateRoute({
      container: this.container
    });
  },

  show() {
    return new ShowRoute({
      container: this.container
    });
  },

  edit() {
    return new EditRoute({
      container: this.container
    });
  }
});
